import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/product/ProductCard";
import { findPublicAsset } from "@/lib/server/findPublicAsset";
import type { FeaturedProduct } from "@/constants/featuredProducts";

const PRODUCTS_IMAGE_DIR = "images/products";

function productImageFilenames(id: string): string[] {
  return [`${id}.jpg`, `${id}.jpeg`, `${id}.png`, `${id}.webp`];
}

export interface FeaturedProductsProps {
  /** Already-resolved product list — Shopify or fallback, this component
   * doesn't know or care which. Provided by the caller (app/page.tsx),
   * which is the only place allowed to reach into lib/shopify/. */
  products: FeaturedProduct[];
}

/**
 * FeaturedProducts — homepage section listing the given products. Purely
 * presentational: receives data as a prop and has no import of anything
 * under lib/shopify/ or types/shopify.ts, directly or indirectly. Rendered
 * on the primary background, alternating with FeaturedCollections'
 * secondary background above it.
 */
export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <Section background="primary">
      <Container>
        <div className="flex flex-col gap-sm">
          <h2 className="text-h2 font-semibold text-text-primary">Featured Products</h2>
          <p className="max-w-2xl text-body text-text-secondary">
            A closer look at what&apos;s new this season.
          </p>
        </div>

        <div className="mt-2xl grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
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
      </Container>
    </Section>
  );
}
