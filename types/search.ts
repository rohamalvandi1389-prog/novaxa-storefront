import type { FeaturedProduct } from "@/constants/featuredProducts";

/**
 * SearchResult — the shape components/search/SearchResults.tsx consumes.
 * `products` reuses the existing FeaturedProduct shape (the same one
 * ProductCard, FeaturedProducts, and CollectionProducts already render)
 * rather than introducing another near-identical product type.
 */
export interface SearchResult {
  products: FeaturedProduct[];
}
