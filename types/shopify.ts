/**
 * Shopify Storefront API types. The request/response envelope types below
 * apply to any query; the Product types further down model only the
 * fields lib/shopify/queries/products.ts actually queries — not the full
 * Shopify schema.
 */

import type { Money } from "@/types/money";

export interface ShopifyGraphQLErrorLocation {
  line: number;
  column: number;
}

export interface ShopifyGraphQLError {
  message: string;
  locations?: ShopifyGraphQLErrorLocation[];
  path?: Array<string | number>;
}

export interface ShopifyGraphQLResponse<TData> {
  data?: TData;
  errors?: ShopifyGraphQLError[];
}

export interface ShopifyClientConfig {
  storeDomain: string;
  storefrontAccessToken: string;
  apiVersion: string;
  endpoint: string;
}

/**
 * Product types. Money is reused from types/money.ts — Shopify's MoneyV2
 * is exactly { amount, currencyCode }, so there's no separate
 * "ProductPrice" type to keep in sync with it.
 */

/** Shared image shape — identical for products and collections in the
 * Storefront API, so both reference this rather than duplicating it. */
export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export type ShopifyProductImage = ShopifyImage;

export interface ShopifyProductPriceRange {
  minVariantPrice: Money;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  productType: string;
  tags: string[];
  featuredImage: ShopifyProductImage | null;
  priceRange: ShopifyProductPriceRange;
  /** Non-null per the Shopify schema even when nothing is discounted —
   * minVariantPrice.amount is "0.0" in that case. Callers determine
   * "on sale" by comparing this to priceRange, not by null-checking it. */
  compareAtPriceRange: ShopifyProductPriceRange;
}

export interface ShopifyProductConnection {
  nodes: ShopifyProduct[];
}

export interface ShopifyProductsResponse {
  products: ShopifyProductConnection;
}

/**
 * Product detail types. Extends ShopifyProduct (id/title/handle/
 * productType/tags/featuredImage/priceRange/compareAtPriceRange) rather
 * than redeclaring those fields — only description and images are net
 * new for the detail query.
 */

export interface ShopifyProductImageConnection {
  nodes: ShopifyImage[];
}

export interface ShopifyProductVariant {
  id: string;
}

export interface ShopifyProductVariantConnection {
  nodes: ShopifyProductVariant[];
}

export interface ShopifyProductDetail extends ShopifyProduct {
  description: string;
  images: ShopifyProductImageConnection;
  /** First variant only — no variant selector exists yet, so this is
   * queried purely to obtain a merchandiseId for Add to Cart. */
  variants: ShopifyProductVariantConnection;
}

export interface ShopifyProductDetailResponse {
  /** Null when no product matches the given handle. */
  product: ShopifyProductDetail | null;
}

/**
 * Collection types. Only the fields
 * lib/shopify/queries/collections.ts actually queries.
 */

export type ShopifyCollectionImage = ShopifyImage;

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyCollectionImage | null;
}

export interface ShopifyCollectionConnection {
  nodes: ShopifyCollection[];
}

export interface ShopifyCollectionsResponse {
  collections: ShopifyCollectionConnection;
}

/**
 * Collection detail types. Extends ShopifyCollection (id/title/handle/
 * description/image) rather than redeclaring those fields — only the
 * products connection is net new. That connection reuses ShopifyProduct
 * as-is (same fields the featured-products query already requests), so
 * there's no second "collection product" type to keep in sync with it.
 */

export interface ShopifyCollectionProductConnection {
  nodes: ShopifyProduct[];
}

export interface ShopifyCollectionDetail extends ShopifyCollection {
  products: ShopifyCollectionProductConnection;
}

export interface ShopifyCollectionDetailResponse {
  /** Null when no collection matches the given handle. */
  collection: ShopifyCollectionDetail | null;
}

/**
 * Cart types. Deliberately minimal — no cart UI exists yet, so only the
 * fields the two mutations in lib/shopify/mutations/cart.ts actually
 * request are modeled. `merchandise` carries just `id` for now (enough to
 * identify what's in the cart); richer fields (title/image/price for a
 * cart line item) can be added once a cart UI phase actually needs them.
 */

export interface ShopifyCartCost {
  subtotalAmount: Money;
  totalAmount: Money;
}

export interface ShopifyCartMerchandise {
  id: string;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: ShopifyCartMerchandise;
}

export interface ShopifyCartLineConnection {
  nodes: ShopifyCartLine[];
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: ShopifyCartCost;
  lines: ShopifyCartLineConnection;
}

export interface ShopifyUserError {
  field: string[] | null;
  message: string;
}

/** Shared payload shape — cartCreate and cartLinesAdd both return
 * { cart, userErrors }, so both response types reuse this rather than
 * declaring two identical payload shapes. */
export interface ShopifyCartMutationPayload {
  cart: ShopifyCart | null;
  userErrors: ShopifyUserError[];
}

export interface ShopifyCartCreateResponse {
  cartCreate: ShopifyCartMutationPayload;
}

export interface ShopifyCartLinesAddResponse {
  cartLinesAdd: ShopifyCartMutationPayload;
}

/**
 * Cart read types (Phase 16). The mutation-side ShopifyCartMerchandise
 * (id only, above) is intentionally kept minimal for cartCreate/
 * cartLinesAdd, which don't need to render anything. Reading the cart
 * page needs more — product title, variant title, price, image — so
 * this is a richer merchandise shape, reused by extending ShopifyCart /
 * ShopifyCartLine rather than duplicating their id/quantity/checkoutUrl/
 * totalQuantity/cost fields.
 */

export interface ShopifyCartLineMerchandise {
  id: string;
  /** Variant title — often the literal string "Default Title" for
   * products with no real options; the mapper filters that out. */
  title: string;
  price: Money;
  image: ShopifyImage | null;
  product: {
    title: string;
    handle: string;
  };
}

export interface ShopifyCartLineDetail extends ShopifyCartLine {
  merchandise: ShopifyCartLineMerchandise;
}

export interface ShopifyCartLineDetailConnection {
  nodes: ShopifyCartLineDetail[];
}

export interface ShopifyCartDetail extends ShopifyCart {
  lines: ShopifyCartLineDetailConnection;
}

export interface ShopifyCartQueryResponse {
  /** Null when the cart ID doesn't resolve to an existing cart (expired,
   * already completed, or simply invalid). */
  cart: ShopifyCartDetail | null;
}

/**
 * Update/remove cart line types (Phase 17). Both mutations return the
 * richer ShopifyCartDetail (not the minimal ShopifyCart from the
 * create/add mutations), since the UI re-renders full line-item detail
 * after either action. One shared payload shape, reused by both response
 * types, same reasoning as ShopifyCartMutationPayload above.
 */
export interface ShopifyCartDetailMutationPayload {
  cart: ShopifyCartDetail | null;
  userErrors: ShopifyUserError[];
}

export interface ShopifyCartLinesUpdateResponse {
  cartLinesUpdate: ShopifyCartDetailMutationPayload;
}

export interface ShopifyCartLinesRemoveResponse {
  cartLinesRemove: ShopifyCartDetailMutationPayload;
}
