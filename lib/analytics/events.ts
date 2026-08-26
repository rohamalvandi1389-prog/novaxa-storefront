declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * NEXT_PUBLIC_ is correct here (unlike SITE_URL in lib/seo/site.ts) — a
 * GA measurement ID is not a secret, and the client script loader
 * (components/analytics/Analytics.tsx) genuinely needs it in the
 * browser. Never invented — undefined unless the env var is actually set.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function isAnalyticsEnabled(): boolean {
  return Boolean(GA_MEASUREMENT_ID);
}

export type AnalyticsEventName = "view_item" | "add_to_cart" | "view_cart" | "begin_checkout";

/**
 * Deliberately small and flat. Every field here is non-identifying
 * catalog/order data — never a name, email, phone, address, cart ID,
 * Shopify GID, or checkout URL. Callers should not add fields beyond
 * this set without reconsidering the privacy constraints in this file's
 * governing phase.
 */
export interface AnalyticsEventParams {
  item_id?: string;
  item_name?: string;
  price?: string;
  currency?: string;
  quantity?: number;
  value?: string;
}

/**
 * trackEvent — the single function UI code calls to send an analytics
 * event. No-ops completely when analytics is disabled (no measurement ID
 * configured) or when called where `window`/`gtag` doesn't exist (SSR,
 * or the GA script hasn't loaded yet) — never throws either way.
 */
export function trackEvent(name: AnalyticsEventName, params?: AnalyticsEventParams): void {
  if (!isAnalyticsEnabled()) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", name, params);
}
