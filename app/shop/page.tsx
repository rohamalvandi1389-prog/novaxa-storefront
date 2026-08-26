import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { getProductsForSitemap } from "@/lib/shopify/products";
import { findPublicAsset } from "@/lib/server/findPublicAsset";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/seo/structuredData";

export const metadata: Metadata = buildPageMetadata({
  title: "Shop",
  description: "The full NOVAXA edit — accessories and gadgets for a better life.",
  path: "/shop",
});

const PRODUCTS_IMAGE_DIR = "images/products";
const SHOP_PRODUCT_COUNT = 100;

function productImageFilenames(id: string): string[] {
  return [`${id}.jpg`, `${id}.jpeg`, `${id}.png`, `${id}.webp`];
}

/**
 * /shop — the main storefront landing page. Deliberately reuses
 * getProductsForSitemap() (lib/shopify/products.ts, Phase 25) rather
 * than getFeaturedProducts(): that function falls back to temporary
 * constants/ data when Shopify is unreachable, which is the right
 * choice for homepage marketing sections but not for the actual
 * storefront listing — this page must never show fabricated products.
 * getProductsForSitemap() returns real Shopify data or an empty list,
 * never invented data, and needs no new Shopify query.
 *
 * The sr-only "Products" heading below is a semantic-only addition
 * (zero visual change) so the page's heading order is H1 → H2 → H3
 * (each ProductCard's title) instead of jumping straight from H1 to H3.
 */
export default async function ShopPage() {
  const products = await getProductsForSitemap(SHOP_PRODUCT_COUNT);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ]);

  return (
    <Section background="primary">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Container>
        <PageHeader
          eyebrow="Live better. Look better."
          title="Shop"
          description="The full NOVAXA edit — considered accessories and gadgets, in one place."
        />

        {products.length === 0 ? (
          <p className="mt-2xl text-body text-text-secondary">
            The shop is being stocked — check back shortly for the full collection.
          </p>
        ) : (
          <>
            <h2 className="sr-only">Products</h2>
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
