import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { findPublicAsset } from "@/lib/server/findPublicAsset";
import { ProductCard } from "./ProductCard";
import type { CollectionDetail } from "@/types/collection";

const PRODUCTS_IMAGE_DIR = "images/products";

function productImageFilenames(id: string): string[] {
  return [`${id}.jpg`, `${id}.jpeg`, `${id}.png`, `${id}.webp`];
}

export interface CollectionProductsProps {
  collection: CollectionDetail;
}

/**
 * CollectionProducts — the Collection Page's content. Receives a fully
 * resolved CollectionDetail as a prop; has no import of anything under
 * lib/shopify/ or types/shopify.ts, directly or indirectly. Reuses the
 * same ProductCard and local-image-resolution pattern as
 * components/home/FeaturedProducts.tsx.
 *
 * The sr-only "Products" heading is a semantic-only addition (zero
 * visual change) so heading order is H1 → H2 → H3 (each ProductCard's
 * title) instead of jumping straight from H1 to H3.
 */
export function CollectionProducts({ collection }: CollectionProductsProps) {
  return (
    <Section background="primary">
      <Container>
        <div className="flex flex-col gap-sm">
          <h1 className="text-h1 font-semibold text-text-primary">{collection.title}</h1>
          {collection.description && (
            <p className="max-w-2xl text-body text-text-secondary">{collection.description}</p>
          )}
        </div>

        {collection.products.length === 0 ? (
          <p className="mt-2xl text-body text-text-secondary">No products in this collection yet.</p>
        ) : (
          <>
            <h2 className="sr-only">Products</h2>
            <div className="mt-2xl grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-4">
              {collection.products.map((product) => (
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
                />
              ))}
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
