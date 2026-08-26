"use server";

import { getCartId } from "@/lib/server/cart";
import { getCart } from "@/lib/shopify/cartQuery";
import { mapShopifyCartToCartDrawerData } from "@/lib/shopify/mappers/cartDrawerMapper";
import type { CartDrawerData } from "@/types/cartDrawer";

const EMPTY_CART_DRAWER_DATA: CartDrawerData = {
  items: [],
  totalQuantity: 0,
  checkoutUrl: "",
};

/**
 * getCartDrawerData — the server-side bridge for the header cart drawer.
 *
 * Deliberately reuses getCart() (lib/shopify/cartQuery.ts, Phase 16) —
 * the exact same query the full cart page uses — rather than adding a
 * second, smaller GraphQL query. Per this phase's instruction to avoid
 * duplicating Shopify cart fetching logic, a `lib/shopify/cartSummary.ts`
 * "fetch" layer was deliberately NOT created: getCart() already fetches
 * everything the drawer needs, so a second fetch function would only
 * wrap it redundantly. The one genuinely new piece is the mapping/
 * truncation to the drawer's minimal shape (mapShopifyCartToCartDrawerData).
 * (A dedicated smaller query — lines(first: 3) instead of first: 100 —
 * would be a reasonable future optimization, but that's a variant of the
 * existing query, not something this phase's instructions asked for.)
 *
 * Never throws: no cart ID cookie, no matching cart, or a Shopify request
 * failure (already handled inside getCart()) all resolve to the same
 * empty drawer state.
 */
export async function getCartDrawerData(): Promise<CartDrawerData> {
  const cartId = await getCartId();

  if (!cartId) {
    return EMPTY_CART_DRAWER_DATA;
  }

  const cart = await getCart(cartId);

  if (!cart) {
    return EMPTY_CART_DRAWER_DATA;
  }

  return mapShopifyCartToCartDrawerData(cart);
}
