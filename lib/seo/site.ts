import fs from "node:fs";
import path from "node:path";
import { findPublicAsset } from "@/lib/server/findPublicAsset";

export const SITE_NAME = "NOVAXA";
export const SITE_DESCRIPTION = "Accessories & Gadgets for a Better Life.";
export const SITE_TAGLINE = "Live Better. Look Better.";

const OG_IMAGE_FILENAMES = ["og-image.jpg", "og-image.jpeg", "og-image.png"];

/**
 * getSiteUrl — resolves the canonical site URL from the SITE_URL env
 * var. No NEXT_PUBLIC_ prefix: metadata generation (the static `metadata`
 * export, generateMetadata, robots.ts, sitemap.ts) always runs
 * server-side, even for statically-exported metadata, so client
 * exposure was never actually required here. Falls back to the
 * documented production domain (README.md > Architecture) when unset.
 */
export function getSiteUrl(): string {
  const configured = process.env.SITE_URL;
  return (configured || "https://novaxastore.store").replace(/\/$/, "");
}

/**
 * getFaviconIcons — checks /public/favicon for each derived icon size
 * (generated from the approved logo asset — see public/favicon/, no
 * artwork invented or distorted, just resized/composed onto a square
 * canvas). Returns undefined entirely — not a partial/broken set — for
 * any size that isn't actually present, same find-real-asset-or-omit
 * discipline as every other asset lookup in this project.
 */
export function getFaviconIcons(): { url: string; sizes: string; type: string }[] | undefined {
  const sizes = [16, 32, 48, 192, 512];
  const icons = sizes
    .map((size) => {
      const found = findPublicAsset("favicon", [`icon-${size}.png`]);
      return found ? { url: found, sizes: `${size}x${size}`, type: "image/png" } : null;
    })
    .filter((icon): icon is { url: string; sizes: string; type: string } => icon !== null);

  return icons.length > 0 ? icons : undefined;
}

/**
 * getAppleTouchIcon — the 180x180 size Apple's convention expects,
 * looked up separately from the general favicon set since it's
 * referenced via a different metadata field (icons.apple, not
 * icons.icon).
 */
export function getAppleTouchIcon(): { url: string }[] | undefined {
  const icon = findPublicAsset("favicon", ["icon-180.png"]);
  return icon ? [{ url: icon }] : undefined;
}

/**
 * getShortcutIcon — the classic favicon.ico, referenced via
 * icons.shortcut for maximum browser compatibility alongside the PNG
 * set above.
 */
export function getShortcutIcon(): string | undefined {
  const faviconPath = path.join(process.cwd(), "public", "favicon", "favicon.ico");
  return fs.existsSync(faviconPath) ? "/favicon/favicon.ico" : undefined;
}

/**
 * getDefaultOgImage — checks /public/images for an approved social
 * preview image. Returns undefined until one exists — no image is
 * invented or referenced before it's actually there.
 */
export function getDefaultOgImage(): { url: string; width: number; height: number }[] | undefined {
  const image = findPublicAsset("images", OG_IMAGE_FILENAMES);
  return image ? [{ url: image, width: 1200, height: 630 }] : undefined;
}
