import fs from "node:fs";
import path from "node:path";

/**
 * Checks /public/<dir> for the first matching filename from a candidate
 * list and returns its public URL path, or null if none exist yet.
 * Server-only (uses node:fs) — do not import from a "use client" file.
 */
export function findPublicAsset(dir: string, filenames: string[]): string | null {
  const baseDir = path.join(process.cwd(), "public", dir);

  for (const filename of filenames) {
    if (fs.existsSync(path.join(baseDir, filename))) {
      return `/${dir}/${filename}`;
    }
  }

  return null;
}
