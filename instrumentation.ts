export async function register() {
  // Only run DB setup in the Node.js server runtime, never during build
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { ensureDatabase } = await import('./lib/auto-setup');
    await ensureDatabase();
  }
}
