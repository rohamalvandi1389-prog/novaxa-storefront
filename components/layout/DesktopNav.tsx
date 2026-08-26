"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavItems } from "@/constants/navigation";
import { cn } from "@/utils/cn";

/**
 * DesktopNav — visible from the `lg` breakpoint up (constants/design's
 * "desktop" tier). Active state is derived from the current pathname,
 * matched exactly against each item's href.
 */
export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-lg lg:flex">
      {primaryNavItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-button text-body transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
              isActive
                ? "font-medium text-text-primary"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
