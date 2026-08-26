"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export interface SearchFormProps {
  initialQuery?: string;
}

/**
 * SearchForm — the one reusable search input. Client Component because
 * submission needs to conditionally build the URL (a blank/whitespace
 * query navigates to plain /search, not /search?q=) — a native GET form
 * can't express that distinction on its own. Uncontrolled input (read via
 * FormData on submit) rather than useState, since nothing else needs the
 * value on every keystroke.
 */
export function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const raw = formData.get("q");
    const query = typeof raw === "string" ? raw.trim() : "";

    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="flex w-full max-w-md gap-sm">
      <div className="flex-1">
        <label htmlFor="search-query" className="sr-only">
          Search products
        </label>
        <Input
          id="search-query"
          name="q"
          type="search"
          defaultValue={initialQuery}
          placeholder="Search products"
          autoComplete="off"
        />
      </div>
      <Button type="submit" variant="primary" size="md">
        Search
      </Button>
    </form>
  );
}
