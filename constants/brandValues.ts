export type BrandValueIconKey = "quality" | "shipping" | "payments" | "returns";

export interface BrandValueItem {
  icon: BrandValueIconKey;
  title: string;
  description: string;
}

export const brandValues: readonly BrandValueItem[] = [
  {
    icon: "quality",
    title: "Premium Quality",
    description: "Considered materials and construction, built to last.",
  },
  {
    icon: "shipping",
    title: "Fast Worldwide Shipping",
    description: "Reliable delivery, wherever you're ordering from.",
  },
  {
    icon: "payments",
    title: "Secure Payments",
    description: "Every checkout is encrypted and fully protected.",
  },
  {
    icon: "returns",
    title: "30-Day Returns",
    description: "Not the right fit? Send it back within 30 days.",
  },
];
