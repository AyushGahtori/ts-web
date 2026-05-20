import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const searchFile = path.join(root, "docs", "blog-image-search-lines.md");
const outputDir = path.join(
  process.env.USERPROFILE || "C:\\Users\\Ayuu",
  "Downloads",
  "techsnitch-blog-image-candidates",
);
const manifestPath = path.join(outputDir, "manifest.json");
const minWidth = 900;
const minHeight = 500;
const perSlot = Number(process.env.CANDIDATES_PER_SLOT || 4);
const startSlot = Number(process.env.START_SLOT || 1);
const endSlot = Number(process.env.END_SLOT || 54);

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/125.0 Safari/537.36";

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function parseSlots(markdown) {
  const lines = markdown.split(/\r?\n/);
  const slots = [];

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^(\d+)\.\s+`([^`]+)`/);
    if (!match) continue;

    let blogLine = "";
    for (let j = i + 1; j < Math.min(i + 5, lines.length); j += 1) {
      if (lines[j].trim().startsWith("Blog:")) {
        blogLine = lines[j].trim().replace(/^Blog:\s*/, "");
        break;
      }
    }

    const [blogTitle = "", frame = ""] = blogLine.split(/\s+\/\s+/);
    slots.push({
      slot: Number(match[1]),
      query: match[2],
      blogTitle,
      frame,
      slug: slugify(blogTitle || `slot-${match[1]}`),
    });
  }

  return slots;
}

function extractVqd(html) {
  return (
    html.match(/vqd=([\d-]+)&/)?.[1] ||
    html.match(/"vqd":"([^"]+)"/)?.[1] ||
    html.match(/vqd='([^']+)'/)?.[1]
  );
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "user-agent": userAgent,
      accept: "text/html,application/json;q=0.9,*/*;q=0.8",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function ddgImageSearch(query) {
  const html = await fetchText(
    `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`,
  );
  const vqd = extractVqd(html);

  if (!vqd) {
    throw new Error("DuckDuckGo did not return an image token");
  }

  const results = [];
  let next =
    `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}` +
    `&vqd=${encodeURIComponent(vqd)}&f=,,,&p=1`;

  for (let page = 0; page < 3 && next && results.length < 80; page += 1) {
    const text = await fetchText(next, {
      headers: { referer: "https://duckduckgo.com/" },
    });
    const json = JSON.parse(text);
    results.push(...(json.results || []));
    next = json.next ? `https://duckduckgo.com/${json.next}` : "";
  }

  return results;
}

function scoreResult(result, query) {
  const text = `${result.title || ""} ${result.source || ""} ${result.url || ""}`.toLowerCase();
  const queryTerms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length > 3);

  let score = 0;
  for (const term of new Set(queryTerms)) {
    if (text.includes(term)) score += 2;
  }

  const url = String(result.image || result.thumbnail || "").toLowerCase();
  const source = String(result.source || "").toLowerCase();
  if (/unsplash|pexels|wikimedia|rawpixel|freepik|adobe|istock|shutterstock/.test(source)) {
    score += 5;
  }
  if (/dashboard|diagram|map|workflow|architecture|control|network|governance/.test(text)) {
    score += 8;
  }
  if (/white|minimal|abstract|technology|enterprise|ai/.test(text)) {
    score += 5;
  }
  if (/logo|icon|clipart|cartoon|meme|portrait|headshot|person|handshake|conference/.test(text)) {
    score -= 14;
  }
  if (/gif|svg/.test(url)) score -= 12;
  if (/pinterest|facebook|instagram|linkedin|youtube|reddit/.test(url)) score -= 10;

  const width = Number(result.width || 0);
  const height = Number(result.height || 0);
  if (width >= 1200 && height >= 650) score += 8;
  if (width && height && width / height >= 1.45 && width / height <= 2.1) score += 4;
  if (width && width < minWidth) score -= 12;
  if (height && height < minHeight) score -= 12;

  return score;
}

async function downloadImage(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": userAgent,
      accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      referer: "https://duckduckgo.com/",
    },
    signal: AbortSignal.timeout(25000),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`not an image: ${contentType}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const metadata = await sharp(buffer, { animated: false }).metadata();
  if (!metadata.width || !metadata.height) throw new Error("missing dimensions");
  if (metadata.width < minWidth || metadata.height < minHeight) {
    throw new Error(`too small: ${metadata.width}x${metadata.height}`);
  }

  return { buffer, metadata };
}

async function saveCandidate({ slot, candidate, source, image }) {
  const name = `${String(slot.slot).padStart(2, "0")}_${slot.slug}_candidate_${String(candidate).padStart(2, "0")}.jpg`;
  const filePath = path.join(outputDir, name);
  await sharp(image.buffer, { animated: false })
    .rotate()
    .resize(1600, 900, { fit: "cover", position: "attention" })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(filePath);

  return {
    slot: slot.slot,
    candidate,
    blogTitle: slot.blogTitle,
    frame: slot.frame,
    query: slot.query,
    sourcePage: source.url || "",
    sourceImage: source.image || "",
    sourceTitle: source.title || "",
    sourceName: source.source || "",
    originalWidth: image.metadata.width,
    originalHeight: image.metadata.height,
    filePath,
    status: "downloaded-for-review",
  };
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const markdown = await fs.readFile(searchFile, "utf8");
  const slots = parseSlots(markdown).filter(
    (slot) => slot.slot >= startSlot && slot.slot <= endSlot,
  );

  const manifest = [];
  const usedImages = new Set();

  for (const slot of slots) {
    console.log(`\n[slot ${slot.slot}] ${slot.blogTitle}`);
    console.log(`query: ${slot.query}`);

    let results = [];
    const queries = [
      slot.query,
      `${slot.query} abstract dashboard`,
      `${slot.query} diagram`,
      `${slot.query} minimal technology illustration`,
    ];

    for (const query of queries) {
      try {
        results.push(...(await ddgImageSearch(query)));
      } catch (error) {
        console.warn(`  search failed: ${error.message}`);
      }
      if (results.length >= 80) break;
      await new Promise((resolve) => setTimeout(resolve, 450));
    }

    const sorted = results
      .filter((result) => result.image && !usedImages.has(result.image))
      .map((result) => ({ result, score: scoreResult(result, slot.query) }))
      .sort((a, b) => b.score - a.score);

    let saved = 0;
    for (const { result, score } of sorted) {
      if (saved >= perSlot) break;
      usedImages.add(result.image);

      try {
        const image = await downloadImage(result.image);
        const entry = await saveCandidate({
          slot,
          candidate: saved + 1,
          source: result,
          image,
        });
        entry.score = score;
        manifest.push(entry);
        saved += 1;
        console.log(`  saved candidate ${saved}: ${entry.filePath}`);
      } catch (error) {
        console.warn(`  rejected: ${error.message}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    if (saved < perSlot) {
      manifest.push({
        slot: slot.slot,
        blogTitle: slot.blogTitle,
        frame: slot.frame,
        query: slot.query,
        status: `needs-more-candidates-${saved}-of-${perSlot}`,
      });
      console.warn(`  only saved ${saved}/${perSlot}`);
    }

    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  }

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. Manifest: ${manifestPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
