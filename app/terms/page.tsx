import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { PlaceholderNotice } from "@/components/shared/PlaceholderNotice";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions",
  description: "NOVAXA terms and conditions.",
  path: "/terms",
});

/**
 * /terms — same rule as /privacy: no final legal terms are invented.
 * Clearly marked pre-launch placeholder.
 */
export default function TermsPage() {
  return (
    <Section background="primary">
      <Container>
        <PageHeader title="Terms & Conditions" />

        <div className="mt-2xl max-w-2xl">
          <PlaceholderNotice message="This page is a placeholder. NOVAXA's final Terms & Conditions will be published here before launch." />
        </div>
      </Container>
    </Section>
  );
}
