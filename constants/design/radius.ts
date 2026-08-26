/**
 * Border radius tokens, one per surface type.
 */

export const radius = {
  button: "14px",
  input: "14px",
  card: "18px",
  image: "18px",
} as const;

export type Radius = typeof radius;
