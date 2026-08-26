/**
 * Minimal className combinator — no dependency on clsx/tailwind-merge.
 * Filters out falsy values and joins the rest with a single space.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
