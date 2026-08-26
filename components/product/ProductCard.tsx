import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { cn } from "@/utils/cn";
import { formatMoney } from "@/utils/formatMoney";
import type { Money } from "@/types/money";

export interface ProductCardProps {
  /** The product's id/handle — passed straight to WishlistButton, and
   * also what `href` (below) is typically built from at the call site. */
  productId: string;
  title: string;
  category: string;
  price: Money;
  compareAtPrice?: Money;
  badge?: string;
  /** Public URL of the approved image, or null to render the placeholder.
   * Resolved by the caller (e.g. via lib/server/findPublicAsset) — this
   * component never hardcodes an image path. */
  imageSrc: string | null;
  imageAlt: string;
  /** Optional product detail link (e.g. `/products/<handle>`). When
   * provided, the image and title become real links — as siblings of the
   * Wishlist/Quick Add buttons, never wrapping them, since an <a> cannot
   * validly contain a <button>. Omit to render exactly as before
   * (FeaturedProducts, CollectionProducts — unchanged, no href passed). */
  href?: string;
  /** Optional — forwarded straight to WishlistButton's onToggle. Used by
   * WishlistPage to remove a card from its own list the moment it's
   * unsaved; every other caller omits this. */
  onWishlistToggle?: (saved: boolean) => void;
}

/**
 * ProductCard — the single reusable product card for listing contexts.
 * Quick Add is still UI only: no state, no handler, no Shopify, no
 * routing. Wishlist (Phase 21) is now real, via WishlistButton — a
 * client-only sub-component, so ProductCard itself stays a Server
 * Component; it never touches localStorage directly. `href` (Phase 20)
 * is the other opt-in exception: when provided, the image and title
 * navigate to the product detail route.
 */
export function ProductCard({
  productId,
  title,
  category,
  price,
  compareAtPrice,
  badge,
  imageSrc,
  imageAlt,
  href,
  onWishlistToggle,
}: ProductCardProps) {
  const isOnSale = Boolean(compareAtPrice);

  return (
    <article className="group flex flex-col gap-sm rounded-card border border-border-default bg-background-primary p-md shadow-soft transition-transform duration-200 ease-hover hover:-translate-y-1">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-background-secondary">
        {href ? (
          <Link
            href={href}
            aria-label={`View ${title}`}
            className="absolute inset-0 rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            )}
          </Link>
        ) : (
          imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          )
        )}

        {badge && (
          <span className="absolute left-sm top-sm">
            <Badge variant={badge.toLowerCase() === "sale" ? "danger" : "default"}>{badge}</Badge>
          </span>
        )}

        <WishlistButton
          productId={productId}
          title={title}
          onToggle={onWishlistToggle}
          className="absolute right-sm top-sm"
        />
      </div>

      <div className="flex flex-col gap-xs">
        <span className="text-caption text-text-secondary">{category}</span>
        <h3 className="text-h4 font-semibold text-text-primary line-clamp-2">
          {href ? (
            <Link
              href={href}
              className="rounded-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 hover:underline"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        <div className="flex items-center gap-xs">
          <span className={cn("text-body", isOnSale ? "text-status-danger" : "text-text-primary")}>
            {formatMoney(price)}
          </span>
          {compareAtPrice && (
            <span className="text-caption text-text-secondary line-through">
              {formatMoney(compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      <Button variant="secondary" size="sm">
        Quick Add
      </Button>
    </article>
  );
}
