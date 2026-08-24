# Install

Step-by-step setup guide for this project. Every prerequisite, command, and environment variable referenced here is derived from files actually present in this repo (manifests like `package.json` / `pyproject.toml` / `build.gradle.kts` / `pom.xml` / `pubspec.yaml` / `Cargo.toml` / `go.mod` / `composer.json` and the source itself).

## 1. Prerequisites

- Node.js 20 or later
- Package manager: **npm** (use `which` to confirm it's on your PATH)
- A reachable SQLite instance (local or remote)
- **Git** (to clone the repo)

## 2. Get the code

```bash
git clone <repo-url> && cd <project>
```

The repo's top-level project is named **blog-admin**.

## 3. Install dependencies

This project uses **npm** as the package manager — dependency files: `package.json`.

Run:

```bash
npm install
```

## 4. Configure environment variables

The source code references **4** environment variables. Copy the bundled `.env.example` to `.env` and fill in the real values:

```bash
cp .env.example .env
$EDITOR .env  # fill in real values
```

**Variable reference**:

| Variable | Required? | Provider | Where to obtain |
|----------|-----------|----------|-----------------|
| `JWT_SECRET` | **yes** | App secret | Generate via `openssl rand -hex 32` |
| `NEXT_RUNTIME` | no | (application) | (see source) |
| `NODE_ENV` | no | Runtime config | Standard runtime configuration; not secret |
| `PORT` | no | Runtime config | Standard runtime configuration; not secret |

Secrets should NEVER be committed. `.env` is in your `.gitignore` by default; verify with `git check-ignore .env`.

## 5. Database setup

This project uses **SQLite** with `prisma` migrations.
Migration files live under `prisma/migrations/`.

Before first run, point your `DATABASE_URL` (or equivalent) at a reachable database, then apply migrations:

```bash
npx prisma db push --skip-generate --accept-data-loss
```

SQLite needs no server — set `DATABASE_URL=sqlite:///./app.db` for local dev and the file will be created on first migrate.

## 6. Run in development

```bash
npm run dev
```

_This runs `node node_modules/.bin/next dev -H 0.0.0.0 -p ${PORT:-3000}` (declared in `package.json` `scripts.dev`)._

## 7. Build for production

```bash
npm run build
```

## 8. Common pitfalls + troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `EACCES` permission errors during install | Global npm install path not writable | Use a node-version manager (nvm / fnm / volta) instead of system Node; never `sudo npm install`. |
| `Module not found` for `next` / `react` after install | Wrong package manager — lockfile says one, you ran another | Stick to `npm` (the lockfile in this repo). Delete `node_modules` + rerun `npm install` if you accidentally mixed. |
| Migration command fails: `connection refused` | `DATABASE_URL` points at a host that's not running | Verify the DB is up (`pg_isready -h <host>`, `docker compose ps`, etc.) before re-running the migration. |
| `prisma migrate deploy` reports drift | Production DB schema diverged from migrations | Run `npx prisma migrate diff` to inspect, then either fix the DB or generate a new migration to bring it back in sync. |
| Dev server fails: `Address already in use` | Another process holding the port | `lsof -i :<port>` to find the PID, then `kill <pid>`. Or set `PORT=<free_port>` before the dev command. |
| App boots but crashes immediately with `KeyError` / `undefined env var` | Required variable missing from `.env` | Cross-check the variable name against `.env.example` — every variable without a `Default` line is required. |
