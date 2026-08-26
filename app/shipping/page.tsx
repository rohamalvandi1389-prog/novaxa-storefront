import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { PlaceholderNotice } from "@/components/shared/PlaceholderNotice";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Shipping",
  description: "NOVAXA shipping information.",
  path: "/shipping",
});

/**
 * /shipping — "Reliable delivery, wherever you're ordering from" is
 * existing, already-approved copy (constants/brandValues.ts), so it's
 * restated here rather than treated as unknown. But that line has no
 * specific rate, timeframe, or country list attached to it in this
 * project, so those specifics are honestly placeholdered rather than
 * invented — per this phase's explicit instruction.
 */
export default function ShippingPage() {
  return (
    <Section background="primary">
      <Container>
        <PageHeader title="Shipping" />

        <div className="mt-2xl flex max-w-2xl flex-col gap-lg">
          <p className="text-body text-text-secondary">
            NOVAXA ships worldwide — reliable delivery, wherever you&apos;re ordering from.
          </p>

          <PlaceholderNotice message="Specific shipping rates, delivery timeframes, and covered countries are being finalized and will be published here before launch." />
        </div>
      </Container>
    </Section>
  );
}
