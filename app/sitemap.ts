import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";
import { getProductsForSitemap } from "@/lib/shopify/products";
import { getCollectionsForSitemap } from "@/lib/shopify/collections";

/** Shopify's Storefront API returns up to 250 items per connection page —
 * request that many rather than the homepage's default of 4, since a
 * sitemap should cover as much of the real catalog as fits in one
 * request. Building a fully paginated "every product" traversal is
 * beyond what this SEO foundation phase asks for. */
const MAX_SITEMAP_ENTRIES = 250;

/**
 * sitemap — uses getProductsForSitemap()/getCollectionsForSitemap(),
 * not getFeaturedProducts()/getFeaturedCollections(). Those homepage
 * functions fall back to temporary constants/ data when Shopify is
 * unreachable — correct for the homepage (show something rather than
 * nothing), wrong for a sitemap (a search engine should never be handed
 * a URL that doesn't actually resolve). The sitemap-specific functions
 * reuse the exact same query and mapper, differing only in what happens
 * on failure: an empty list, so affected routes are simply omitted from
 * this run instead of publishing possibly-invalid URLs.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const [products, collections] = await Promise.all([
    getProductsForSitemap(MAX_SITEMAP_ENTRIES),
    getCollectionsForSitemap(MAX_SITEMAP_ENTRIES),
  ]);

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.id}`,
    lastModified: new Date(),
  }));

  const collectionEntries: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${siteUrl}/collections/${collection.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...productEntries,
    ...collectionEntries,
  ];
}
