/**
 * Color tokens — the single source of truth for every color used in the
 * product. Do not reference raw hex values anywhere else in the codebase;
 * import from here (or from the Tailwind theme, which is generated from
 * this file — see tailwind.config.ts).
 */

export const colors = {
  background: {
    primary: "#FFFFFF",
    secondary: "#F7F7F5",
  },
  text: {
    primary: "#111827",
    secondary: "#6B7280",
  },
  border: {
    default: "#E5E7EB",
  },
  brand: {
    blue: "#2563EB",
  },
  status: {
    success: "#16A34A",
    danger: "#DC2626",
  },
} as const;

export type Colors = typeof colors;
