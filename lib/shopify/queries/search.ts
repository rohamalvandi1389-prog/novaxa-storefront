import { PRODUCT_CARD_FRAGMENT } from "./products";

/**
 * SEARCH_PRODUCTS_QUERY — same field selection as FEATURED_PRODUCTS_QUERY
 * (via the shared PRODUCT_CARD_FRAGMENT), since search results render
 * through the same ProductCard and the same mapper
 * (mapShopifyProductToFeaturedProduct). Only the `query: $query` search
 * argument differs.
 *
 * Not called anywhere except lib/shopify/search.ts.
 */
export const SEARCH_PRODUCTS_QUERY = /* GraphQL */ `
  ${PRODUCT_CARD_FRAGMENT}
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      nodes {
        ...ProductCardFields
      }
    }
  }
`;
