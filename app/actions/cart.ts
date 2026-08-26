"use server";

import { revalidatePath } from "next/cache";
import { addToCart, createCart, removeCartLine, ShopifyCartError, updateCartLine } from "@/lib/shopify/cart";
import { clearCartId, getCartId, setCartId } from "@/lib/server/cart";

export interface AddProductToCartResult {
  success: boolean;
  error?: string;
}

/**
 * addProductToCart — the one place UI code is allowed to trigger a
 * Shopify cart mutation. This file is the sanctioned bridge: it imports
 * lib/shopify/cart.ts and lib/server/cart.ts directly, but its own
 * exported signature (string in, plain result object out) carries no
 * Shopify types — components import *this* file, never lib/shopify/ or
 * types/shopify.ts.
 *
 * Flow:
 *   1. Read the existing cart ID (lib/server/cart.ts, cookie-based).
 *   2. If one exists, addToCart(); otherwise createCart() with this line.
 *   3. Persist whatever cart ID Shopify returns via setCartId() — this
 *      also covers the (unusual) case where an existing cart ID cookie
 *      no longer resolves to a valid cart and Shopify effectively starts
 *      a new one.
 *   4. Return { success, error? } — every failure path is caught here;
 *      nothing throws into the UI.
 */
export async function addProductToCart(merchandiseId: string): Promise<AddProductToCartResult> {
  if (!merchandiseId) {
    return { success: false, error: "This product can't be added to your bag right now." };
  }

  try {
    const existingCartId = await getCartId();

    const cart = existingCartId
      ? await addToCart(existingCartId, merchandiseId, 1)
      : await createCart([{ merchandiseId, quantity: 1 }]);

    await setCartId(cart.id);

    return { success: true };
  } catch (error) {
    console.error("addProductToCart failed:", error);

    // An existing cart ID that Shopify no longer recognizes (expired,
    // deleted) would surface as a ShopifyCartError from addToCart —
    // clear it so the next attempt starts a fresh cart instead of
    // retrying against the same invalid ID.
    if (error instanceof ShopifyCartError) {
      await clearCartId();
    }

    return { success: false, error: "We couldn't add this to your bag. Please try again." };
  }
}

/**
 * updateCartItem — sets a line's quantity. Reuses AddProductToCartResult
 * for its return type since the shape ({success, error?}) is identical
 * across all three cart actions — no separate near-duplicate type.
 *
 * revalidatePath("/cart") after a successful mutation is what makes the
 * currently-mounted /cart page re-render with fresh data — these actions
 * are invoked directly from a Client Component (not a <form action>), so
 * nothing else would trigger that refresh.
 */
export async function updateCartItem(
  lineId: string,
  quantity: number,
): Promise<AddProductToCartResult> {
  if (!lineId || quantity < 1) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  try {
    const cartId = await getCartId();

    if (!cartId) {
      return { success: false, error: "Your bag couldn't be found. Please refresh the page." };
    }

    const cart = await updateCartLine(cartId, lineId, quantity);
    await setCartId(cart.id);
    revalidatePath("/cart");

    return { success: true };
  } catch (error) {
    console.error("updateCartItem failed:", error);
    return { success: false, error: "We couldn't update your bag. Please try again." };
  }
}

/**
 * removeCartItem — removes one line entirely. Also what the UI calls
 * when the minus button would take a line's quantity to 0, rather than
 * calling updateCartItem with quantity 0.
 */
export async function removeCartItem(lineId: string): Promise<AddProductToCartResult> {
  if (!lineId) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

  try {
    const cartId = await getCartId();

    if (!cartId) {
      return { success: false, error: "Your bag couldn't be found. Please refresh the page." };
    }

    const cart = await removeCartLine(cartId, lineId);
    await setCartId(cart.id);
    revalidatePath("/cart");

    return { success: true };
  } catch (error) {
    console.error("removeCartItem failed:", error);
    return { success: false, error: "We couldn't remove this item. Please try again." };
  }
}
