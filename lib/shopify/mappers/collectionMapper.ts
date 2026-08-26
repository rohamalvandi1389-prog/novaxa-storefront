import type { CollectionItem } from "@/constants/collections";
import type { ShopifyCollection } from "@/types/shopify";

/**
 * mapShopifyCollectionToFeaturedCollection — converts a Shopify Storefront
 * API collection into exactly the shape CollectionCard already consumes
 * (constants/collections.ts's CollectionItem). This is the one place that
 * translates Shopify's schema into the frontend's — CollectionCard and
 * FeaturedCollections.tsx stay completely unaware Shopify exists.
 *
 * Mapping notes:
 * - `slug` uses the collection handle, matching how the temporary data
 *   already uses slug both for routing later and as the local
 *   image-filename base in FeaturedCollections.tsx.
 * - `image` is intentionally NOT carried through, even though it's
 *   queried (per the required fields) — CollectionItem has no image slot
 *   today; local images are resolved separately via
 *   lib/server/findPublicAsset. Same known limitation as
 *   productMapper.ts's featuredImage handling — revisit if/when
 *   CollectionCard is updated to accept a real Shopify image URL.
 */
export function mapShopifyCollectionToFeaturedCollection(
  collection: ShopifyCollection,
): CollectionItem {
  return {
    title: collection.title,
    slug: collection.handle,
    description: collection.description,
  };
}
