const WISHLIST_STORAGE_KEY = "novaxa_wishlist";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** Reads and validates the raw stored value. Any malformed or missing
 * data (parse failure, non-array, non-string entries) safely resolves
 * to an empty list rather than throwing. */
function readIds(): string[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((value): value is string => typeof value === "string");
  } catch {
    return [];
  }
}

function writeIds(ids: string[]): void {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage unavailable (private browsing, quota exceeded, etc.) —
    // fail silently; the wishlist just won't persist this session.
  }
}

/**
 * lib/wishlist/storage.ts — client-safe only. No Shopify API calls, no
 * Shopify types, no framework imports. Every function is safe to call
 * during SSR (they no-op / return [] when `window` doesn't exist), but
 * this module is only ever meaningfully used from Client Components.
 */

export function getWishlistIds(): string[] {
  return readIds();
}

export function hasWishlistId(id: string): boolean {
  return readIds().includes(id);
}

export function addWishlistId(id: string): string[] {
  const current = readIds();
  if (current.includes(id)) return current;

  const next = [...current, id];
  writeIds(next);
  return next;
}

export function removeWishlistId(id: string): string[] {
  const next = readIds().filter((existingId) => existingId !== id);
  writeIds(next);
  return next;
}
