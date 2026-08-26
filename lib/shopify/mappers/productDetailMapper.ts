import type { ProductDetail } from "@/types/product";
import type { ShopifyProductDetail } from "@/types/shopify";

function hasTag(tags: string[], tag: string): boolean {
  return tags.some((productTag) => productTag.toLowerCase() === tag.toLowerCase());
}

/**
 * mapShopifyProductToProductDetail — converts a Shopify Storefront API
 * product detail response into ProductDetail (types/product.ts).
 * ProductDetails.tsx and the product route stay unaware Shopify exists.
 *
 * Mapping notes:
 * - `id` uses the product handle, matching the same convention as
 *   productMapper.ts (Featured Products) and collectionMapper.ts.
 * - `compareAtPrice`/`badge: "Sale"` only appear when compareAtPriceRange
 *   is genuinely higher than priceRange — same reasoning as
 *   productMapper.ts (Shopify returns "0.0" there when nothing's
 *   discounted, not null).
 * - `images` falls back to `featuredImage` when the `images` connection
 *   is empty (some products only have a featured image set), and is an
 *   empty array — never thrown as an error — when there's no image at
 *   all; ProductDetails.tsx renders a placeholder in that case.
 * - `merchandiseId` is the first variant's id. Shopify creates at least
 *   one variant for every published product (the default "Title" variant
 *   when no options are set), so an empty variants list shouldn't occur
 *   in practice; if it somehow did, this falls back to an empty string,
 *   which the Add to Cart server action treats as invalid input.
 */
export function mapShopifyProductToProductDetail(product: ShopifyProductDetail): ProductDetail {
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange.minVariantPrice;
  const isOnSale = Number(compareAtPrice.amount) > Number(price.amount);

  const images: ProductDetail["images"] =
    product.images.nodes.length > 0
      ? product.images.nodes.map((image) => ({
          url: image.url,
          altText: image.altText ?? product.title,
        }))
      : product.featuredImage
        ? [{ url: product.featuredImage.url, altText: product.featuredImage.altText ?? product.title }]
        : [];

  return {
    id: product.handle,
    title: product.title,
    category: product.productType,
    description: product.description,
    price,
    compareAtPrice: isOnSale ? compareAtPrice : undefined,
    badge: isOnSale ? "Sale" : hasTag(product.tags, "new") ? "New" : undefined,
    images,
    merchandiseId: product.variants.nodes[0]?.id ?? "",
  };
}
