# Using blog-admin

## Overview

This is **blog-admin** — an HTTP API + web UI. This document covers the surface area you can use, with copy-pasteable examples for each entry point. For setup, see `INSTALL.md`.

## Quickstart

After completing the install steps in `INSTALL.md`:

```bash
npm run dev    # start the server
# in another terminal:
curl http://localhost:8000/
```

## Endpoints

Every endpoint below was extracted from the source by the route scanner (Next.js / FastAPI / Flask / Django / Express).

| Method | Path | Source file |
|--------|------|-------------|
| `GET` | `/` | `app/page.tsx` |
| `GET` | `/admin/posts` | `app/admin/posts/page.tsx` |
| `GET` | `/admin/posts/:id/edit` | `app/admin/posts/[id]/edit/page.tsx` |
| `GET` | `/admin/posts/new` | `app/admin/posts/new/page.tsx` |
| `GET` | `/login` | `app/login/page.tsx` |
| `GET` | `/posts/:id` | `app/posts/[id]/page.tsx` |

### curl examples

#### `GET /`

```bash
curl http://localhost:8000/
```

#### `GET /admin/posts`

```bash
curl http://localhost:8000/admin/posts
```

#### `GET /admin/posts/:id/edit`

```bash
curl http://localhost:8000/admin/posts/1/edit
```

#### `GET /admin/posts/new`

```bash
curl http://localhost:8000/admin/posts/new
```

#### `GET /login`

```bash
curl http://localhost:8000/login
```

## Worked example

1. Boot the server (`npm run dev`).
2. Hit a smoke-test endpoint:

```bash
curl -sS http://localhost:8000/
```

3. If you get a JSON / HTML response, the server is healthy. Inspect `.env` if it errors with an auth/config failure.

## Reference

### Entry points

_No explicit entry points declared in this project's manifests._

### Surface index (auto-extracted)

| Kind | Title | Source file |
|------|-------|-------------|
| route | `/` | `app/page.tsx` |
| route | `/admin/posts` | `app/admin/posts/page.tsx` |
| route | `/admin/posts/:id/edit` | `app/admin/posts/[id]/edit/page.tsx` |
| route | `/admin/posts/new` | `app/admin/posts/new/page.tsx` |
| route | `/login` | `app/login/page.tsx` |
| route | `/posts/:id` | `app/posts/[id]/page.tsx` |

## Next steps

- Read [INSTALL.md](./INSTALL.md) if anything in the Quickstart didn't work.
- Inspect `.env.example` for the full list of environment variables this project understands.
- See [README.md](./README.md) for the architecture diagram + feature list.
