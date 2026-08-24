import type { Metadata } from 'next';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import { Sidebar } from '@/components/sidebar';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'The Pause', template: '%s — The Pause' },
  description: 'A blog about technology, lifestyle, and travel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
