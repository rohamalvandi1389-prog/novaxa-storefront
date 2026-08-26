import { shopifyRequest } from "./graphql";
import { PRODUCT_DETAIL_QUERY } from "./queries/product";
import { mapShopifyProductToProductDetail } from "./mappers/productDetailMapper";
import type { ProductDetail } from "@/types/product";
import type { ShopifyProductDetailResponse } from "@/types/shopify";

/**
 * getProductByHandle — server-side data layer for the Product Detail
 * page.
 *
 * Data flow:
 *   Shopify Storefront API
 *     → PRODUCT_DETAIL_QUERY
 *     → shopifyRequest()
 *     → mapShopifyProductToProductDetail()
 *     → ProductDetail returned here
 *
 * Returns null both when no product matches the handle AND when the
 * Shopify request itself fails (missing env vars, network error, GraphQL
 * error) — logging the latter case. There's no sensible "fallback
 * product" the way the homepage sections have fallback lists, so the
 * route treats null uniformly as a not-found state either way. Never
 * throws.
 *
 * No React, no JSX — a plain async function, callable from any Server
 * Component (e.g. app/products/[handle]/page.tsx).
 */
export async function getProductByHandle(handle: string): Promise<ProductDetail | null> {
  try {
    const data = await shopifyRequest<ShopifyProductDetailResponse>(PRODUCT_DETAIL_QUERY, {
      handle,
    });

    if (!data.product) {
      return null;
    }

    return mapShopifyProductToProductDetail(data.product);
  } catch (error) {
    console.error(`getProductByHandle: Shopify request failed for handle "${handle}".`, error);
    return null;
  }
}
