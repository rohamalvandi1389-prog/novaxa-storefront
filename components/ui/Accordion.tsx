"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "./icons";
import { cn } from "@/utils/cn";

export interface AccordionItem {
  question: string;
  answer: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
}

/**
 * Accordion — a single reusable, keyboard-accessible accordion. Each
 * item is a real <button> with aria-expanded/aria-controls wired to the
 * panel it reveals, so it works with keyboard and screen readers without
 * any extra ARIA beyond what the pattern actually requires. Only one
 * open item's worth of local "use client" state — the rest of the FAQ
 * page stays a Server Component.
 */
export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="flex flex-col divide-y divide-border-default border-y border-border-default">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-md py-md text-left text-body font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                {item.question}
                <ChevronDownIcon
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 text-text-secondary transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-md text-body text-text-secondary"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
