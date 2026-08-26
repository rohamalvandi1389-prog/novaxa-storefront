export interface PlaceholderNoticeProps {
  message: string;
}

/**
 * PlaceholderNotice — a plain, functional notice box, not a decorative
 * element. Used on pages where real content (legal copy, policy specifics,
 * job listings) doesn't exist yet, so the page is honest about that
 * rather than inventing something to fill the space.
 */
export function PlaceholderNotice({ message }: PlaceholderNoticeProps) {
  return (
    <div className="rounded-card border border-border-default bg-background-secondary p-md text-body text-text-secondary">
      {message}
    </div>
  );
}
