import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { findPublicAsset } from "@/lib/server/findPublicAsset";
import type { CollectionItem } from "@/constants/collections";
import { CollectionCard } from "./CollectionCard";

const COLLECTIONS_IMAGE_DIR = "images/collections";

function collectionImageFilenames(slug: string): string[] {
  return [`${slug}.jpg`, `${slug}.jpeg`, `${slug}.png`, `${slug}.webp`];
}

export interface FeaturedCollectionsProps {
  /** Already-resolved collection list — Shopify or fallback, this
   * component doesn't know or care which. Provided by the caller
   * (app/page.tsx), which is the only place allowed to reach into
   * lib/shopify/. */
  collections: CollectionItem[];
}

/**
 * FeaturedCollections — homepage section listing the given collections.
 * Purely presentational: receives data as a prop and has no import of
 * anything under lib/shopify/ or types/shopify.ts, directly or
 * indirectly. Rendered on a secondary (tinted) background so the white
 * cards read as elevated content, alternating with the Hero's primary
 * background above it.
 */
export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  return (
    <Section background="secondary">
      <Container>
        <div className="flex flex-col gap-sm">
          <h2 className="text-h2 font-semibold text-text-primary">Shop by Collection</h2>
          <p className="max-w-2xl text-body text-text-secondary">
            Explore the edit, organized around how you actually shop.
          </p>
        </div>

        <div className="mt-2xl grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.slug}
              title={collection.title}
              description={collection.description}
              imageSrc={findPublicAsset(COLLECTIONS_IMAGE_DIR, collectionImageFilenames(collection.slug))}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
