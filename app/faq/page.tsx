import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { PageHeader } from "@/components/shared/PageHeader";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ",
  description: "Frequently asked questions about NOVAXA.",
  path: "/faq",
});

const linkClassName =
  "rounded-button text-brand-blue underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2";

/**
 * /faq — every answer here is either restated from copy already
 * established elsewhere in this project (Hero, Brand Values) or, where
 * no authoritative answer exists yet, explicitly labeled "Coming soon"
 * rather than guessed at. No factual policy is invented. Shipping and
 * returns answers link to their full pages with descriptive anchor
 * text, per this phase's internal-linking objective.
 */
const faqItems: AccordionItem[] = [
  {
    question: "What does NOVAXA sell?",
    answer:
      "Accessories and gadgets for a better life — considered technology accessories, designed with restraint and built to last.",
  },
  {
    question: "Do you ship internationally?",
    answer: (
      <>
        Yes — NOVAXA ships worldwide, with reliable delivery wherever you&apos;re ordering
        from. See the{" "}
        <Link href="/shipping" className={linkClassName}>
          Shipping page
        </Link>{" "}
        for what&apos;s confirmed so far.
      </>
    ),
  },
  {
    question: "What is your return policy?",
    answer: (
      <>
        Not the right fit? Send it back within 30 days. See the{" "}
        <Link href="/returns" className={linkClassName}>
          Returns page
        </Link>{" "}
        for full process details.
      </>
    ),
  },
  {
    question: "Is checkout secure?",
    answer: "Yes — every checkout is encrypted and fully protected.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "Coming soon.",
  },
  {
    question: "How can I track my order?",
    answer: "Coming soon.",
  },
];

export default function FaqPage() {
  return (
    <Section background="primary">
      <Container>
        <PageHeader title="Frequently Asked Questions" />

        <div className="mt-2xl max-w-2xl">
          <Accordion items={faqItems} />
        </div>

        <p className="mt-2xl max-w-2xl text-body text-text-secondary">
          Can&apos;t find what you&apos;re looking for?{" "}
          <Link href="/contact" className={linkClassName}>
            Contact us
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
