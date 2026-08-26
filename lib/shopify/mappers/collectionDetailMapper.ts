import { mapShopifyProductToFeaturedProduct } from "./productMapper";
import type { CollectionDetail } from "@/types/collection";
import type { ShopifyCollectionDetail } from "@/types/shopify";

/**
 * mapShopifyCollectionToCollectionDetail — converts a Shopify Storefront
 * API collection detail response into CollectionDetail
 * (types/collection.ts). Each product in the connection is mapped with
 * the existing mapShopifyProductToFeaturedProduct (Phase 11.2) rather
 * than a second, duplicated mapping — the fields queried here match what
 * that function already expects. `image` (Phase 22) was already being
 * queried by COLLECTION_DETAIL_QUERY but previously discarded here —
 * now carried through for Open Graph metadata.
 */
export function mapShopifyCollectionToCollectionDetail(
  collection: ShopifyCollectionDetail,
): CollectionDetail {
  return {
    title: collection.title,
    description: collection.description,
    products: collection.products.nodes.map(mapShopifyProductToFeaturedProduct),
    image: collection.image
      ? { url: collection.image.url, altText: collection.image.altText ?? collection.title }
      : undefined,
  };
}
