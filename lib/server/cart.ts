import { cookies } from "next/headers";

const CART_ID_COOKIE = "novaxa_cart_id";
const CART_ID_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

/**
 * Server-safe cart ID storage via an HTTP-only cookie — not localStorage,
 * not any client-readable mechanism. `httpOnly: true` means the cookie is
 * sent automatically with requests but is invisible to client-side
 * JavaScript (document.cookie cannot read it), satisfying "do not expose
 * cart ID client-side".
 *
 * Next.js constraint: cookies() is readable anywhere on the server, but
 * .set()/.delete() are only permitted inside a Server Action or Route
 * Handler — not during plain Server Component rendering. setCartId() and
 * clearCartId() are defined now for that future call site; they are not
 * wired to any UI yet per this phase's scope.
 */

export async function getCartId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_ID_COOKIE)?.value;
}

export async function setCartId(cartId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CART_ID_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: CART_ID_COOKIE_MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function clearCartId(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CART_ID_COOKIE);
}
