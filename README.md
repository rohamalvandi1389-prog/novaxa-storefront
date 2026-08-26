# NOVAXA

Production e-commerce web application.

## Project overview

NOVAXA is built with Next.js App Router and TypeScript in strict mode. This
repository is currently in its **foundation phase** — tooling, folder
structure, and conventions are in place, but no UI, pages, or components
have been built yet. Branding, layout, and UX have been approved separately
and will be implemented phase by phase on top of this foundation.

**Stack**

- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- ESLint (flat config: `next/core-web-vitals` + `next/typescript`)
- Prettier (with `prettier-plugin-tailwindcss`)

## Architecture

**Decision: Headless Shopify.**

| Layer | Owner |
| --- | --- |
| Frontend (routing, rendering, UI) | Next.js 15, this repository |
| Product data, collections, cart, checkout | Shopify Storefront API |
| Checkout flow | Shopify (hosted checkout) |
| Store management (inventory, orders, fulfillment) | Shopify Admin |
| Domain | `novaxastore.store` → points to the Next.js frontend |

Shopify is the commerce backend only — it is used exclusively for products,
collections, cart, checkout, and store management via the Storefront API.
**The Shopify theme is not the primary frontend and is not rendered to
customers.** Every customer-facing page is served by this Next.js
application; Shopify is reached only through API calls (see `lib/shopify/`,
reserved for that integration).

This decision is locked. Any change to it should be treated as a new
architectural decision, not an incidental code change.

### Shopify integration

All Shopify Storefront API code is isolated to `lib/shopify/` — no file
outside that folder imports from it directly today, and no file outside it
should import Shopify-specific code in the future either.

- **`lib/shopify/client.ts`** — resolves Storefront API config
  (`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`) from
  environment variables and builds the GraphQL endpoint URL. Server-only.
- **`lib/shopify/graphql.ts`** — `shopifyRequest()`, the single reusable
  function that sends a GraphQL query/variables pair to that endpoint and
  returns typed, error-checked data. Server-only.
- **`types/shopify.ts`** — the GraphQL request/response envelope types
  (not Shopify domain objects like Product/Collection — those are added
  once a phase actually fetches them).

This is foundation only: nothing in the app calls `shopifyRequest()` yet,
and all homepage sections still render the temporary data in `constants/`.

### Analytics

Analytics (Google Analytics 4, via `gtag.js`) is entirely optional and
disabled by default. It only activates when `NEXT_PUBLIC_GA_MEASUREMENT_ID`
is set — with it blank, no script is ever loaded and nothing is tracked.

- **`components/analytics/Analytics.tsx`** — the only place that knows GA4
  exists; renders nothing when the measurement ID is unset.
- **`lib/analytics/events.ts`** — `trackEvent(name, params)`, a small
  no-op-when-disabled helper. Only a fixed, non-identifying parameter set
  is ever sent (item id/name, price, currency, quantity, value) — never
  names, emails, addresses, cart IDs, Shopify GIDs, or checkout URLs.
- Four events are implemented: `view_item` (product page), `add_to_cart`
  (only after a successful add), `view_cart` (only for a non-empty cart),
  `begin_checkout` (only on an actual click of the checkout link).

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The App Router root only contains the mandatory `layout.tsx` at this stage —
no route (`page.tsx`) exists yet, so the dev server will not render a
homepage until that phase is approved and built.

## Scripts

| Command                | Purpose                                  |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Start the Next.js dev server              |
| `npm run build`         | Production build                          |
| `npm run start`         | Start the production server               |
| `npm run lint`          | Run ESLint                                |
| `npm run typecheck`     | Run `tsc --noEmit`                        |
| `npm run format`        | Format the codebase with Prettier         |
| `npm run format:check`  | Check formatting without writing changes  |

## Folder structure

```
app/                  App Router routes, layouts, route handlers
components/
  ui/                 Low-level, generic building blocks (buttons, inputs, etc.)
  layout/             Structural components (header, footer, nav, shells)
  home/                Homepage-specific components
  product/             Product listing/detail components
  cart/                Cart and checkout-adjacent components
  forms/               Form components and form building blocks
  shared/              Composed components reused across multiple domains
constants/            App-level constants and static configuration values
  design/              Design tokens (colors, typography, spacing, etc.)
hooks/                 Reusable React hooks
lib/                   Framework-agnostic utilities, API/service clients
  shopify/             Shopify Storefront API client and queries
  api/                  Internal route handlers / API layer
  server/               Server-only utilities (not exposed to the client)
styles/                Global CSS
types/                 Shared TypeScript types/interfaces
utils/                 Pure helper functions
public/                Static assets
  images/, icons/, logo/, favicon/
```

Each `components/` subfolder is scoped by responsibility, not by page — a
component only lives in `home/`, `product/`, etc. if it's specific to that
domain. Anything reused across domains belongs in `shared/` or `ui/`.

## Path aliases

`@/*` resolves to the project root (configured in `tsconfig.json`), e.g.
`@/components/ui/Button`, `@/lib/api`, `@/constants/routes`.

## Environment variables

See `.env.example`.

| Variable | Required | Notes |
| --- | --- | --- |
| `SHOPIFY_STORE_DOMAIN` | Yes | `<store>.myshopify.com` — no `NEXT_PUBLIC_` prefix, server-only |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Yes | Storefront API access token — server-only |
| `SITE_URL` | No | Canonical site URL for metadata/Open Graph/sitemap/robots (`lib/seo/site.ts`); falls back to `https://novaxastore.store` if unset |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 measurement ID. Analytics is fully optional — leaving this blank disables it completely (no script loaded, nothing tracked). Never commit a real ID here or to `.env.example` |

The two Shopify variables intentionally have no `NEXT_PUBLIC_` prefix, so
Next.js never inlines them into a client bundle — see **Shopify
integration** below.

## Coding standards

- **TypeScript strict mode is non-negotiable.** No `any` without explicit
  justification; prefer precise types over broad ones.
- **No hardcoded data in components.** Product, pricing, and content data is
  always passed in as props or fetched — never inlined.
- **Components are reusable by default.** A component should not assume a
  single call site unless it's explicitly page-specific (and even then, it
  belongs in the matching `components/<domain>/` folder, not inline in the
  route file).
- **One component per file**, file name matches the component name
  (`ProductCard.tsx` exports `ProductCard`).
- **No new dependencies without justification.** Every package in
  `package.json` should map to a concrete, current requirement.
- **Formatting and linting are enforced, not optional.** Run
  `npm run lint` and `npm run format:check` before considering work done;
  both are expected to pass cleanly.
- **No design decisions made in code that weren't explicitly approved.**
  Colors, spacing, and typography are implemented as specified, not
  improvised.
