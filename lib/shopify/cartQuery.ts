import { shopifyRequest } from "./graphql";
import { CART_QUERY } from "./queries/cart";
import type { ShopifyCartDetail, ShopifyCartQueryResponse } from "@/types/shopify";

/**
 * getCart — fetches an existing cart by ID.
 *
 * Returns null both when the cart doesn't exist (invalid ID, expired, or
 * already completed) and when the Shopify request itself fails — logging
 * only the latter. Never throws; there's no fallback cart to invent, so
 * the route treats null as "show the empty cart state" either way.
 *
 * No React, no JSX — a plain async function, callable from
 * app/cart/page.tsx.
 */
export async function getCart(cartId: string): Promise<ShopifyCartDetail | null> {
  try {
    const data = await shopifyRequest<ShopifyCartQueryResponse>(CART_QUERY, { cartId });
    return data.cart;
  } catch (error) {
    // Never log the cart ID itself — it's a bearer-style identifier for
    // that cart. The error object still gives useful diagnostics.
    console.error("getCart: Shopify request failed.", error);
    return null;
  }
}
