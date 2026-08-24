'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface PostFormProps {
  initial?: {
    title: string;
    body: string;
    tag: string;
    published: boolean;
  };
  postId?: number;
}

export function PostForm({ initial, postId }: PostFormProps) {
  const router = useRouter();
  const isEditing = !!postId;

  const [title, setTitle] = useState(initial?.title ?? '');
  const [body, setBody] = useState(initial?.body ?? '');
  const [tag, setTag] = useState(initial?.tag ?? 'tech');
  const [published, setPublished] = useState(initial?.published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!body.trim()) {
      setError('Body is required.');
      return;
    }

    setSaving(true);

    try {
      const url = isEditing ? `/api/posts/${postId}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          tag: tag.trim(),
          published,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post.');
    } finally {
      setSaving(false);
    }
  };

  const tags = ['tech', 'lifestyle', 'travel'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-button bg-danger/10 border border-danger/30 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-fg mb-1.5">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-input border border-border bg-surface-raised px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          placeholder="Post title"
          required
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-fg mb-1.5">
          Body <span className="text-fg-subtle font-normal">(Markdown)</span>
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={16}
          className="w-full rounded-input border border-border bg-surface-raised px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent font-mono resize-y"
          placeholder="Write your post in markdown…"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="tag" className="block text-sm font-medium text-fg mb-1.5">
            Tag
          </label>
          <select
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full rounded-input border border-border bg-surface-raised px-3 py-2 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          >
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent/30"
            />
            <span className="text-sm font-medium text-fg">Published</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center px-5 py-2.5 rounded-button bg-accent text-accent-fg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving ? 'Saving…' : isEditing ? 'Update post' : 'Create post'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/posts')}
          className="px-5 py-2.5 rounded-button border border-border text-sm font-medium text-fg-muted hover:bg-surface transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
