/**
 * Motion tokens. Kept deliberately minimal — one duration, one easing,
 * two named transforms — matching the approved "premium, minimal, modern,
 * clean" motion language.
 */

export const animation = {
  duration: {
    default: "200ms",
  },
  easing: {
    hover: "ease-out",
  },
  transform: {
    cardHover: "translateY(-4px)",
    buttonHover: "scale(1.02)",
  },
} as const;

export type Animation = typeof animation;
