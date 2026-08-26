import type { CartDrawerData } from "@/types/cartDrawer";
import type { ShopifyCartDetail } from "@/types/shopify";

const DRAWER_LINE_ITEM_LIMIT = 3;

/**
 * mapShopifyCartToCartDrawerData — reshapes the same ShopifyCartDetail
 * already returned by lib/shopify/cartQuery.ts's getCart() (Phase 16)
 * into the drawer's minimal shape. No new query, no duplicated Shopify
 * cart fetching logic — just picks a subset of fields and truncates to
 * the first few items. Pure data transform, no UI logic.
 */
export function mapShopifyCartToCartDrawerData(cart: ShopifyCartDetail): CartDrawerData {
  return {
    items: cart.lines.nodes.slice(0, DRAWER_LINE_ITEM_LIMIT).map((line) => {
      const merchandise = line.merchandise;

      return {
        id: line.id,
        title: merchandise.product.title,
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
    checkoutUrl: cart.checkoutUrl,
  };
}
