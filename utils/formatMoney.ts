import type { Money } from "@/types/money";

export function formatMoney({ amount, currencyCode }: Money): string {
  const value = Number(amount);
  if (Number.isNaN(value)) return amount;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(value);
}
