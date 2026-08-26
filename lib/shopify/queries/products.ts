/**
 * PRODUCT_CARD_FRAGMENT — the field selection any product-card-shaped
 * list needs (exactly what lib/shopify/mappers/productMapper.ts's
 * mapShopifyProductToFeaturedProduct expects). Exported so
 * lib/shopify/queries/search.ts (Phase 19) can reuse it rather than
 * duplicating the same selection — search results render through the
 * same ProductCard, so they need the same fields.
 */
export const PRODUCT_CARD_FRAGMENT = /* GraphQL */ `
  fragment ProductCardFields on Product {
    id
    title
    handle
    productType
    tags
    featuredImage {
      url
      altText
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

/**
 * FEATURED_PRODUCTS_QUERY — no descriptionHtml, no variants, no options;
 * those belong to a product-detail query, not this one.
 */
export const FEATURED_PRODUCTS_QUERY = /* GraphQL */ `
  ${PRODUCT_CARD_FRAGMENT}
  query FeaturedProducts($first: Int!) {
    products(first: $first) {
      nodes {
        ...ProductCardFields
      }
    }
  }
`;
