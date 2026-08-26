import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/product/ProductCard";
import { findPublicAsset } from "@/lib/server/findPublicAsset";
import { SearchForm } from "./SearchForm";
import type { SearchResult } from "@/types/search";

const PRODUCTS_IMAGE_DIR = "images/products";

function productImageFilenames(id: string): string[] {
  return [`${id}.jpg`, `${id}.jpeg`, `${id}.png`, `${id}.webp`];
}

export interface SearchResultsProps {
  query: string;
  result: SearchResult;
}

/**
 * SearchResults — the Search Results page's content. Receives a fully
 * resolved SearchResult (and the raw query string, for the heading) as
 * props; has no import of anything under lib/shopify/ or
 * types/shopify.ts, directly or indirectly. Reuses the same ProductCard
 * and local-image-resolution pattern as FeaturedProducts/
 * CollectionProducts.
 *
 * `product.id` is the product handle (see productMapper.ts — every
 * FeaturedProduct's id is set from Shopify's product.handle), so it's
 * used directly to build the /products/<handle> link — no separate
 * `handle` field needed.
 */
export function SearchResults({ query, result }: SearchResultsProps) {
  const hasQuery = query.length > 0;
  const hasResults = result.products.length > 0;

  return (
    <Section background="primary">
      <Container>
        <h1 className="text-h1 font-semibold text-text-primary">
          {hasQuery ? `Search results for "${query}"` : "Search"}
        </h1>

        <div className="mt-lg">
          <SearchForm initialQuery={query} />
        </div>

        {!hasQuery ? (
          <p className="mt-2xl text-body text-text-secondary">
            Enter a search term to find products.
          </p>
        ) : !hasResults ? (
          <p className="mt-2xl text-body text-text-secondary">
            No products found for &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <>
            <h2 className="sr-only">Search results</h2>
            <div className="mt-2xl grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-4">
              {result.products.map((product) => (
                <ProductCard
                  key={product.id}
                  productId={product.id}
                  title={product.title}
                  category={product.category}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  badge={product.badge}
                  imageSrc={findPublicAsset(PRODUCTS_IMAGE_DIR, productImageFilenames(product.id))}
                  imageAlt={product.image.altText}
                  href={`/products/${product.id}`}
                />
              ))}
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
