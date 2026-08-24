import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PostForm } from '@/components/post-form';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-heading font-semibold">Edit post</h1>
        <p className="text-sm text-fg-muted mt-1">Editing &ldquo;{post.title}&rdquo;</p>
      </header>
      <div className="rounded-card border border-border-hairline bg-surface-raised p-6 shadow-card">
        <PostForm
          initial={{
            title: post.title,
            body: post.body,
            tag: post.tag,
            published: post.published,
          }}
          postId={post.id}
        />
      </div>
    </div>
  );
}
