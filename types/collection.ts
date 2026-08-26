import type { FeaturedProduct } from "@/constants/featuredProducts";

/**
 * CollectionDetail — the shape components/product/CollectionProducts.tsx
 * consumes. `products` reuses the existing FeaturedProduct shape (the
 * same one ProductCard already renders on the homepage) rather than
 * introducing a near-identical "collection product" type. `image`
 * (Phase 22) was added for Open Graph metadata — the underlying Shopify
 * query already fetched this field; the mapper just hadn't carried it
 * through before, since no UI needed it.
 */
export interface CollectionDetail {
  title: string;
  description: string;
  products: FeaturedProduct[];
  image?: {
    url: string;
    altText: string;
  };
}
