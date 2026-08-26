import type { Money } from "@/types/money";

export interface CartLineImage {
  url: string;
  altText: string;
}

/**
 * CartLineItem — one row in CartView. `variantTitle` is only present
 * when it's meaningful (not Shopify's generic "Default Title"
 * placeholder) — see lib/shopify/mappers/cartMapper.ts.
 */
export interface CartLineItem {
  id: string;
  title: string;
  variantTitle?: string;
  quantity: number;
  price: Money;
  image?: CartLineImage;
}

/**
 * CartPageData — the shape components/cart/CartView.tsx consumes.
 * Deliberately Shopify-unaware, same discipline as ProductDetail and
 * CollectionDetail.
 */
export interface CartPageData {
  items: CartLineItem[];
  totalQuantity: number;
  subtotal: Money;
  /** Shopify's hosted checkout URL. Empty string for the empty-cart
   * state (no real cart exists yet) — CartView guards on this before
   * rendering the Checkout link. */
  checkoutUrl: string;
}
