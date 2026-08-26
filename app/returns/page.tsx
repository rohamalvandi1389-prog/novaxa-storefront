import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { PlaceholderNotice } from "@/components/shared/PlaceholderNotice";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Returns",
  description: "NOVAXA returns policy.",
  path: "/returns",
});

/**
 * /returns — "30-Day Returns: not the right fit? Send it back within 30
 * days" is existing, already-approved copy with a real specific
 * (constants/brandValues.ts), so it's stated plainly rather than
 * hedged. The procedural details behind it (how to start a return,
 * refund timing, exclusions) don't exist anywhere in this project, so
 * those are honestly placeholdered rather than invented.
 */
export default function ReturnsPage() {
  return (
    <Section background="primary">
      <Container>
        <PageHeader title="Returns" />

        <div className="mt-2xl flex max-w-2xl flex-col gap-lg">
          <p className="text-body text-text-secondary">
            Not the right fit? Send it back within 30 days.
          </p>

          <PlaceholderNotice message="The full return process — how to start a return, refund timing, and any exclusions — is being finalized and will be published here before launch." />
        </div>
      </Container>
    </Section>
  );
}
