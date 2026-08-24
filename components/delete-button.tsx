'use client';

import { useState } from 'react';

interface DeleteButtonProps {
  postId: number;
  postTitle: string;
  onDeleted: (id: number) => void;
}

export function DeleteButton({ postId, postTitle, onDeleted }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      onDeleted(postId);
    } catch {
      alert('Failed to delete post.');
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-3 py-1.5 text-xs font-medium rounded-button bg-danger text-white hover:opacity-90 disabled:opacity-50"
        >
          {deleting ? '…' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={deleting}
          className="px-3 py-1.5 text-xs font-medium rounded-button border border-border hover:bg-surface"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-3 py-1.5 text-xs font-medium rounded-button text-danger hover:bg-danger/10 transition-colors"
      title={`Delete "${postTitle}"`}
    >
      Delete
    </button>
  );
}
