import type { Metadata } from "next";
import { WishlistPage } from "@/components/wishlist/WishlistPage";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistRoute() {
  return <WishlistPage />;
}
