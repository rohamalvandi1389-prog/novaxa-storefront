/**
 * CART_DETAIL_FRAGMENT — the field selection for a cart with enough
 * merchandise detail (product title, variant title, price, image) to
 * render a cart page. Exported so lib/shopify/mutations/cartLines.ts
 * (Phase 17) can reuse it rather than duplicating the same selection —
 * update/remove mutations return the same detailed cart shape a fresh
 * read does. Deliberately separate from CART_FRAGMENT in
 * lib/shopify/mutations/cart.ts (named CartDetailFields, not CartFields,
 * to avoid any fragment-name collision), since cartCreate/cartLinesAdd
 * only ever need a bare merchandise id.
 */
export const CART_DETAIL_FRAGMENT = /* GraphQL */ `
  fragment CartDetailFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
            product {
              title
              handle
            }
          }
        }
      }
    }
  }
`;

export const CART_QUERY = /* GraphQL */ `
  ${CART_DETAIL_FRAGMENT}
  query CartQuery($cartId: ID!) {
    cart(id: $cartId) {
      ...CartDetailFields
    }
  }
`;
