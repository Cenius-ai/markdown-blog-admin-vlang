import { PostForm } from '@/components/post-form';

export default function NewPostPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-heading font-semibold">New post</h1>
        <p className="text-sm text-fg-muted mt-1">Write and publish a new article</p>
      </header>
      <div className="rounded-card border border-border-hairline bg-surface-raised p-6 shadow-card">
        <PostForm />
      </div>
    </div>
  );
}
