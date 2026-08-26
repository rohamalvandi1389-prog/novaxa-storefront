import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export type BadgeVariant = "default" | "success" | "danger" | "outline";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

/**
 * Each variant is built only from existing color tokens (including
 * Tailwind's opacity modifier on a token color, e.g. `bg-status-success/10`,
 * which still resolves to our `status.success` token — not a new color).
 */
const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-background-secondary text-text-primary border border-border-default",
  success: "bg-status-success/10 text-status-success border border-status-success/20",
  danger: "bg-status-danger/10 text-status-danger border border-status-danger/20",
  outline: "bg-transparent text-text-primary border border-border-default",
};

/**
 * Badge — small status/label chip. Uses `rounded-button` (14px) rather than
 * a new radius, since no dedicated "badge" radius exists in
 * constants/design/radius.ts and inventing one wasn't in scope.
 */
export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-xs rounded-button px-sm py-xs text-caption font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
