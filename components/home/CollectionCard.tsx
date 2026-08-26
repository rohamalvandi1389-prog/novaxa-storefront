import Image from "next/image";
import { Button } from "@/components/ui/Button";

export interface CollectionCardProps {
  title: string;
  description: string;
  /** Public URL of the approved image, or null to render the placeholder. */
  imageSrc: string | null;
}

/**
 * CollectionCard — reusable card for a single collection. The image area
 * automatically shows the real photo once one exists (imageSrc is
 * resolved by the caller via lib/server/findPublicAsset) or a token-based
 * placeholder otherwise — the card itself doesn't care which.
 */
export function CollectionCard({ title, description, imageSrc }: CollectionCardProps) {
  return (
    <article className="flex flex-col gap-sm rounded-card border border-border-default bg-background-primary p-md shadow-soft">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-background-secondary">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-xs">
        <h3 className="text-h4 font-semibold text-text-primary">{title}</h3>
        <p className="text-body text-text-secondary">{description}</p>
      </div>

      <Button variant="outline" size="sm" className="self-start">
        Shop Collection
      </Button>
    </article>
  );
}
