import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { BrandValues } from "@/components/home/BrandValues";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: "Accessories & gadgets for a better life.",
  path: "/about",
});

/**
 * /about — built only from language already established elsewhere in
 * this project (the Hero's brand statement, the tagline, Brand Values'
 * copy). No founders, dates, locations, awards, or statistics are
 * invented here, per this phase's explicit instruction — this page
 * describes philosophy and approach, not unverifiable company facts.
 * Reuses the existing <BrandValues /> section rather than re-describing
 * the same four points in different words. Links to /shop with
 * descriptive anchor text, per this phase's internal-linking objective.
 */
export default function AboutPage() {
  return (
    <>
      <Section background="primary">
        <Container>
          <PageHeader eyebrow="Live better. Look better." title="About NOVAXA" />

          <div className="mt-2xl flex flex-col gap-md">
            <p className="max-w-2xl text-body text-text-secondary">
              NOVAXA is a considered edit of accessories and gadgets for a better life. We
              design and select pieces with restraint rather than volume — fewer, better
              things, built to last rather than to be replaced.
            </p>
            <p className="max-w-2xl text-body text-text-secondary">
              Every product in the edit is held to the same standard, from material to
              delivery. That standard is the whole approach: premium materials, modern
              restraint, and a genuinely useful everyday object at the end of it.
            </p>
            <p className="max-w-2xl text-body text-text-secondary">
              <Link
                href="/shop"
                className="rounded-button text-brand-blue underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                Shop the current edit
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      <BrandValues />
    </>
  );
}
