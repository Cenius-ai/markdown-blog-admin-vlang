'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { DeleteButton } from '@/components/delete-button';

interface Post {
  id: number;
  title: string;
  tag: string;
  published: boolean;
  createdAt: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPosts(data);
    } catch {
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeleted = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-semibold">Posts</h1>
          <p className="text-sm text-fg-muted mt-1">Manage all posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center px-4 py-2 rounded-button bg-accent text-accent-fg text-sm font-medium hover:no-underline"
        >
          New post
        </Link>
      </header>

      {loading && (
        <div className="text-center py-12 text-fg-muted">Loading posts…</div>
      )}

      {error && (
        <div className="rounded-card border border-border-hairline bg-surface-raised p-8 text-center">
          <p className="text-danger font-medium">{error}</p>
          <button
            onClick={fetchPosts}
            className="mt-3 text-sm text-accent hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="rounded-card border border-border-hairline bg-surface-raised p-8 text-center">
          <p className="text-fg-muted mb-3">No posts yet.</p>
          <Link
            href="/admin/posts/new"
            className="text-sm text-accent hover:underline"
          >
            Create your first post
          </Link>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="overflow-hidden rounded-card border border-border-hairline bg-surface-raised shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-hairline bg-surface-sidebar">
                <th className="text-left px-4 py-3 font-medium text-fg-muted">Title</th>
                <th className="text-left px-4 py-3 font-medium text-fg-muted hidden sm:table-cell">Tag</th>
                <th className="text-left px-4 py-3 font-medium text-fg-muted hidden md:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-medium text-fg-muted hidden md:table-cell">Date</th>
                <th className="text-right px-4 py-3 font-medium text-fg-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-border-hairline last:border-0 hover:bg-accent-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-medium text-fg">{post.title}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent-muted text-accent">
                      {post.tag}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-medium ${post.published ? 'text-success' : 'text-fg-subtle'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-fg-muted hidden md:table-cell">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="px-3 py-1.5 text-xs font-medium rounded-button border border-border hover:bg-surface transition-colors hover:no-underline"
                      >
                        Edit
                      </Link>
                      <DeleteButton postId={post.id} postTitle={post.title} onDeleted={handleDeleted} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
