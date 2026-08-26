import type { CartPageData } from "@/types/cart";
import type { ShopifyCartDetail } from "@/types/shopify";

/** Shopify's placeholder variant title for products with no real options
 * — not meaningful to show in the UI. */
const DEFAULT_VARIANT_TITLE = "Default Title";

/**
 * mapShopifyCartToCartPageData — converts a Shopify cart detail response
 * into CartPageData (types/cart.ts). Pure data transform, no UI logic —
 * CartView stays unaware Shopify exists.
 */
export function mapShopifyCartToCartPageData(cart: ShopifyCartDetail): CartPageData {
  return {
    items: cart.lines.nodes.map((line) => {
      const merchandise = line.merchandise;
      const variantTitle =
        merchandise.title && merchandise.title !== DEFAULT_VARIANT_TITLE
          ? merchandise.title
          : undefined;

      return {
        id: line.id,
        title: merchandise.product.title,
        variantTitle,
        quantity: line.quantity,
        price: merchandise.price,
        image: merchandise.image
          ? {
              url: merchandise.image.url,
              altText: merchandise.image.altText ?? merchandise.product.title,
            }
          : undefined,
      };
    }),
    totalQuantity: cart.totalQuantity,
    subtotal: cart.cost.subtotalAmount,
    checkoutUrl: cart.checkoutUrl,
  };
}
