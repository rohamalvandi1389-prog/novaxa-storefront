"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics/events";

export interface ViewCartTrackerProps {
  value: string;
  currency: string;
  totalQuantity: number;
}

/**
 * ViewCartTracker — renders nothing; fires `view_cart` once per mount.
 * Same StrictMode double-invoke guard as ViewItemTracker. CartView only
 * renders this component inside its non-empty branch, so "fires only for
 * a non-empty cart" is enforced by the caller, not by this component
 * re-checking item count itself.
 */
export function ViewCartTracker({ value, currency, totalQuantity }: ViewCartTrackerProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    trackEvent("view_cart", {
      value,
      currency,
      quantity: totalQuantity,
    });
  }, [value, currency, totalQuantity]);

  return null;
}
