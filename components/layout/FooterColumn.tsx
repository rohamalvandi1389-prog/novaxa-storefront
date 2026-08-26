import Link from "next/link";
import type { FooterLink } from "@/constants/footerLinks";

export interface FooterColumnProps {
  title: string;
  links: readonly FooterLink[];
}

/**
 * FooterColumn — one titled list of links. Used for Shop/Company/Support
 * so that structure isn't repeated three times in Footer.tsx. Each column
 * is its own labeled nav landmark.
 */
export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <nav aria-label={title} className="flex flex-col gap-sm">
      <h3 className="text-caption font-medium uppercase tracking-wide text-text-secondary">
        {title}
      </h3>
      <ul className="flex flex-col gap-xs">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="rounded-button text-body text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
