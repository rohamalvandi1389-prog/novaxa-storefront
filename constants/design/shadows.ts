/**
 * Shadow tokens. Intentionally a single soft shadow — no heavy shadows,
 * no glow effects, per the approved design language.
 */

export const shadows = {
  soft: "0 4px 16px rgba(17, 24, 39, 0.06)",
} as const;

export type Shadows = typeof shadows;
