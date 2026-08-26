import type { Money } from "@/types/money";

export interface ProductDetailImage {
  url: string;
  altText: string;
}

/**
 * ProductDetail — the shape components/product/ProductDetails.tsx
 * consumes. Deliberately Shopify-unaware: nothing here references
 * Shopify's field names or types, so this type would look identical if
 * the data source were ever swapped. `merchandiseId` holds a Shopify
 * variant GID as a plain string — a value, not a Shopify type — needed
 * by the Add to Cart server action.
 */
export interface ProductDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  price: Money;
  compareAtPrice?: Money;
  badge?: string;
  images: ProductDetailImage[];
  merchandiseId: string;
}
