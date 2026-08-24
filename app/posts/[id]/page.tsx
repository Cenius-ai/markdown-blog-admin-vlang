import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { MarkdownRenderer } from '@/components/markdown-renderer';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    notFound();
  }

  let post;
  try {
    post = await prisma.post.findUnique({
      where: { id: postId },
    });
  } catch (error) {
    console.error('Failed to load post:', error);
    notFound();
  }

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article>
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Link
            href="/"
            className="text-sm text-fg-muted hover:text-fg transition-colors hover:no-underline"
          >
            &larr; Back to all posts
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-muted text-accent">
            {post.tag}
          </span>
          <span className="text-sm text-fg-subtle">{formatDate(post.createdAt)}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-semibold tracking-tight text-fg">
          {post.title}
        </h1>
      </header>

      <div className="prose-blog">
        <MarkdownRenderer content={post.body} />
      </div>

      <footer className="mt-12 pt-6 border-t border-border-hairline">
        <Link
          href="/"
          className="text-sm text-fg-muted hover:text-fg transition-colors hover:no-underline"
        >
          &larr; Back to all posts
        </Link>
      </footer>
    </article>
  );
}
