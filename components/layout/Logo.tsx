import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

const LOGO_DIR = path.join(process.cwd(), "public", "logo");

/** Checked in order — first match wins. Drop the approved asset in
 * /public/logo using one of these filenames and it activates automatically,
 * no component changes required. */
const LOGO_FILENAMES = ["novaxa-logo.svg", "novaxa-logo.png"];

function findLogoAsset(): string | null {
  for (const filename of LOGO_FILENAMES) {
    if (fs.existsSync(path.join(LOGO_DIR, filename))) {
      return `/logo/${filename}`;
    }
  }
  return null;
}

/**
 * Logo — the single place that decides between the approved image asset
 * and the temporary text wordmark. Consumers (Header) always render
 * <Logo /> and never know or care which branch is active.
 */
export function Logo() {
  const logoSrc = findLogoAsset();

  return (
    <Link
      href="/"
      aria-label="NOVAXA — Home"
      className="inline-flex items-center rounded-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
    >
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt="NOVAXA"
          width={401}
          height={86}
          priority
          className="h-auto w-[150px] sm:w-[190px]"
        />
      ) : (
        <span className="text-h4 font-semibold tracking-tight text-text-primary">NOVAXA</span>
      )}
    </Link>
  );
}
