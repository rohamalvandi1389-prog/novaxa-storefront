import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import {
  getAppleTouchIcon,
  getDefaultOgImage,
  getFaviconIcons,
  getShortcutIcon,
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo/site";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    template: "%s | NOVAXA",
    default: SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  icons: {
    icon: getFaviconIcons(),
    apple: getAppleTouchIcon(),
    shortcut: getShortcutIcon(),
  },
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
    images: getDefaultOgImage(),
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: getDefaultOgImage(),
  },
};

// Structural root layout only. No fonts or markup decisions beyond
// metadata are made here — those belong to the approved design phase.
//
// Organization + WebSite JSON-LD are rendered once, site-wide, since
// they describe the site itself rather than any one page. Both are
// built from real, already-established facts (lib/seo/structuredData.ts)
// — no address, phone, social profiles, or founders are included, since
// none of those exist anywhere in this project. The WebSite entry's
// SearchAction points at the real, working /search?q= route.
export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebSiteJsonLd();

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
