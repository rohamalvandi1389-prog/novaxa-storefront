import type { ShopifyClientConfig } from "@/types/shopify";

/**
 * Bump periodically — see shopify.dev/changelog. Not an environment
 * variable: only SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN
 * are required per the approved env var list.
 */
const SHOPIFY_API_VERSION = "2024-10";

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env.local and set it.`,
    );
  }

  return value;
}

/**
 * Resolves Shopify Storefront API config from environment variables.
 * Deliberately lazy (called per-request, not evaluated at module load) so
 * importing this module never throws during a build step that doesn't
 * actually need Shopify.
 *
 * Server-only: reads SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN,
 * neither of which carries the NEXT_PUBLIC_ prefix, so Next.js never
 * inlines them into a client bundle. This file must never be imported
 * from a "use client" component.
 */
export function getShopifyClientConfig(): ShopifyClientConfig {
  const storeDomain = requireEnv("SHOPIFY_STORE_DOMAIN");
  const storefrontAccessToken = requireEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN");

  return {
    storeDomain,
    storefrontAccessToken,
    apiVersion: SHOPIFY_API_VERSION,
    endpoint: `https://${storeDomain}/api/${SHOPIFY_API_VERSION}/graphql.json`,
  };
}
