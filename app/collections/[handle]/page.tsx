import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionProducts } from "@/components/product/CollectionProducts";
import { getCollectionByHandle } from "@/lib/shopify/collection";
import { buildCollectionMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/seo/structuredData";

interface CollectionPageProps {
  // Next.js 15: route params are async.
  params: Promise<{ handle: string }>;
}

/**
 * Metadata and the page component both call getCollectionByHandle() with
 * the same handle — no second Shopify query; Next.js's automatic fetch
 * request deduping collapses this into a single actual network call,
 * same reasoning as the product detail route. The metadata shape itself
 * lives in lib/seo/metadata.ts (buildCollectionMetadata), not duplicated
 * here.
 */
export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return {};
  }

  return buildCollectionMetadata(collection, `/collections/${handle}`);
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    notFound();
  }

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: collection.title, path: `/collections/${handle}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CollectionProducts collection={collection} />
    </>
  );
}
