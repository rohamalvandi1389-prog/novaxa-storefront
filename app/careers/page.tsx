import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { PlaceholderNotice } from "@/components/shared/PlaceholderNotice";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers",
  description: "Careers at NOVAXA.",
  path: "/careers",
});

/**
 * /careers — no fabricated job openings. Uses the shared
 * PlaceholderNotice for a clear, honest "no current openings" state.
 */
export default function CareersPage() {
  return (
    <Section background="primary">
      <Container>
        <PageHeader
          eyebrow="Live better. Look better."
          title="Careers"
          description="Build the NOVAXA edit with us."
        />

        <div className="mt-2xl max-w-2xl">
          <PlaceholderNotice message="There are no open positions right now. Check back for future openings." />
        </div>
      </Container>
    </Section>
  );
}
