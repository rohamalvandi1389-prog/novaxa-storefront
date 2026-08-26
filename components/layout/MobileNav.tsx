"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { primaryNavItems } from "@/constants/navigation";
import { cn } from "@/utils/cn";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * MobileNav — hamburger trigger + drawer, visible below the `lg`
 * breakpoint. The panel is only mounted while open: this keeps its
 * contents out of the tab order for free when closed, at the cost of a
 * slide-in entrance transition (animating a node in from off-screen needs
 * either an `inert`-managed always-mounted panel or an animation library —
 * both out of scope here). Escape, overlay click, and focus return-on-close
 * are all handled explicitly below.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Close if the route changes underneath an open drawer.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Focus management + keyboard trap while open.
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

  // Return focus to the trigger once the drawer closes.
  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="sm"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen(true)}
        className="lg:hidden"
      >
        <MenuIcon className="h-5 w-5" aria-hidden="true" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            className="absolute inset-0 bg-text-primary/40"
            onClick={() => setIsOpen(false)}
          />

          <div
            id="mobile-nav-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-background-primary"
          >
            <div className="flex items-center justify-between border-b border-border-default px-container-mobile py-md">
              <span id={titleId} className="text-body font-medium text-text-primary">
                Menu
              </span>
              <Button variant="ghost" size="sm" aria-label="Close menu" onClick={() => setIsOpen(false)}>
                <CloseIcon className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>

            <nav aria-label="Primary" className="flex flex-col px-container-mobile py-md">
              {primaryNavItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "border-b border-border-default py-sm text-body",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
                      isActive ? "font-medium text-text-primary" : "text-text-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
