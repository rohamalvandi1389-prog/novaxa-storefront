/**
 * FEATURED_COLLECTIONS_QUERY — queries exactly the fields
 * lib/shopify/mappers/collectionMapper.ts needs to produce a
 * CollectionItem (constants/collections.ts's shape). image is queried
 * per the required-fields spec even though CollectionItem doesn't
 * currently carry an image URL through — see collectionMapper.ts.
 *
 * Not called anywhere except lib/shopify/collections.ts.
 */
export const FEATURED_COLLECTIONS_QUERY = /* GraphQL */ `
  query FeaturedCollections($first: Int!) {
    collections(first: $first) {
      nodes {
        id
        title
        handle
        description
        image {
          url
          altText
        }
      }
    }
  }
`;
