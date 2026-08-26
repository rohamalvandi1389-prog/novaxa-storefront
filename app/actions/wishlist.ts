"use server";

import { getProductsByHandles } from "@/lib/shopify/search";
import { mapShopifyProductToFeaturedProduct } from "@/lib/shopify/mappers/productMapper";
import { findPublicAsset } from "@/lib/server/findPublicAsset";
import type { FeaturedProduct } from "@/constants/featuredProducts";

/** Shopify handles are lowercase alphanumeric with hyphens — anything
 * else is rejected outright before it ever reaches a Shopify request. */
const HANDLE_PATTERN = /^[a-z0-9-]+$/;
const MAX_WISHLIST_IDS = 50;
const PRODUCTS_IMAGE_DIR = "images/products";

export interface WishlistProduct extends FeaturedProduct {
  /** Resolved server-side via lib/server/findPublicAsset — the same
   * pattern every other product listing uses. WishlistPage is a Client
   * Component and can't touch the filesystem itself, so this can't be
   * left for the client to resolve the way FeaturedProducts.tsx does
   * inline. */
  imageSrc: string | null;
}

function sanitizeHandles(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];

  const seen = new Set<string>();
  const cleaned: string[] = [];

  for (const value of ids) {
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (!trimmed || !HANDLE_PATTERN.test(trimmed) || seen.has(trimmed)) continue;

    seen.add(trimmed);
    cleaned.push(trimmed);

    if (cleaned.length >= MAX_WISHLIST_IDS) break;
  }

  return cleaned;
}

function productImageFilenames(id: string): string[] {
  return [`${id}.jpg`, `${id}.jpeg`, `${id}.png`, `${id}.webp`];
}

/**
 * getWishlistProducts — the server-side bridge for the Wishlist page.
 *
 * Client Component (WishlistPage)
 *   → this Server Action
 *   → getProductsByHandles()          (lib/shopify/search.ts — reused, no new query)
 *   → mapShopifyProductToFeaturedProduct()  (lib/shopify/mappers/productMapper.ts — reused, no second mapper)
 *   → FeaturedProduct (+ resolved imageSrc)
 *   → back to WishlistPage
 *
 * Input (raw localStorage IDs) is validated against HANDLE_PATTERN and
 * capped at MAX_WISHLIST_IDS before ever reaching Shopify. A handle that
 * no longer resolves to a real product is simply absent from Shopify's
 * response — never replaced with invented data.
 */
export async function getWishlistProducts(ids: string[]): Promise<WishlistProduct[]> {
  const handles = sanitizeHandles(ids);

  if (handles.length === 0) {
    return [];
  }

  const shopifyProducts = await getProductsByHandles(handles);

  return shopifyProducts.map((product) => {
    const featuredProduct = mapShopifyProductToFeaturedProduct(product);

    return {
      ...featuredProduct,
      imageSrc: findPublicAsset(PRODUCTS_IMAGE_DIR, productImageFilenames(featuredProduct.id)),
    };
  });
}
