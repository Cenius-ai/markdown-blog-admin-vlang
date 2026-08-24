import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatDate, excerpt } from '@/lib/utils';
import { PostCard } from '@/components/post-card';

export default async function HomePage() {
  let posts: Array<{
    id: number;
    title: string;
    tag: string;
    published: boolean;
    createdAt: Date;
    body: string;
  }> = [];

  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to load posts:', error);
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-2xl font-heading font-semibold mb-3">No posts yet</h1>
        <p className="text-fg-muted mb-6">Run install.sh to seed the database, or create your first post.</p>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center px-4 py-2 rounded-button bg-accent text-accent-fg text-sm font-medium hover:no-underline"
        >
          Write the first post
        </Link>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-2xl font-heading font-semibold tracking-tight">Latest</h1>
        <p className="mt-1 text-fg-muted">
          {posts.length} published {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </header>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            tag={post.tag}
            date={formatDate(post.createdAt)}
            excerpt={excerpt(post.body)}
          />
        ))}
      </div>
    </div>
  );
}
