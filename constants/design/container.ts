/**
 * Container tokens — max content width and horizontal padding per
 * breakpoint tier.
 */

export const container = {
  maxWidth: "1280px",
  padding: {
    mobile: "20px",
    tablet: "24px",
    desktop: "32px",
  },
} as const;

export type Container = typeof container;
