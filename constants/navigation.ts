export interface NavItem {
  label: string;
  href: string;
}

/**
 * The approved primary navigation. Both DesktopNav and MobileNav read from
 * this single list so the two never drift out of sync.
 */
export const primaryNavItems: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Accessories", href: "/accessories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
