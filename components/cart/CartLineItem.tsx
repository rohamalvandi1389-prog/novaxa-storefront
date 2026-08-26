"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { removeCartItem, updateCartItem } from "@/app/actions/cart";
import { formatMoney } from "@/utils/formatMoney";
import type { CartLineItem as CartLineItemData } from "@/types/cart";

export interface CartLineItemProps {
  item: CartLineItemData;
}

/**
 * CartLineItem — the only client-side piece of the cart page. Everything
 * else in CartView.tsx stays a Server Component; this is the minimal
 * boundary useTransition (for pending state) requires. Imports the
 * server actions from app/actions/cart.ts, never lib/shopify/ or
 * types/shopify.ts directly.
 *
 * revalidatePath("/cart") inside the actions themselves is what refreshes
 * this component's parent with fresh server data after a mutation — this
 * component doesn't manage cart state locally beyond the pending flag and
 * an error message.
 */
export function CartLineItem({ item }: CartLineItemProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  function handleQuantityChange(nextQuantity: number) {
    setError(undefined);
    startTransition(async () => {
      const result =
        nextQuantity < 1
          ? await removeCartItem(item.id)
          : await updateCartItem(item.id, nextQuantity);

      if (!result.success) {
        setError(result.error);
      }
    });
  }

  function handleRemove() {
    setError(undefined);
    startTransition(async () => {
      const result = await removeCartItem(item.id);
      if (!result.success) {
        setError(result.error);
      }
    });
  }

  return (
    <li className="flex gap-md border-b border-border-default pb-lg">
      <div className="relative h-4xl w-3xl shrink-0 overflow-hidden rounded-card border border-border-default bg-background-secondary">
        {item.image && (
          <Image
            src={item.image.url}
            alt={item.image.altText}
            fill
            sizes="96px"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-xs">
        <p className="text-body font-semibold text-text-primary">{item.title}</p>
        {item.variantTitle && <p className="text-caption text-text-secondary">{item.variantTitle}</p>}

        <div className="flex flex-wrap items-center gap-md">
          <div className="flex items-center gap-xs">
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-label="Decrease quantity"
              disabled={isPending}
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              −
            </Button>
            <span className="min-w-md text-center text-body text-text-primary" aria-live="polite">
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-label="Increase quantity"
              disabled={isPending}
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </Button>
          </div>

          <Button type="button" variant="ghost" size="sm" disabled={isPending} onClick={handleRemove}>
            Remove
          </Button>
        </div>

        <p className="text-body text-text-primary">{formatMoney(item.price)}</p>

        {error && <p className="text-caption text-status-danger">{error}</p>}
      </div>
    </li>
  );
}
