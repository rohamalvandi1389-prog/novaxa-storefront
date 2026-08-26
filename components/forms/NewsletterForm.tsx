import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

/**
 * NewsletterForm — UI only: no onSubmit handler, no validation, no API
 * call. The Subscribe button is type="button" (not "submit") so the form
 * cannot trigger a native page navigation either, even without any JS
 * wiring — matching the same "UI only" precedent as every other CTA
 * built so far.
 */
export function NewsletterForm() {
  return (
    <form
      aria-label="Newsletter signup"
      className="flex w-full max-w-md flex-col gap-sm sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
        />
      </div>

      <Button type="button" variant="primary" size="md">
        Subscribe
      </Button>
    </form>
  );
}
