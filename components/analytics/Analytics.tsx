"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics/events";

/**
 * Analytics — the only place that knows GA4/gtag.js exists. When
 * NEXT_PUBLIC_GA_MEASUREMENT_ID isn't set, this renders nothing at all —
 * no script tag is emitted, so no request to googletagmanager.com is
 * ever made and no tracking cookie is ever set. The rest of the app
 * (trackEvent, and everything that calls it) doesn't need to know
 * whether GA is actually loaded — trackEvent already no-ops safely on
 * its own when window.gtag isn't present.
 */
export function Analytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          window.gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
