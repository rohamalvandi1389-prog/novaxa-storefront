import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { PlaceholderNotice } from "@/components/shared/PlaceholderNotice";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "NOVAXA privacy policy.",
  path: "/privacy",
});

/**
 * /privacy — no legal language is invented and presented as a finalized
 * policy. This project contains no authoritative privacy policy, so
 * this is a clearly marked pre-launch placeholder with the correct page
 * structure, per this phase's explicit instruction.
 */
export default function PrivacyPage() {
  return (
    <Section background="primary">
      <Container>
        <PageHeader title="Privacy Policy" />

        <div className="mt-2xl max-w-2xl">
          <PlaceholderNotice message="This page is a placeholder. NOVAXA's final Privacy Policy will be published here before launch." />
        </div>
      </Container>
    </Section>
  );
}
