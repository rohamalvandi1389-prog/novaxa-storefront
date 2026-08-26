"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/product/ProductCard";
import { getWishlistIds } from "@/lib/wishlist/storage";
import { getWishlistProducts, type WishlistProduct } from "@/app/actions/wishlist";

type LoadStatus = "loading" | "loaded";

/**
 * WishlistPage — "use client" because localStorage only exists in the
 * browser; a Server Component can't read it. Never calls Shopify
 * directly — getWishlistProducts() (the Server Action) is the only
 * bridge, so this file has no import of lib/shopify/ or
 * types/shopify.ts.
 */
export function WishlistPage() {
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const ids = getWishlistIds();

      if (ids.length === 0) {
        if (isMounted) {
          setProducts([]);
          setStatus("loaded");
        }
        return;
      }

      const resolved = await getWishlistProducts(ids);

      if (isMounted) {
        setProducts(resolved);
        setStatus("loaded");
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Section background="primary">
      <Container>
        <h1 className="text-h1 font-semibold text-text-primary">Wishlist</h1>

        {status === "loading" ? (
          <p className="mt-2xl text-body text-text-secondary">Loading your wishlist…</p>
        ) : products.length === 0 ? (
          <p className="mt-2xl text-body text-text-secondary">
            You haven&apos;t saved any products yet.
          </p>
        ) : (
          <>
            <h2 className="sr-only">Saved products</h2>
            <div className="mt-2xl grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  productId={product.id}
                  title={product.title}
                  category={product.category}
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  badge={product.badge}
                  imageSrc={product.imageSrc}
                  imageAlt={product.image.altText}
                  href={`/products/${product.id}`}
                  onWishlistToggle={(saved) => {
                    // Every product on this page is, by definition, saved —
                    // so an unsave here removes it from view immediately,
                    // rather than leaving an unsaved card sitting in place.
                    if (!saved) {
                      setProducts((current) => current.filter((item) => item.id !== product.id));
                    }
                  }}
                />
              ))}
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
