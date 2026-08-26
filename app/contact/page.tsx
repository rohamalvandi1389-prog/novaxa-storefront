import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: "Get in touch with NOVAXA.",
  path: "/contact",
});

/**
 * /contact — no email address, phone number, physical address, or
 * social handle is stated anywhere on this page, since none exists yet
 * as an authoritative destination. ContactForm has real validation and
 * accessible labels, but is honest that it isn't wired to a live inbox.
 */
export default function ContactPage() {
  return (
    <Section background="primary">
      <Container>
        <PageHeader
          title="Contact"
          description="Questions about an order, a product, or anything else — send us a message."
        />

        <div className="mt-2xl">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
