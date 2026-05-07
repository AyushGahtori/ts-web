import { readdirSync } from "node:fs";
import path from "node:path";

const homeAssetsDirectory = path.join(process.cwd(), "public", "home");

function toPublicHomeUrl(filePath: string) {
  const relativePath = path.relative(homeAssetsDirectory, filePath);
  const encodedPath = relativePath.split(path.sep).map(encodeURIComponent).join("/");

  return `/home/${encodedPath}`;
}

function collectHomeAssetSources(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectHomeAssetSources(entryPath);
    }

    if (!entry.isFile()) {
      return [];
    }

    return toPublicHomeUrl(entryPath);
  });
}

export function getHomeAssetSources() {
  return collectHomeAssetSources(homeAssetsDirectory).sort((first, second) => first.localeCompare(second, undefined, { numeric: true }));
}
