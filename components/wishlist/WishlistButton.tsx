"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { HeartIcon } from "@/components/ui/icons";
import { addWishlistId, hasWishlistId, removeWishlistId } from "@/lib/wishlist/storage";

export interface WishlistButtonProps {
  productId: string;
  initialSaved?: boolean;
  /** Optional — used only to build a more descriptive aria-label
   * ("Add {title} to wishlist" vs a generic "Add to wishlist"). */
  title?: string;
  /** Optional — lets a consumer (e.g. WishlistPage) react when a product
   * is unsaved, without WishlistButton knowing anything about pages or
   * lists itself. */
  onToggle?: (saved: boolean) => void;
  className?: string;
}

/**
 * WishlistButton — the one client-side piece that actually reads/writes
 * lib/wishlist/storage.ts. Reuses the shared Button (variant="secondary",
 * size="sm") and HeartIcon exactly as ProductCard's previous inert
 * button did — only the icon fill (outline vs solid) changes with saved
 * state. A real <button>, not a link or a div — no Shopify import.
 */
export function WishlistButton({
  productId,
  initialSaved = false,
  title,
  onToggle,
  className,
}: WishlistButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);

  // The server can't read localStorage, so initialSaved is always false
  // on first render. Reconcile with the real value right after mount.
  useEffect(() => {
    setIsSaved(hasWishlistId(productId));
  }, [productId]);

  function handleClick() {
    const next = !isSaved;

    if (next) {
      addWishlistId(productId);
    } else {
      removeWishlistId(productId);
    }

    setIsSaved(next);
    onToggle?.(next);
  }

  const label = title
    ? isSaved
      ? `Remove ${title} from wishlist`
      : `Add ${title} to wishlist`
    : isSaved
      ? "Remove from wishlist"
      : "Add to wishlist";

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      aria-label={label}
      aria-pressed={isSaved}
      onClick={handleClick}
      className={className}
    >
      <HeartIcon
        className="h-4 w-4"
        aria-hidden="true"
        fill={isSaved ? "currentColor" : "none"}
      />
    </Button>
  );
}
