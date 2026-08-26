"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/events";

export interface CheckoutLinkProps {
  href: string;
  value: string;
  currency: string;
  totalQuantity: number;
  className?: string;
  children: ReactNode;
}

/**
 * CheckoutLink — a plain <a href> to Shopify's hosted checkout, exactly
 * as before, plus one onClick that fires `begin_checkout`. The click
 * handler doesn't call preventDefault or otherwise intercept navigation
 * — the browser still does its normal full-page navigation to
 * checkoutUrl; the tracking call is fire-and-forget alongside it. This
 * is the only reason the checkout link needed to become a small client
 * component — CartView (its caller) stays a Server Component.
 */
export function CheckoutLink({
  href,
  value,
  currency,
  totalQuantity,
  className,
  children,
}: CheckoutLinkProps) {
  function handleClick() {
    trackEvent("begin_checkout", {
      value,
      currency,
      quantity: totalQuantity,
    });
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
