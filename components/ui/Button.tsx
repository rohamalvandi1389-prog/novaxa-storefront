import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 * Color/border pairs only — no hover color shades are defined here, since
 * the approved motion tokens only specify a hover *transform*
 * (scale(1.02)), not a hover color change. Adding one would mean inventing
 * a shade that isn't in constants/design/colors.ts.
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-blue text-background-primary border border-brand-blue",
  secondary: "bg-background-secondary text-text-primary border border-border-default",
  outline: "bg-transparent text-text-primary border border-border-default",
  ghost: "bg-transparent text-text-primary border border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-caption px-sm py-xs gap-xs",
  md: "text-body px-md py-sm gap-sm",
  lg: "text-body px-lg py-md gap-sm",
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
      />
    </svg>
  );
}

/**
 * Button — the single reusable button primitive for the project.
 *
 * Motion is limited to the approved animation tokens: a 200ms, ease-out
 * transform (`hover:scale-102`), nothing else. The loading spinner uses
 * Tailwind's built-in `animate-spin` utility, which is a functional
 * necessity for a loading affordance rather than a decorative hover
 * effect — flag this to design if a static loading state is preferred
 * instead.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    type = "button",
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        "inline-flex items-center justify-center rounded-button font-medium",
        "transition-transform duration-200 ease-hover",
        "hover:scale-102 active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100",
        fullWidth && "w-full",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Spinner className="h-4 w-4 shrink-0" />
      ) : (
        leftIcon && (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )
      )}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className="shrink-0" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
});
