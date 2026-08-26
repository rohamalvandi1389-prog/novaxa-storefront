export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/**
 * PageHeader — the single heading pattern for content pages (About,
 * Contact, Careers, Shipping, Returns, FAQ, Privacy, Terms, Shop,
 * Accessories). Same eyebrow/h1/description structure the Hero and
 * homepage sections already use, so a new page reads as part of the
 * same site rather than a different template.
 */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-sm border-b border-border-default pb-2xl">
      {eyebrow && (
        <span className="text-caption font-medium uppercase tracking-widest text-brand-blue">
          {eyebrow}
        </span>
      )}
      <h1 className="text-h1 font-semibold text-text-primary">{title}</h1>
      {description && <p className="max-w-2xl text-body text-text-secondary">{description}</p>}
    </div>
  );
}
