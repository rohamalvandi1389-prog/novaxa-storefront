import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container — the single source of responsive max-width and horizontal
 * padding for page content. Both values come from the design tokens via
 * the Tailwind theme:
 *   - max-w-container      ← constants/design/container.ts (maxWidth: 1280px)
 *   - px-container-mobile  ← container.padding.mobile  (20px)
 *   - px-container-tablet  ← container.padding.tablet  (24px, from md:)
 *   - px-container-desktop ← container.padding.desktop (32px, from lg:)
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-container px-container-mobile md:px-container-tablet lg:px-container-desktop",
        className,
      )}
    >
      {children}
    </div>
  );
}
