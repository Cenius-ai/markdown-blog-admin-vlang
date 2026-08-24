'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SessionUser {
  id: number;
  email: string;
  username: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.authenticated) {
          setUser(data.user);
        }
      })
      .catch(() => {
        // Not authenticated — that's fine
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
    router.refresh();
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/admin/posts', label: 'Admin' },
  ];

  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:shrink-0 flex-shrink-0 bg-surface-sidebar border-b lg:border-b-0 lg:border-r border-border-hairline">
      <div className="flex lg:flex-col items-center lg:items-stretch justify-between lg:justify-start px-4 py-3 lg:px-6 lg:py-6 lg:gap-8">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-tight text-fg hover:no-underline shrink-0"
        >
          The Pause
        </Link>

        <nav>
          <ul className="flex lg:flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'block px-3 py-2 rounded-button text-sm font-medium transition-colors hover:no-underline',
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                      ? 'bg-accent-muted text-accent'
                      : 'text-fg-muted hover:text-fg hover:bg-surface'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block mt-auto pt-6 space-y-3">
          {!loading && user && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-fg-muted truncate max-w-[140px]" title={user.email}>
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-fg-subtle hover:text-danger transition-colors ml-2 shrink-0"
              >
                Logout
              </button>
            </div>
          )}
          <p className="text-xs text-fg-subtle leading-relaxed">
            A space for thoughtful writing on technology, lifestyle, and travel.
          </p>
        </div>
      </div>
    </aside>
  );
}
