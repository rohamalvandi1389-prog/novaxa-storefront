/**
 * Typography tokens. Font sizes are expressed as px strings so they map
 * 1:1 onto Tailwind's fontSize theme keys (text-h1, text-body, ...).
 */

export const fontFamily = {
  sans: ["Inter", "sans-serif"],
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const fontSize = {
  h1: "56px",
  h2: "40px",
  h3: "32px",
  h4: "24px",
  body: "16px",
  caption: "14px",
} as const;

export const typography = {
  fontFamily,
  fontWeight,
  fontSize,
} as const;

export type Typography = typeof typography;
