import { mapShopifyProductToFeaturedProduct } from "./productMapper";
import type { SearchResult } from "@/types/search";
import type { ShopifyProduct } from "@/types/shopify";

/**
 * mapShopifyProductsToSearchResult — converts raw Shopify search results
 * into SearchResult (types/search.ts). Reuses the existing
 * mapShopifyProductToFeaturedProduct (Phase 11.2) for each product rather
 * than a second, duplicated mapping function — search results and
 * featured products render through the exact same ProductCard, so they
 * need the exact same mapping. Pure data transform, no UI logic.
 */
export function mapShopifyProductsToSearchResult(products: ShopifyProduct[]): SearchResult {
  return {
    products: products.map(mapShopifyProductToFeaturedProduct),
  };
}
