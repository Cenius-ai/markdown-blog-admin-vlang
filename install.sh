#!/usr/bin/env bash
set -euo pipefail

echo "=== Blog + Admin: Installing dependencies ==="
npm install --no-audit --no-fund

echo "=== Generating Prisma client ==="
npx --no-install prisma generate

echo "=== Pushing database schema ==="
npx --no-install prisma db push

echo "=== Seeding database ==="
npx --no-install prisma db seed

echo ""
echo "Install complete. Start the dev server with:"
echo "  npm run dev"
echo ""
echo "The app will be available at http://0.0.0.0:3000"
