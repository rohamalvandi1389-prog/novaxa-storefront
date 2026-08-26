import type { Metadata } from "next";
import { SearchResults } from "@/components/search/SearchResults";
import { searchProducts } from "@/lib/shopify/search";
import { mapShopifyProductsToSearchResult } from "@/lib/shopify/mappers/searchMapper";
import type { SearchResult } from "@/types/search";

interface SearchPageProps {
  // Next.js 15: searchParams, like params, is async.
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q?.trim() ? `Search results for "${q.trim()}"` : "Search" };
}

const EMPTY_RESULT: SearchResult = { products: [] };

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  if (!query) {
    return <SearchResults query="" result={EMPTY_RESULT} />;
  }

  const shopifyProducts = await searchProducts(query);
  const result = mapShopifyProductsToSearchResult(shopifyProducts);

  return <SearchResults query={query} result={result} />;
}
