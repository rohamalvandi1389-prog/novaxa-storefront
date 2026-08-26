export interface CollectionItem {
  title: string;
  /** Used for routing later and to match collection image filenames. */
  slug: string;
  description: string;
}

export const featuredCollections: readonly CollectionItem[] = [
  {
    title: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest pieces, just landed.",
  },
  {
    title: "Clothing",
    slug: "clothing",
    description: "Considered essentials for everyday wear.",
  },
  {
    title: "Accessories",
    slug: "accessories",
    description: "Finishing details, made to last.",
  },
  {
    title: "Sale",
    slug: "sale",
    description: "Past-season favorites, now reduced.",
  },
];
