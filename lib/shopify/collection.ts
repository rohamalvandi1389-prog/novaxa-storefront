import { shopifyRequest } from "./graphql";
import { COLLECTION_DETAIL_QUERY } from "./queries/collection";
import { mapShopifyCollectionToCollectionDetail } from "./mappers/collectionDetailMapper";
import type { CollectionDetail } from "@/types/collection";
import type { ShopifyCollectionDetailResponse } from "@/types/shopify";

const DEFAULT_COLLECTION_PRODUCTS_COUNT = 24;

/**
 * getCollectionByHandle — server-side data layer for the Collection Page.
 *
 * Data flow:
 *   Shopify Storefront API
 *     → COLLECTION_DETAIL_QUERY
 *     → shopifyRequest()
 *     → mapShopifyCollectionToCollectionDetail()
 *     → CollectionDetail returned here
 *
 * Returns null both when no collection matches the handle AND when the
 * Shopify request itself fails (missing env vars, network error, GraphQL
 * error) — logging only the latter. Unlike the homepage sections, there
 * is no fallback collection to invent, so the route treats null
 * uniformly as a not-found state. Never throws.
 *
 * No React, no JSX — a plain async function, callable from any Server
 * Component (e.g. app/collections/[handle]/page.tsx).
 */
export async function getCollectionByHandle(
  handle: string,
  count: number = DEFAULT_COLLECTION_PRODUCTS_COUNT,
): Promise<CollectionDetail | null> {
  try {
    const data = await shopifyRequest<ShopifyCollectionDetailResponse>(COLLECTION_DETAIL_QUERY, {
      handle,
      first: count,
    });

    if (!data.collection) {
      return null;
    }

    return mapShopifyCollectionToCollectionDetail(data.collection);
  } catch (error) {
    console.error(`getCollectionByHandle: Shopify request failed for handle "${handle}".`, error);
    return null;
  }
}
