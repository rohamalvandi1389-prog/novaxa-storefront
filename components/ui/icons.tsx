import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Shared stroke defaults so every icon in the set reads as one consistent
 * family. All icons use currentColor, so they inherit color from whatever
 * text/color class is applied to their parent — never a hardcoded color.
 */
const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SearchIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20.5 8H6" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M12 20s-7-4.35-9.5-8.5C.5 8 2 4.5 5.5 4.5c2 0 3.5 1.2 4.5 2.7C11 5.7 12.5 4.5 14.5 4.5 18 4.5 19.5 8 19.5 11.5 17 15.65 12 20 12 20Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="m12 3 2.5 5.5 6 .5-4.5 4 1.3 6-5.3-3-5.3 3 1.3-6-4.5-4 6-.5Z" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7.5" cy="18.5" r="1.5" />
      <circle cx="17.5" cy="18.5" r="1.5" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M4 4v5h5" />
      <path d="M20 20v-5h-5" />
      <path d="M5.5 9A7 7 0 0 1 19 8" />
      <path d="M18.5 15A7 7 0 0 1 5 16" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path
        d="M13.5 21v-7h2.2l.3-2.7h-2.5V9.4c0-.8.2-1.3 1.4-1.3h1.2V5.7c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.2v2.1H9v2.7h2v7"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M5 4l14 16" />
      <path d="M19 4 5 20" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="M13 3v11.5a3.5 3.5 0 1 1-3-3.46" />
      <path d="M13 3a5 5 0 0 0 5 5" />
      <path d="M18 8v2.5a7.5 7.5 0 0 1-5-2" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...strokeProps} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
