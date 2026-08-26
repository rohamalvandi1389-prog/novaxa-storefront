import { shopifyRequest } from "./graphql";
import { SEARCH_PRODUCTS_QUERY } from "./queries/search";
import type { ShopifyProduct, ShopifyProductsResponse } from "@/types/shopify";

const DEFAULT_SEARCH_RESULTS_COUNT = 24;

/**
 * searchProducts — searches Shopify products by a free-text query.
 *
 * Reuses ShopifyProductsResponse (Phase 11.2) rather than declaring a new
 * response type — SEARCH_PRODUCTS_QUERY returns the exact same
 * `products.nodes` shape as the featured products query.
 *
 * Returns [] both for an empty query and any request failure (logged in
 * the latter case) — never throws, and there are no fake results to fall
 * back to.
 *
 * No React, no JSX — a plain async function, callable from
 * app/search/page.tsx.
 */
export async function searchProducts(
  query: string,
  count: number = DEFAULT_SEARCH_RESULTS_COUNT,
): Promise<ShopifyProduct[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  try {
    const data = await shopifyRequest<ShopifyProductsResponse>(SEARCH_PRODUCTS_QUERY, {
      query: trimmedQuery,
      first: count,
    });

    return data.products.nodes;
  } catch (error) {
    console.error(`searchProducts: Shopify request failed for query "${trimmedQuery}".`, error);
    return [];
  }
}

/**
 * getProductsByHandles — resolves multiple products by handle in a
 * single request (Phase 21, for the wishlist). The Storefront API has no
 * dedicated "products by handles" field, so this reuses
 * SEARCH_PRODUCTS_QUERY with Shopify's `handle:` search syntax
 * (`"handle:a OR handle:b OR ..."`) rather than adding a second query or
 * firing one request per handle — no new query, no new type, same
 * response shape as searchProducts().
 *
 * Callers are expected to have already validated/sanitized `handles`
 * (see app/actions/wishlist.ts) — this function trusts its input beyond
 * de-duplicating and dropping empty strings.
 *
 * Returns [] for an empty list and on any request failure (logged);
 * never throws. A handle that doesn't match any product is simply absent
 * from Shopify's response — nothing special to handle here for that.
 */
export async function getProductsByHandles(handles: string[]): Promise<ShopifyProduct[]> {
  const uniqueHandles = Array.from(new Set(handles.filter((handle) => handle.length > 0)));

  if (uniqueHandles.length === 0) {
    return [];
  }

  const query = uniqueHandles.map((handle) => `handle:${handle}`).join(" OR ");

  try {
    const data = await shopifyRequest<ShopifyProductsResponse>(SEARCH_PRODUCTS_QUERY, {
      query,
      first: uniqueHandles.length,
    });

    return data.products.nodes;
  } catch (error) {
    console.error("getProductsByHandles: Shopify request failed.", error);
    return [];
  }
}
