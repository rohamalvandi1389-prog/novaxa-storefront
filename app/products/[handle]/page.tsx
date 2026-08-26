import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product/ProductDetails";
import { getProductByHandle } from "@/lib/shopify/product";
import { buildProductMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/seo/structuredData";

interface ProductPageProps {
  // Next.js 15: route params are async.
  params: Promise<{ handle: string }>;
}

/**
 * Metadata and the page component both call getProductByHandle() with the
 * same handle — no second Shopify query. Next.js automatically dedupes
 * identical fetch() calls within a single request (both go through
 * shopifyRequest's fetch), so this isn't a duplicate network request in
 * practice. The metadata shape itself lives in lib/seo/metadata.ts
 * (buildProductMetadata), shared with any other page that might need
 * product metadata — not duplicated here.
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {};
  }

  return buildProductMetadata(product, `/products/${handle}`);
}

/**
 * Breadcrumb is Home → Shop → [Product Title]. "Shop" is used as the
 * middle step (rather than a specific collection) since a product's
 * collection membership isn't modeled in ProductDetail — /shop is a
 * real, existing route every product is reachable from.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: product.title, path: `/products/${handle}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetails product={product} />
    </>
  );
}
