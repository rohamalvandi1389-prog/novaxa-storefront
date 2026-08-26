import type { Metadata } from "next";
import { CollectionProducts } from "@/components/product/CollectionProducts";
import { getCollectionByHandle } from "@/lib/shopify/collection";
import { buildCollectionMetadata, buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd } from "@/lib/seo/structuredData";

const ACCESSORIES_HANDLE = "accessories";
const ACCESSORIES_PATH = "/accessories";

/**
 * /accessories — the main accessories category landing page. This is a
 * thin wrapper around the exact same data layer and UI the dynamic
 * /collections/[handle] route already uses (getCollectionByHandle +
 * CollectionProducts) — no new Shopify query, no duplicated product
 * mapping, no fabricated products. If Shopify has no "accessories"
 * collection (or is unreachable), CollectionProducts already renders
 * its existing "no products" state gracefully — nothing invented here.
 *
 * Canonical is self-referential (/accessories, not
 * /collections/accessories) since this is the primary, nav-linked entry
 * point for the category — the generic /collections/[handle] route
 * remains self-canonical for any other collection.
 */
export async function generateMetadata(): Promise<Metadata> {
  const collection = await getCollectionByHandle(ACCESSORIES_HANDLE);

  if (!collection) {
    return buildPageMetadata({
      title: "Accessories",
      description: "Finishing details, made to last.",
      path: ACCESSORIES_PATH,
    });
  }

  return buildCollectionMetadata(collection, ACCESSORIES_PATH);
}

export default async function AccessoriesPage() {
  const collection = await getCollectionByHandle(ACCESSORIES_HANDLE);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Accessories", path: ACCESSORIES_PATH },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {collection ? (
        <CollectionProducts collection={collection} />
      ) : (
        <CollectionProducts
          collection={{
            title: "Accessories",
            description: "Finishing details, made to last.",
            products: [],
          }}
        />
      )}
    </>
  );
}
