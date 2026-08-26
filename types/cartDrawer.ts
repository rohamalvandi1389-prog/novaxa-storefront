import type { Money } from "@/types/money";
import type { CartLineImage } from "@/types/cart";

/**
 * CartDrawerLineItem — deliberately smaller than CartLineItem
 * (types/cart.ts): no quantity or variant title, since the drawer's
 * "Display" requirements only call for image, title, and price per row.
 * `image` is reused from types/cart.ts rather than redeclaring the same
 * {url, altText} shape.
 */
export interface CartDrawerLineItem {
  id: string;
  title: string;
  price: Money;
  image?: CartLineImage;
}

/**
 * CartDrawerData — the shape components/cart/CartDrawer.tsx consumes.
 * Deliberately Shopify-unaware, same discipline as every other frontend
 * type in this project.
 */
export interface CartDrawerData {
  items: CartDrawerLineItem[];
  totalQuantity: number;
  /** Empty string when there's no real cart yet — CartDrawer guards on
   * this before rendering the Checkout link, same as CartView. */
  checkoutUrl: string;
}
