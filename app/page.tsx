import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandValues } from "@/components/home/BrandValues";
import { Newsletter } from "@/components/home/Newsletter";
import { getFeaturedProducts } from "@/lib/shopify/products";
import { getFeaturedCollections } from "@/lib/shopify/collections";

// Homepage route. Hero, Featured Collections, Featured Products, Brand
// Values, and Newsletter are composed here so far — Footer is
// intentionally deferred to its own phase.
//
// This is the one file that bridges lib/shopify/ to the UI: it fetches
// (or falls back to constants — see lib/shopify/products.ts and
// lib/shopify/collections.ts) server-side, then hands each result to its
// section as a plain prop. No component imports lib/shopify/ or
// types/shopify.ts directly.
export default async function HomePage() {
  const [featuredProducts, featuredCollections] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedCollections(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedCollections collections={featuredCollections} />
      <FeaturedProducts products={featuredProducts} />
      <BrandValues />
      <Newsletter />
    </>
  );
}
