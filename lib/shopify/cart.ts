import { shopifyRequest } from "./graphql";
import { ADD_TO_CART_MUTATION, CREATE_CART_MUTATION } from "./mutations/cart";
import { REMOVE_CART_LINE_MUTATION, UPDATE_CART_LINE_MUTATION } from "./mutations/cartLines";
import type {
  ShopifyCart,
  ShopifyCartCreateResponse,
  ShopifyCartDetail,
  ShopifyCartLinesAddResponse,
  ShopifyCartLinesRemoveResponse,
  ShopifyCartLinesUpdateResponse,
} from "@/types/shopify";

export class ShopifyCartError extends Error {
  constructor(
    message: string,
    public override readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ShopifyCartError";
  }
}

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

/**
 * createCart — creates a new Shopify cart, optionally seeded with initial
 * lines. Throws ShopifyCartError on any failure (request failure,
 * GraphQL userErrors, or a missing cart in the response) rather than
 * returning null/a fallback — unlike the read layer (products,
 * collections), there's no sensible "fallback cart" to invent for a
 * write operation; the caller needs to know it failed.
 */
export async function createCart(lines: CartLineInput[] = []): Promise<ShopifyCart> {
  try {
    const data = await shopifyRequest<ShopifyCartCreateResponse>(CREATE_CART_MUTATION, {
      lines,
    });

    const { cart, userErrors } = data.cartCreate;

    if (userErrors.length > 0) {
      throw new ShopifyCartError(userErrors.map((userError) => userError.message).join(" "));
    }

    if (!cart) {
      throw new ShopifyCartError("Shopify did not return a cart.");
    }

    return cart;
  } catch (error) {
    if (error instanceof ShopifyCartError) throw error;
    throw new ShopifyCartError("Failed to create cart.", error);
  }
}

/**
 * addToCart — adds one line to an existing cart. Same error-handling
 * approach as createCart: throws rather than silently falling back.
 */
export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity = 1,
): Promise<ShopifyCart> {
  try {
    const data = await shopifyRequest<ShopifyCartLinesAddResponse>(ADD_TO_CART_MUTATION, {
      cartId,
      merchandiseId,
      quantity,
    });

    const { cart, userErrors } = data.cartLinesAdd;

    if (userErrors.length > 0) {
      throw new ShopifyCartError(userErrors.map((userError) => userError.message).join(" "));
    }

    if (!cart) {
      throw new ShopifyCartError("Shopify did not return a cart.");
    }

    return cart;
  } catch (error) {
    if (error instanceof ShopifyCartError) throw error;
    throw new ShopifyCartError("Failed to add item to cart.", error);
  }
}

/**
 * updateCartLine — sets a line's quantity on an existing cart. Returns
 * the richer ShopifyCartDetail (not the minimal ShopifyCart createCart/
 * addToCart return), since after this the UI re-renders full line-item
 * detail. Same error-handling approach: throws rather than falling back.
 */
export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<ShopifyCartDetail> {
  try {
    const data = await shopifyRequest<ShopifyCartLinesUpdateResponse>(UPDATE_CART_LINE_MUTATION, {
      cartId,
      lineId,
      quantity,
    });

    const { cart, userErrors } = data.cartLinesUpdate;

    if (userErrors.length > 0) {
      throw new ShopifyCartError(userErrors.map((userError) => userError.message).join(" "));
    }

    if (!cart) {
      throw new ShopifyCartError("Shopify did not return a cart.");
    }

    return cart;
  } catch (error) {
    if (error instanceof ShopifyCartError) throw error;
    throw new ShopifyCartError("Failed to update cart item.", error);
  }
}

/**
 * removeCartLine — removes one line from an existing cart. Same
 * error-handling approach as updateCartLine.
 */
export async function removeCartLine(cartId: string, lineId: string): Promise<ShopifyCartDetail> {
  try {
    const data = await shopifyRequest<ShopifyCartLinesRemoveResponse>(REMOVE_CART_LINE_MUTATION, {
      cartId,
      lineId,
    });

    const { cart, userErrors } = data.cartLinesRemove;

    if (userErrors.length > 0) {
      throw new ShopifyCartError(userErrors.map((userError) => userError.message).join(" "));
    }

    if (!cart) {
      throw new ShopifyCartError("Shopify did not return a cart.");
    }

    return cart;
  } catch (error) {
    if (error instanceof ShopifyCartError) throw error;
    throw new ShopifyCartError("Failed to remove cart item.", error);
  }
}
