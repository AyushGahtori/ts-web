import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public", "techsnitch-blog-image-candidates");
const maxBytes = 300 * 1024;
const sourceExtensions = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (sourceExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function encodeWebp(inputPath) {
  const outputPath = inputPath.replace(/\.(jpe?g|png)$/i, ".webp");
  const source = sharp(inputPath, { animated: false }).rotate();
  const metadata = await source.metadata();
  const maxWidths = [1600, 1440, 1280, 1120, 960];
  const qualities = [86, 82, 78, 74, 70, 66, 62, 58, 54, 50, 46];

  let bestBuffer = null;
  let bestInfo = null;

  for (const width of maxWidths) {
    for (const quality of qualities) {
      const buffer = await sharp(inputPath, { animated: false })
        .rotate()
        .resize({
          width: Math.min(width, metadata.width || width),
          withoutEnlargement: true,
        })
        .webp({ quality, effort: 6, smartSubsample: true })
        .toBuffer();

      bestBuffer = buffer;
      bestInfo = { width, quality };

      if (buffer.length <= maxBytes) {
        await fs.writeFile(outputPath, buffer);
        return { outputPath, bytes: buffer.length, ...bestInfo };
      }
    }
  }

  await fs.writeFile(outputPath, bestBuffer);
  return { outputPath, bytes: bestBuffer.length, ...bestInfo, overLimit: true };
}

async function main() {
  const files = await walk(publicDir);
  const report = [];

  for (const file of files) {
    const result = await encodeWebp(file);
    report.push({
      source: file,
      output: result.outputPath,
      bytes: result.bytes,
      kb: Math.round(result.bytes / 1024),
      width: result.width,
      quality: result.quality,
      overLimit: Boolean(result.overLimit),
    });
  }

  const overLimit = report.filter((item) => item.overLimit);
  await fs.writeFile(
    path.join(publicDir, "webp-optimization-report.json"),
    JSON.stringify({ maxBytes, total: report.length, overLimit, files: report }, null, 2),
  );

  console.log(`Converted ${report.length} files to WebP.`);
  console.log(`Over 300kb: ${overLimit.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
