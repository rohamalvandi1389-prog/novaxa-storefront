import { CART_DETAIL_FRAGMENT } from "../queries/cart";

/**
 * UPDATE_CART_LINE_MUTATION / REMOVE_CART_LINE_MUTATION — both reuse
 * CART_DETAIL_FRAGMENT (lib/shopify/queries/cart.ts) for their returned
 * cart, since after either mutation the UI needs the same full line-item
 * detail a fresh cart read would have — no duplicated selection set.
 */

export const UPDATE_CART_LINE_MUTATION = /* GraphQL */ `
  ${CART_DETAIL_FRAGMENT}
  mutation UpdateCartLine($cartId: ID!, $lineId: ID!, $quantity: Int!) {
    cartLinesUpdate(cartId: $cartId, lines: [{ id: $lineId, quantity: $quantity }]) {
      cart {
        ...CartDetailFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const REMOVE_CART_LINE_MUTATION = /* GraphQL */ `
  ${CART_DETAIL_FRAGMENT}
  mutation RemoveCartLine($cartId: ID!, $lineId: ID!) {
    cartLinesRemove(cartId: $cartId, lineIds: [$lineId]) {
      cart {
        ...CartDetailFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;
