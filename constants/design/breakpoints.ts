/**
 * Breakpoints — standard Tailwind CSS breakpoint values, exposed for use
 * outside of Tailwind class names (e.g. matchMedia checks in hooks).
 * Tailwind's default `screens` config is left untouched in
 * tailwind.config.ts since it already matches these values; this file
 * exists so JS/TS code has a typed reference instead of hardcoding px
 * values.
 */

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/** Semantic aliases used in design conversations and specs. */
export const device = {
  mobile: breakpoints.sm,
  tablet: breakpoints.md,
  desktop: breakpoints.lg,
} as const;

export type Breakpoints = typeof breakpoints;
export type Device = typeof device;
