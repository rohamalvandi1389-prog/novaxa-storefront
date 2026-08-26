/**
 * PRODUCT_DETAIL_QUERY — queries exactly the fields
 * lib/shopify/mappers/productDetailMapper.ts needs to produce a
 * ProductDetail. Requests up to 8 images. variants(first: 1) was added
 * in Phase 15 to obtain a merchandiseId for Add to Cart — still no
 * variant selector, so only the first variant is fetched.
 *
 * Not called anywhere except lib/shopify/product.ts.
 */
export const PRODUCT_DETAIL_QUERY = /* GraphQL */ `
  query ProductDetail($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      productType
      tags
      featuredImage {
        url
        altText
      }
      images(first: 8) {
        nodes {
          url
          altText
        }
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
      variants(first: 1) {
        nodes {
          id
        }
      }
    }
  }
`;
