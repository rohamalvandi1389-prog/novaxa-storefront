import { shopifyRequest } from "./graphql";
import { FEATURED_COLLECTIONS_QUERY } from "./queries/collections";
import { mapShopifyCollectionToFeaturedCollection } from "./mappers/collectionMapper";
import { featuredCollections as fallbackFeaturedCollections } from "@/constants/collections";
import type { CollectionItem } from "@/constants/collections";
import type { ShopifyCollectionsResponse } from "@/types/shopify";

const DEFAULT_FEATURED_COLLECTIONS_COUNT = 4;

/**
 * getFeaturedCollections — the server-side data layer for the homepage's
 * Featured Collections section.
 *
 * Data flow:
 *   Shopify Storefront API
 *     → FEATURED_COLLECTIONS_QUERY
 *     → shopifyRequest()
 *     → mapShopifyCollectionToFeaturedCollection() (per collection)
 *     → CollectionItem[] returned here
 *
 * On any failure (missing env vars, network error, GraphQL error), logs
 * and falls back to the temporary constants/collections.ts data instead
 * of throwing — the homepage must never crash or render an empty section
 * because Shopify is unreachable or not yet configured.
 *
 * No React, no JSX — a plain async function, callable from any Server
 * Component (e.g. app/page.tsx).
 */
export async function getFeaturedCollections(
  count: number = DEFAULT_FEATURED_COLLECTIONS_COUNT,
): Promise<CollectionItem[]> {
  try {
    const data = await shopifyRequest<ShopifyCollectionsResponse>(FEATURED_COLLECTIONS_QUERY, {
      first: count,
    });

    return data.collections.nodes.map(mapShopifyCollectionToFeaturedCollection);
  } catch (error) {
    console.error(
      "getFeaturedCollections: Shopify request failed, falling back to constants/collections.ts.",
      error,
    );
    return [...fallbackFeaturedCollections];
  }
}

/**
 * getCollectionsForSitemap — same query and mapper as
 * getFeaturedCollections, deliberately without its fallback-to-constants
 * behavior. Same reasoning as getProductsForSitemap (lib/shopify/products.ts).
 */
export async function getCollectionsForSitemap(
  count: number = DEFAULT_FEATURED_COLLECTIONS_COUNT,
): Promise<CollectionItem[]> {
  try {
    const data = await shopifyRequest<ShopifyCollectionsResponse>(FEATURED_COLLECTIONS_QUERY, {
      first: count,
    });

    return data.collections.nodes.map(mapShopifyCollectionToFeaturedCollection);
  } catch (error) {
    console.error(
      "getCollectionsForSitemap: Shopify request failed; omitting collections from sitemap.",
      error,
    );
    return [];
  }
}
