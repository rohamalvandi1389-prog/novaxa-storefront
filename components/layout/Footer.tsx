import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, TikTokIcon, XIcon } from "@/components/ui/icons";
import { featuredCollections } from "@/constants/collections";
import { footerCompanyLinks, footerLegalLinks, footerSupportLinks } from "@/constants/footerLinks";
import { FooterColumn } from "./FooterColumn";
import { Logo } from "./Logo";

const socialLinks = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "X (Twitter)", href: "#", Icon: XIcon },
  { label: "TikTok", href: "#", Icon: TikTokIcon },
];

// Shop column reuses the existing collections data rather than
// re-typing the same four labels — href follows the same convention
// FeaturedCollections' cards will eventually route to.
const shopLinks = featuredCollections.map((collection) => ({
  label: collection.title,
  href: `/collections/${collection.slug}`,
}));

/**
 * Footer — global, rendered once in app/layout.tsx. Links throughout are
 * UI only: real Next.js <Link>s with real-looking paths (so wiring up
 * routing later is a small diff), but no pages exist behind them yet.
 * Social links use href="#" since there's no real profile to point to
 * yet — "UI only, no external logic" per this phase's scope.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-default bg-background-primary">
      <Container>
        <div className="grid grid-cols-1 gap-2xl py-3xl sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-md">
            <Logo />
            <p className="max-w-xs text-body text-text-secondary">
              Considered pieces made with premium materials and modern restraint.
            </p>
            <nav aria-label="Social media" className="flex items-center gap-sm">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="rounded-button p-xs text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  <Icon className="h-md w-md" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="Company" links={footerCompanyLinks} />
          <FooterColumn title="Support" links={footerSupportLinks} />
        </div>

        <div className="flex flex-col items-start gap-sm border-t border-border-default py-md sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-text-secondary">
            &copy; {year} NOVAXA. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-md">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-button text-caption text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
