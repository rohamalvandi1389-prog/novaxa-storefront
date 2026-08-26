import type { Money } from "@/types/money";

export interface FeaturedProductImage {
  /** No url here on purpose — the real URL is resolved at render time via
   * lib/server/findPublicAsset, same pattern as collections. */
  altText: string;
}

export interface FeaturedProduct {
  id: string;
  title: string;
  category: string;
  price: Money;
  compareAtPrice?: Money;
  image: FeaturedProductImage;
  badge?: string;
}

export const featuredProducts: readonly FeaturedProduct[] = [
  {
    id: "linen-shirt",
    title: "Linen Shirt",
    category: "Clothing",
    price: { amount: "88.00", currencyCode: "USD" },
    image: { altText: "Linen Shirt" },
  },
  {
    id: "tailored-trousers",
    title: "Tailored Trousers",
    category: "Clothing",
    price: { amount: "120.00", currencyCode: "USD" },
    compareAtPrice: { amount: "150.00", currencyCode: "USD" },
    badge: "Sale",
    image: { altText: "Tailored Trousers" },
  },
  {
    id: "leather-belt",
    title: "Leather Belt",
    category: "Accessories",
    price: { amount: "64.00", currencyCode: "USD" },
    image: { altText: "Leather Belt" },
  },
  {
    id: "wool-scarf",
    title: "Wool Scarf",
    category: "Accessories",
    price: { amount: "56.00", currencyCode: "USD" },
    badge: "New",
    image: { altText: "Wool Scarf" },
  },
];
