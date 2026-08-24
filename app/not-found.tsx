import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-heading font-semibold text-accent mb-4">404</p>
      <h1 className="text-xl font-heading font-semibold mb-2">Page not found</h1>
      <p className="text-fg-muted mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-4 py-2 rounded-button bg-accent text-accent-fg text-sm font-medium hover:no-underline"
      >
        Go home
      </Link>
    </div>
  );
}
