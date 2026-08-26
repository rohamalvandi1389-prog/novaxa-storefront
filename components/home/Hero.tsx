import { Button } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

/**
 * Hero — the homepage's opening section.
 *
 * Composition (third pass — refinement, not restructure): the centered,
 * single-flow layout from the previous pass is unchanged — no divider,
 * no column split, image still full-bleed at 100% width directly below
 * the text. This pass only tightens spacing and strengthens the
 * headline:
 *
 * - Vertical padding above/below the text block was symmetric and large
 *   (py-3xl/py-4xl, 96–128px both sides). Split into asymmetric
 *   pt/pb so the block sits closer to the header above it and closer to
 *   the image below it, without losing the premium, unhurried feel —
 *   still real whitespace, just not so much that the page reads as
 *   unfinished before any product is visible.
 * - The headline is now bold (was semibold) and scales up at larger
 *   viewports beyond the shared text-h1 token (lg:text-[64px]
 *   xl:text-[72px]) — a deliberate, one-off override for this specific
 *   brand statement, not a change to the shared typography scale in
 *   constants/design/typography.ts.
 * - Eyebrow and headline now share a tighter gap than the rest of the
 *   block, so they read as one attached unit ("Live better. Look
 *   better." sitting right against the statement it's introducing)
 *   before the more generous gap down to the supporting line and CTAs.
 */
export function Hero() {
  return (
    <section className="border-b border-border-default bg-background-primary">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-lg px-container-mobile pb-lg pt-xl text-center md:px-container-tablet lg:px-container-desktop lg:pb-xl lg:pt-2xl">
        <div className="flex flex-col items-center gap-xs">
          <span className="text-caption font-medium uppercase tracking-widest text-brand-blue">
            Live better. Look better.
          </span>

          <h1 className="text-h1 font-bold leading-[1.02] tracking-tight text-text-primary lg:text-[64px] xl:text-[72px]">
            Accessories &amp; gadgets for a better life.
          </h1>
        </div>

        <p className="max-w-md text-body text-text-secondary">
          Considered technology accessories, designed with restraint and built to
          last — fewer, better things for the way you actually live.
        </p>

        <div className="flex flex-wrap justify-center gap-sm">
          <Button variant="primary" size="lg">
            Shop Now
          </Button>
          <Button variant="outline" size="lg">
            Explore Collection
          </Button>
        </div>
      </div>

      <HeroVisual />
    </section>
  );
}
