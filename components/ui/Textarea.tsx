import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type TextareaSize = "sm" | "md" | "lg";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TextareaSize;
}

const sizeStyles: Record<TextareaSize, string> = {
  sm: "text-caption px-sm py-xs",
  md: "text-body px-md py-sm",
  lg: "text-body px-lg py-md",
};

/**
 * Textarea — the multi-line counterpart to Input. Same tokens, same
 * focus-visible treatment, same size scale — Input can't take multiple
 * lines (it's a native <input>), so this exists specifically for the
 * Contact form's message field rather than reaching for an unstyled
 * <textarea>.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { size = "md", className, rows = 5, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full resize-y rounded-button border border-border-default bg-background-primary text-text-primary",
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
