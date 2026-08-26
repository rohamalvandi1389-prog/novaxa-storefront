"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { addProductToCart, type AddProductToCartResult } from "@/app/actions/cart";
import { trackEvent } from "@/lib/analytics/events";

const initialState: AddProductToCartResult = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="primary" size="lg" loading={pending} className="self-start">
      Add to Bag
    </Button>
  );
}

/** Analytics-only metadata (Phase 24) — passed straight through from the
 * caller's already-fetched product data (ProductDetails already has all
 * of this via its `product` prop). No new Shopify request is made to
 * support this — the smallest safe prop extension, per that phase's
 * instruction. */
export interface AddToBagFormAnalytics {
  itemId: string;
  itemName: string;
  price: string;
  currency: string;
}

export interface AddToBagFormProps {
  merchandiseId: string;
  analytics?: AddToBagFormAnalytics;
}

/**
 * AddToBagForm — the only client-side piece of the product detail page.
 * Everything else in ProductDetails.tsx stays a Server Component; this
 * is the minimal boundary useActionState/useFormStatus require. Imports
 * the server action from app/actions/cart.ts, not lib/shopify/ or
 * types/shopify.ts directly.
 *
 * `add_to_cart` fires only after addProductToCart returns
 * success: true — never when merchandiseId was missing, the Shopify
 * mutation failed, or the action otherwise returned success: false.
 * Quantity is always 1 here since there's no quantity selector on this
 * form.
 */
export function AddToBagForm({ merchandiseId, analytics }: AddToBagFormProps) {
  const [state, formAction] = useActionState(async (): Promise<AddProductToCartResult> => {
    const result = await addProductToCart(merchandiseId);

    if (result.success && analytics) {
      trackEvent("add_to_cart", {
        item_id: analytics.itemId,
        item_name: analytics.itemName,
        price: analytics.price,
        currency: analytics.currency,
        quantity: 1,
      });
    }

    return result;
  }, initialState);

  return (
    <form action={formAction} className="flex flex-col items-start gap-sm">
      <SubmitButton />
      {state.error && <p className="text-caption text-status-danger">{state.error}</p>}
    </form>
  );
}
