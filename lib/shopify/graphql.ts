import { getShopifyClientConfig } from "./client";
import type { ShopifyGraphQLResponse } from "@/types/shopify";

export class ShopifyGraphQLRequestError extends Error {
  constructor(
    message: string,
    public override readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ShopifyGraphQLRequestError";
  }
}

export interface ShopifyRequestOptions {
  /** Passed through to fetch's Next.js extensions. */
  revalidate?: number | false;
  tags?: string[];
}

/**
 * shopifyRequest — the single place a GraphQL query is sent to the
 * Shopify Storefront API. Generic over the expected response shape;
 * callers supply their own query string and variables, so this file has
 * no knowledge of specific Shopify domain objects.
 *
 * Server-only (imports lib/shopify/client, which requires server-only
 * env vars) — never call from a "use client" component.
 */
export async function shopifyRequest<
  TData,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
>(query: string, variables?: TVariables, options?: ShopifyRequestOptions): Promise<TData> {
  const { endpoint, storefrontAccessToken } = getShopifyClientConfig();

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      ...(options && {
        next: { revalidate: options.revalidate, tags: options.tags },
      }),
    });
  } catch (cause) {
    throw new ShopifyGraphQLRequestError("Failed to reach the Shopify Storefront API.", cause);
  }

  if (!response.ok) {
    throw new ShopifyGraphQLRequestError(
      `Shopify Storefront API responded with ${response.status} ${response.statusText}.`,
    );
  }

  const payload = (await response.json()) as ShopifyGraphQLResponse<TData>;

  if (payload.errors && payload.errors.length > 0) {
    throw new ShopifyGraphQLRequestError(
      payload.errors.map((error) => error.message).join(" "),
      payload.errors,
    );
  }

  if (!payload.data) {
    throw new ShopifyGraphQLRequestError("Shopify Storefront API returned no data.");
  }

  return payload.data;
}
