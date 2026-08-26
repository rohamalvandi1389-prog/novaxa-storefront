import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

/**
 * Newsletter — homepage section below Brand Values. Primary background,
 * continuing the alternating rhythm (Hero primary → Collections secondary
 * → Products primary → Values secondary → Newsletter primary).
 */
export function Newsletter() {
  return (
    <Section background="primary">
      <Container>
        <div className="flex flex-col items-start gap-md lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-sm">
            <span className="text-caption font-medium text-text-secondary">Stay in the loop</span>
            <h2 className="text-h2 font-semibold text-text-primary">Join the Novaxa list</h2>
            <p className="max-w-xl text-body text-text-secondary">
              New arrivals, restocks, and considered edits — straight to your inbox, no noise.
            </p>
          </div>

          <NewsletterForm />
        </div>
      </Container>
    </Section>
  );
}
