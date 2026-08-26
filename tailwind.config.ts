import type { Config } from "tailwindcss";
import {
  animation,
  colors,
  container,
  radius,
  shadows,
  spacing,
  typography,
} from "./constants/design";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // Tailwind's default `screens` (sm/md/lg/xl/2xl) are left as-is — they
    // already match constants/design/breakpoints.ts, so there is nothing
    // to override here.
    extend: {
      colors: {
        background: colors.background,
        text: colors.text,
        border: colors.border,
        brand: colors.brand,
        status: colors.status,
      },
      fontFamily: {
        sans: [...typography.fontFamily.sans],
      },
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      spacing,
      borderRadius: radius,
      boxShadow: shadows,
      maxWidth: {
        container: container.maxWidth,
      },
      // Horizontal container padding per tier — used as
      // `px-container-mobile md:px-container-tablet lg:px-container-desktop`.
      padding: {
        "container-mobile": container.padding.mobile,
        "container-tablet": container.padding.tablet,
        "container-desktop": container.padding.desktop,
      },
      transitionDuration: {
        DEFAULT: animation.duration.default,
        "200": animation.duration.default,
      },
      transitionTimingFunction: {
        hover: animation.easing.hover,
      },
      // Card hover (-4px) maps onto Tailwind's default translate scale:
      // step "1" = 0.25rem = 4px, so `-translate-y-1` already equals
      // animation.transform.cardHover with no override needed.
      scale: {
        "102": "1.02", // buttonHover: scale(1.02)
      },
    },
  },
  plugins: [],
};

export default config;
