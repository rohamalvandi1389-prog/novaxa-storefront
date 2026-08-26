/**
 * Design Foundation — single entry point for every design token.
 * Import from "@/constants/design" rather than reaching into individual
 * token files, unless you specifically need a single token's type.
 */

import { animation } from "./animation";
import { breakpoints, device } from "./breakpoints";
import { colors } from "./colors";
import { container } from "./container";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { spacing } from "./spacing";
import { typography } from "./typography";

export * from "./animation";
export * from "./breakpoints";
export * from "./colors";
export * from "./container";
export * from "./radius";
export * from "./shadows";
export * from "./spacing";
export * from "./typography";

export const designTokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
  device,
  container,
  animation,
} as const;

export type DesignTokens = typeof designTokens;
