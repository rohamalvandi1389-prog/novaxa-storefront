import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "text-caption px-sm py-xs",
  md: "text-body px-md py-sm",
  lg: "text-body px-lg py-md",
};

/**
 * Input — the single reusable text input primitive. Sizes mirror Button's
 * scale (sm/md/lg using the same spacing tokens) so an input and a button
 * placed side by side line up.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-button border border-border-default bg-background-primary text-text-primary",
        "placeholder:text-text-secondary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        sizeStyles[size],
        className,
      )}
      {...rest}
    />
  );
});
