"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CartIcon, CloseIcon } from "@/components/ui/icons";
import { formatMoney } from "@/utils/formatMoney";
import type { CartDrawerData } from "@/types/cartDrawer";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export interface CartDrawerProps {
  initialData: CartDrawerData;
}

/**
 * CartDrawer — trigger button + accessible slide-in panel, following the
 * exact same interaction pattern already established (and approved) by
 * MobileNav.tsx: panel only mounted while open (keeps its contents out
 * of the tab order for free when closed), Escape closes, overlay click
 * closes, focus moves into the panel on open and returns to the trigger
 * on close, Tab is trapped inside while open.
 *
 * Receives its data as a prop from Header (a Server Component) rather
 * than fetching itself — no import of lib/shopify/ or types/shopify.ts,
 * directly or indirectly. This is a foundation: the drawer shows
 * whatever was fetched when the page rendered, not a live subscription —
 * navigating or reloading picks up any changes made elsewhere (e.g. the
 * cart page).
 */
export function CartDrawer({ initialData }: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusable?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key === "Tab" && focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  const itemCountLabel =
    initialData.totalQuantity === 1 ? "1 item" : `${initialData.totalQuantity} items`;

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="sm"
        aria-label={`Open cart, ${itemCountLabel}`}
        aria-expanded={isOpen}
        aria-controls="cart-drawer-panel"
        onClick={() => setIsOpen(true)}
      >
        <CartIcon className="h-5 w-5" aria-hidden="true" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close cart"
            tabIndex={-1}
            className="absolute inset-0 bg-text-primary/40"
            onClick={() => setIsOpen(false)}
          />

          <div
            id="cart-drawer-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-background-primary"
          >
            <div className="flex items-center justify-between border-b border-border-default px-container-mobile py-md">
              <span id={titleId} className="text-body font-medium text-text-primary">
                Your Bag ({initialData.totalQuantity})
              </span>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Close cart"
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-container-mobile py-md">
              {initialData.items.length === 0 ? (
                <p className="text-body text-text-secondary">Your bag is empty.</p>
              ) : (
                <ul className="flex flex-col gap-md">
                  {initialData.items.map((item) => (
                    <li key={item.id} className="flex gap-sm">
                      <div className="relative h-3xl w-2xl shrink-0 overflow-hidden rounded-card border border-border-default bg-background-secondary">
                        {item.image && (
                          <Image
                            src={item.image.url}
                            alt={item.image.altText}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-xs">
                        <p className="text-caption font-medium text-text-primary">{item.title}</p>
                        <p className="text-caption text-text-secondary">{formatMoney(item.price)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-sm border-t border-border-default px-container-mobile py-md">
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="rounded-button border border-border-default px-md py-sm text-center text-body text-text-primary transition-colors duration-200 hover:bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                View Cart
              </Link>

              {initialData.checkoutUrl && (
                <a
                  href={initialData.checkoutUrl}
                  className="rounded-button bg-brand-blue px-md py-sm text-center text-body font-medium text-background-primary transition-transform duration-200 ease-hover hover:scale-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  Checkout
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
