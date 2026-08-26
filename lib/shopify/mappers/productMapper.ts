import type { FeaturedProduct } from "@/constants/featuredProducts";
import type { ShopifyProduct } from "@/types/shopify";

function hasTag(tags: string[], tag: string): boolean {
  return tags.some((productTag) => productTag.toLowerCase() === tag.toLowerCase());
}

/**
 * mapShopifyProductToFeaturedProduct — converts a Shopify Storefront API
 * product into exactly the shape ProductCard already consumes
 * (constants/featuredProducts.ts's FeaturedProduct). This is the one
 * place that translates Shopify's schema into the frontend's — ProductCard
 * and FeaturedProducts.tsx stay completely unaware Shopify exists.
 *
 * Mapping notes:
 * - `id` uses the product handle (a slug like "linen-shirt"), not
 *   Shopify's GID, since the existing FeaturedProduct.id doubles as the
 *   local image-filename base in FeaturedProducts.tsx.
 * - `compareAtPrice` is only included when it's genuinely higher than the
 *   price — Shopify returns compareAtPriceRange even when nothing is
 *   discounted (amount "0.0" in that case).
 * - `badge` is derived, not a native Shopify field: "Sale" when the
 *   product is discounted, else "New" when tagged "new", else omitted.
 * - `image` only carries `altText` — the existing FeaturedProduct shape
 *   has no `url` field (local images are resolved separately via
 *   lib/server/findPublicAsset), so Shopify's featuredImage.url is not
 *   carried through by this mapper. Revisit when FeaturedProducts.tsx
 *   actually switches its data source to Shopify.
 */
export function mapShopifyProductToFeaturedProduct(product: ShopifyProduct): FeaturedProduct {
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange.minVariantPrice;
  const isOnSale = Number(compareAtPrice.amount) > Number(price.amount);

  return {
    id: product.handle,
    title: product.title,
    category: product.productType,
    price,
    compareAtPrice: isOnSale ? compareAtPrice : undefined,
    image: {
      altText: product.featuredImage?.altText ?? product.title,
    },
    badge: isOnSale ? "Sale" : hasTag(product.tags, "new") ? "New" : undefined,
  };
}
