import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { ViewItemTracker } from "@/components/analytics/ViewItemTracker";
import { cn } from "@/utils/cn";
import { formatMoney } from "@/utils/formatMoney";
import { AddToBagForm } from "./AddToBagForm";
import type { ProductDetail } from "@/types/product";

export interface ProductDetailsProps {
  product: ProductDetail;
}

/**
 * ProductDetails — the Product Detail Page's content. Receives a fully
 * resolved ProductDetail as a prop; has no import of anything under
 * lib/shopify/ or types/shopify.ts, directly or indirectly. Stays a
 * Server Component itself — AddToBagForm and ViewItemTracker (Phase 24)
 * are the client boundaries. ViewItemTracker fires `view_item` using
 * data already present on `product` — no second Shopify request made
 * solely for analytics.
 */
export function ProductDetails({ product }: ProductDetailsProps) {
  const primaryImage = product.images[0] ?? null;
  const isOnSale = Boolean(product.compareAtPrice);

  return (
    <Container>
      <ViewItemTracker
        itemId={product.id}
        itemName={product.title}
        price={product.price.amount}
        currency={product.price.currencyCode}
      />
      <div className="grid grid-cols-1 gap-2xl py-3xl lg:grid-cols-2 lg:gap-3xl">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-background-secondary">
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-col gap-md">
          {product.badge && (
            <Badge variant={product.badge.toLowerCase() === "sale" ? "danger" : "default"}>
              {product.badge}
            </Badge>
          )}

          <div className="flex flex-col gap-xs">
            <span className="text-caption text-text-secondary">{product.category}</span>
            <h1 className="text-h1 font-semibold text-text-primary">{product.title}</h1>
          </div>

          <div className="flex items-center gap-xs">
            <span className={cn("text-h4", isOnSale ? "text-status-danger" : "text-text-primary")}>
              {formatMoney(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-body text-text-secondary line-through">
                {formatMoney(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="text-body text-text-secondary">{product.description}</p>

          <AddToBagForm
            merchandiseId={product.merchandiseId}
            analytics={{
              itemId: product.id,
              itemName: product.title,
              price: product.price.amount,
              currency: product.price.currencyCode,
            }}
          />
        </div>
      </div>
    </Container>
  );
}
