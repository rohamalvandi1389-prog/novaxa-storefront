/**
 * COLLECTION_DETAIL_QUERY — queries exactly the fields
 * lib/shopify/mappers/collectionDetailMapper.ts needs to produce a
 * CollectionDetail. The products connection requests the same fields as
 * FEATURED_PRODUCTS_QUERY (lib/shopify/queries/products.ts), since both
 * feed the same mapping function.
 *
 * Not called anywhere except lib/shopify/collection.ts.
 */
export const COLLECTION_DETAIL_QUERY = /* GraphQL */ `
  query CollectionDetail($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: $first) {
        nodes {
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
      }
    }
  }
`;
