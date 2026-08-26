import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export type SectionBackground = "primary" | "secondary";

export interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Background surface. Defaults to the primary background. */
  background?: SectionBackground;
}

const backgroundStyles: Record<SectionBackground, string> = {
  primary: "bg-background-primary",
  secondary: "bg-background-secondary",
};

/**
 * Section — the standard vertical rhythm wrapper for page sections.
 * Vertical spacing is fixed at `py-2xl` (64px, from constants/design/
 * spacing.ts) rather than exposed as a prop, so section spacing stays
 * consistent site-wide. Only the background surface is configurable,
 * and only between the two approved background tokens.
 */
export function Section({ children, className, background = "primary" }: SectionProps) {
  return (
    <section className={cn("py-2xl", backgroundStyles[background], className)}>
      {children}
    </section>
  );
}
