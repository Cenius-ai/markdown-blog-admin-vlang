import Link from 'next/link';

interface PostCardProps {
  id: number;
  title: string;
  tag: string;
  date: string;
  excerpt: string;
}

export function PostCard({ id, title, tag, date, excerpt }: PostCardProps) {
  return (
    <Link
      href={`/posts/${id}`}
      className="block group rounded-card border border-border-hairline bg-surface-raised p-5 sm:p-6 shadow-card hover:shadow-md transition-shadow hover:no-underline"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-muted text-accent">
          {tag}
        </span>
        <span className="text-xs text-fg-subtle">{date}</span>
      </div>
      <h2 className="text-lg font-heading font-semibold text-fg group-hover:text-accent transition-colors">
        {title}
      </h2>
      <p className="mt-2 text-sm text-fg-muted leading-relaxed line-clamp-2">
        {excerpt}
      </p>
    </Link>
  );
}
