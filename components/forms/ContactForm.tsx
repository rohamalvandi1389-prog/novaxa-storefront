"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) errors.name = "Enter your name.";
  if (!email) {
    errors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message) errors.message = "Enter a message.";

  return errors;
}

/**
 * ContactForm — real client-side validation (required fields, email
 * format) and accessible labels, but no backend to send to yet. Rather
 * than pretending a message was sent, a valid submission shows a plain,
 * honest note that this form isn't connected to a real destination —
 * "ready for later integration without pretending it is connected," per
 * this phase's instruction. No email address, phone number, or other
 * contact detail is fabricated anywhere in this file.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validate(formData);

    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-card border border-border-default bg-background-secondary p-md text-body text-text-secondary"
      >
        Thanks for reaching out. Our contact form isn&apos;t connected to a live inbox yet —
        please check back soon.
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex max-w-md flex-col gap-md">
      <div className="flex flex-col gap-xs">
        <label htmlFor="contact-name" className="text-caption font-medium text-text-primary">
          Name
        </label>
        <Input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-caption text-status-danger">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-xs">
        <label htmlFor="contact-email" className="text-caption font-medium text-text-primary">
          Email
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-caption text-status-danger">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-xs">
        <label htmlFor="contact-message" className="text-caption font-medium text-text-primary">
          Message
        </label>
        <Textarea
          id="contact-message"
          name="message"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-caption text-status-danger">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" size="lg" className="self-start">
        Send Message
      </Button>
    </form>
  );
}
