/**
 * Mirrors Shopify's MoneyV2 shape (amount as a string, plus currency
 * code). Used anywhere a price is represented, now and once the real
 * Storefront API is connected.
 */
export interface Money {
  amount: string;
  currencyCode: string;
}
