import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ViewCartTracker } from "@/components/analytics/ViewCartTracker";
import { CheckoutLink } from "@/components/analytics/CheckoutLink";
import { formatMoney } from "@/utils/formatMoney";
import { CartLineItem } from "./CartLineItem";
import type { CartPageData } from "@/types/cart";

export interface CartViewProps {
  cart: CartPageData;
}

/**
 * CartView — the Cart Page's content. Receives a fully resolved
 * CartPageData as a prop; has no import of anything under lib/shopify/
 * or types/shopify.ts, directly or indirectly. Stays a Server Component
 * itself — CartLineItem, ViewCartTracker, and CheckoutLink (Phase 24)
 * are the client boundaries.
 *
 * "Continue shopping" stays a plain anchor rather than the shared Button
 * — it's an internal navigation, not a button action, and Button only
 * renders a native <button> with no href support. Checkout is now
 * CheckoutLink (components/analytics/), which renders the same anchor
 * with the same classes as before, plus an onClick that fires
 * `begin_checkout` — the navigation itself is unchanged. Checkout's
 * classes intentionally mirror Button's primary/lg visual treatment
 * using the same tokens (rounded-button, bg-brand-blue, the same
 * hover/focus treatment) so it reads as the same design language — a
 * polymorphic Button (accepting href/as) would remove this duplication,
 * but that's a Button change, out of scope here.
 */
export function CartView({ cart }: CartViewProps) {
  const isEmpty = cart.items.length === 0;

  return (
    <Section background="primary">
      <Container>
        <h1 className="text-h1 font-semibold text-text-primary">Your Bag</h1>

        {!isEmpty && (
          <ViewCartTracker
            value={cart.subtotal.amount}
            currency={cart.subtotal.currencyCode}
            totalQuantity={cart.totalQuantity}
          />
        )}

        {isEmpty ? (
          <div className="mt-2xl flex flex-col items-start gap-md">
            <p className="text-body text-text-secondary">Your bag is empty.</p>
            <Link
              href="/"
              className="rounded-button text-body text-brand-blue underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-2xl flex flex-col gap-lg">
              {cart.items.map((item) => (
                <CartLineItem key={item.id} item={item} />
              ))}
            </ul>

            <div className="mt-lg flex items-center justify-between border-t border-border-default pt-md">
              <span className="text-body font-semibold text-text-primary">Subtotal</span>
              <span className="text-h4 font-semibold text-text-primary">
                {formatMoney(cart.subtotal)}
              </span>
            </div>

            {cart.checkoutUrl && (
              <CheckoutLink
                href={cart.checkoutUrl}
                value={cart.subtotal.amount}
                currency={cart.subtotal.currencyCode}
                totalQuantity={cart.totalQuantity}
                className="mt-lg inline-flex items-center justify-center self-start rounded-button bg-brand-blue px-lg py-md text-body font-medium text-background-primary transition-transform duration-200 ease-hover hover:scale-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                Checkout
              </CheckoutLink>
            )}
          </>
        )}
      </Container>
    </Section>
  );
}
