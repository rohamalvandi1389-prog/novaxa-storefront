import { shopifyRequest } from "./graphql";
import { FEATURED_PRODUCTS_QUERY } from "./queries/products";
import { mapShopifyProductToFeaturedProduct } from "./mappers/productMapper";
import { featuredProducts as fallbackFeaturedProducts } from "@/constants/featuredProducts";
import type { FeaturedProduct } from "@/constants/featuredProducts";
import type { ShopifyProductsResponse } from "@/types/shopify";

const DEFAULT_FEATURED_PRODUCTS_COUNT = 4;

/**
 * getFeaturedProducts — the server-side data layer for the homepage's
 * Featured Products section.
 *
 * Data flow:
 *   Shopify Storefront API
 *     → FEATURED_PRODUCTS_QUERY
 *     → shopifyRequest()
 *     → mapShopifyProductToFeaturedProduct() (per product)
 *     → FeaturedProduct[] returned here
 *
 * On any failure (missing env vars, network error, GraphQL error), logs
 * and falls back to the temporary constants/featuredProducts.ts data
 * instead of throwing — the homepage must never crash or render an empty
 * section because Shopify is unreachable or not yet configured.
 *
 * No React, no JSX — a plain async function, callable from any Server
 * Component (e.g. app/page.tsx).
 */
export async function getFeaturedProducts(
  count: number = DEFAULT_FEATURED_PRODUCTS_COUNT,
): Promise<FeaturedProduct[]> {
  try {
    const data = await shopifyRequest<ShopifyProductsResponse>(FEATURED_PRODUCTS_QUERY, {
      first: count,
    });

    return data.products.nodes.map(mapShopifyProductToFeaturedProduct);
  } catch (error) {
    console.error(
      "getFeaturedProducts: Shopify request failed, falling back to constants/featuredProducts.ts.",
      error,
    );
    return [...fallbackFeaturedProducts];
  }
}

/**
 * getProductsForSitemap — same query and mapper as getFeaturedProducts,
 * deliberately WITHOUT its fallback-to-constants behavior. A sitemap
 * must never list a URL that doesn't correspond to a real product — the
 * homepage's "show something rather than nothing" fallback is correct
 * there and wrong here. On any failure, returns [] so the affected
 * routes are simply omitted from the sitemap this run, rather than
 * publishing URLs that may 404 in production.
 */
export async function getProductsForSitemap(
  count: number = DEFAULT_FEATURED_PRODUCTS_COUNT,
): Promise<FeaturedProduct[]> {
  try {
    const data = await shopifyRequest<ShopifyProductsResponse>(FEATURED_PRODUCTS_QUERY, {
      first: count,
    });

    return data.products.nodes.map(mapShopifyProductToFeaturedProduct);
  } catch (error) {
    console.error("getProductsForSitemap: Shopify request failed; omitting products from sitemap.", error);
    return [];
  }
}
