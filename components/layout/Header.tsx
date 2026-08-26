import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SearchIcon, UserIcon, HeartIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { getCartDrawerData } from "@/app/actions/cartDrawer";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/**
 * Header — sticky, white, thin bottom border, built entirely from
 * existing tokens and shared UI components. Search and Wishlist (Phase
 * 21) link to /search and /wishlist (both styled to match Button's
 * ghost/sm look, since Button itself has no href support — same
 * reasoning as the Checkout/View Cart links elsewhere). Account remains
 * UI only. Cart opens CartDrawer, fetched server-side via the same
 * "use server" bridge pattern used elsewhere; Header itself imports no
 * lib/shopify/ or types/shopify.ts, directly or indirectly.
 */
export async function Header() {
  const cartDrawerData = await getCartDrawerData();

  return (
    <header className="sticky top-0 z-40 border-b border-border-default bg-background-primary">
      <Container>
        <div className="flex h-2xl items-center justify-between">
          <div className="flex items-center gap-md">
            <MobileNav />
            <Logo />
          </div>

          <DesktopNav />

          <div className="flex items-center gap-xs">
            <Link
              href="/search"
              aria-label="Search"
              className="inline-flex items-center justify-center rounded-button border border-transparent bg-transparent px-sm py-xs text-text-primary transition-transform duration-200 ease-hover hover:scale-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              <SearchIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Button variant="ghost" size="sm" aria-label="Account" className="hidden sm:inline-flex">
              <UserIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="inline-flex items-center justify-center rounded-button border border-transparent bg-transparent px-sm py-xs text-text-primary transition-transform duration-200 ease-hover hover:scale-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              <HeartIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <CartDrawer initialData={cartDrawerData} />
          </div>
        </div>
      </Container>
    </header>
  );
}
