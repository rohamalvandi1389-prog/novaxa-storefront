import type { Metadata } from "next";
import type { ProductDetail } from "@/types/product";
import type { CollectionDetail } from "@/types/collection";

/**
 * buildProductMetadata / buildCollectionMetadata / buildPageMetadata —
 * the only places page metadata is built, so no page declares its own
 * metadata shape from scratch (no duplicated metadata logic between
 * pages). All three set `alternates.canonical` — combined with
 * `metadataBase` (app/layout.tsx), a relative path here resolves to a
 * full `https://novaxastore.store/...` canonical URL.
 *
 * buildProductMetadata/buildCollectionMetadata take the existing
 * frontend types (ProductDetail, CollectionDetail — already
 * Shopify-unaware, from lib/shopify/mappers/) rather than raw Shopify
 * types, per "do not expose Shopify types to metadata helpers if
 * avoidable" — it's avoidable here since the mapped data already has
 * everything needed. `path` is supplied by the caller (the route, which
 * already has the real handle from `params`) rather than derived here,
 * so this file still doesn't need to know anything about routing.
 */

export function buildProductMetadata(product: ProductDetail, path: string): Metadata {
  const description = product.description.trim() || undefined;
  const primaryImage = product.images[0];

  return {
    title: product.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: product.title,
      description,
      url: path,
      type: "website",
      images: primaryImage ? [{ url: primaryImage.url, alt: primaryImage.altText }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
    },
  };
}

export function buildCollectionMetadata(collection: CollectionDetail, path: string): Metadata {
  const description = collection.description.trim() || undefined;

  return {
    title: collection.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: collection.title,
      description,
      url: path,
      type: "website",
      images: collection.image
        ? [{ url: collection.image.url, alt: collection.image.altText }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: collection.title,
      description,
    },
  };
}

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/shop" — resolved against metadataBase. */
  path: string;
}

/**
 * buildPageMetadata — the shared builder for every static content page
 * (Shop, Accessories, About, Contact, Careers, Shipping, Returns, FAQ,
 * Privacy, Terms). Same canonical + Open Graph + Twitter shape as the
 * product/collection builders, so none of those ten page files declares
 * its own metadata object from scratch.
 */
export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
