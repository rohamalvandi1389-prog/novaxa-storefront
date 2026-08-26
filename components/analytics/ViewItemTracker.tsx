"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics/events";

export interface ViewItemTrackerProps {
  itemId: string;
  itemName: string;
  price: string;
  currency: string;
}

/**
 * ViewItemTracker — renders nothing; fires `view_item` once per mount.
 * The `hasFired` ref (not just the dependency array) guards against
 * React 18/19 StrictMode's development-only double-invoke of effects
 * (mount → cleanup → mount again on the same fiber) actually sending the
 * event twice in dev.
 */
export function ViewItemTracker({ itemId, itemName, price, currency }: ViewItemTrackerProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    trackEvent("view_item", {
      item_id: itemId,
      item_name: itemName,
      price,
      currency,
    });
  }, [itemId, itemName, price, currency]);

  return null;
}
