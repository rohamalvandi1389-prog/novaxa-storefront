import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { getCartId } from "@/lib/server/cart";
import { getCart } from "@/lib/shopify/cartQuery";
import { mapShopifyCartToCartPageData } from "@/lib/shopify/mappers/cartMapper";
import type { CartPageData } from "@/types/cart";

export const metadata: Metadata = {
  title: "Your Bag",
};

/** No cart ID cookie, or the ID no longer resolves to a real cart — both
 * cases render the same empty state, never a fabricated cart/products. */
const EMPTY_CART_DATA: CartPageData = {
  items: [],
  totalQuantity: 0,
  subtotal: { amount: "0.00", currencyCode: "USD" },
  checkoutUrl: "",
};

export default async function CartPage() {
  const cartId = await getCartId();

  if (!cartId) {
    return <CartView cart={EMPTY_CART_DATA} />;
  }

  const shopifyCart = await getCart(cartId);

  if (!shopifyCart) {
    return <CartView cart={EMPTY_CART_DATA} />;
  }

  const cartData = mapShopifyCartToCartPageData(shopifyCart);

  return <CartView cart={cartData} />;
}
