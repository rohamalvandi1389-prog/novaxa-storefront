import Image from "next/image";
import { findPublicAsset } from "@/lib/server/findPublicAsset";

/** Checked in order — first match wins. Drop the approved asset in
 * /public/images using one of these filenames and it activates
 * automatically, no component changes required. */
const HERO_IMAGE_FILENAMES = ["hero.jpg", "hero.jpeg", "hero.png", "hero.webp"];

/**
 * HeroVisual — the single place that decides between the approved hero
 * image and the temporary placeholder block. Hero always renders
 * <HeroVisual /> and never knows which branch is active, so the Hero
 * never permanently depends on placeholder content.
 *
 * aspect-[2/1] is unchanged — it matches hero.png's real dimensions
 * exactly (1774×887), so object-cover was never actually cropping
 * anything and still isn't. This now renders at the full section width
 * at every breakpoint (Hero.tsx's composition is a single vertical
 * flow, not a column split), so `sizes` is 100vw throughout — no
 * rounding, no border, no card treatment, so it reads as a continuation
 * of the section rather than a boxed element inside it.
 */
export function HeroVisual() {
  const src = findPublicAsset("images", HERO_IMAGE_FILENAMES);

  if (src) {
    return (
      <div className="relative aspect-[2/1] w-full overflow-hidden">
        <Image src={src} alt="NOVAXA featured piece" fill priority sizes="100vw" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="aspect-[2/1] w-full border border-border-default bg-background-secondary"
    />
  );
}
