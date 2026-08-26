import type { ReactNode } from "react";

export interface ValueCardProps {
  /** Already-resolved icon element (e.g. <StarIcon />) — this component
   * stays generic and doesn't know about the brand-values icon map. */
  icon: ReactNode;
  title: string;
  description: string;
}

export function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="flex flex-col items-start gap-sm rounded-card border border-border-default bg-background-primary p-md shadow-soft">
      <span
        aria-hidden="true"
        className="flex h-2xl w-2xl items-center justify-center rounded-card bg-background-secondary text-text-primary"
      >
        {icon}
      </span>
      <h3 className="text-h4 font-semibold text-text-primary">{title}</h3>
      <p className="text-body text-text-secondary">{description}</p>
    </div>
  );
}
