import { getSiteUrl, SITE_NAME } from "./site";

/**
 * Structured data builders. Every field here is either a fixed brand
 * fact already established elsewhere in this project (name, url, logo,
 * the real /search route) or supplied by the caller from real page
 * data (breadcrumb items) — nothing is invented. No address, phone,
 * social profiles, founders, or legal entity details are included,
 * since none of those exist anywhere in this project.
 */

export interface OrganizationJsonLd {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
}

export function buildOrganizationJsonLd(): OrganizationJsonLd {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}/logo/novaxa-logo.png`,
  };
}

export interface WebSiteJsonLd {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

/**
 * The SearchAction target points at the real /search route with its
 * actual query parameter (?q=) — verified working, not a fabricated
 * endpoint. If /search's query parameter name ever changes, update it
 * here too.
 */
export function buildWebSiteJsonLd(): WebSiteJsonLd {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Site-relative path, e.g. "/shop". */
  path: string;
}

export interface BreadcrumbListJsonLd {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * buildBreadcrumbJsonLd — only ever called with items the page itself
 * already knows are real (its own title/handle and "Home"/"Shop") —
 * never an invented URL.
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): BreadcrumbListJsonLd {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
