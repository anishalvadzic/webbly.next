# Agents

## Cursor Cloud specific instructions

### Overview

Webbly is a single Next.js 15 (App Router) marketing site for a Norwegian web agency. No monorepo, no Docker, no database.

### Running the application

- `npm run dev` — starts Next.js dev server on port 3000
- `npm run build` — production build
- `npm run lint` — ESLint

### Known issue: missing `MockupCarousel` import

The commit that introduced the Remotion-based examples page deleted `components/landing/MockupCarousel.jsx` but did not remove the import from `app/HomeClient.jsx`. This breaks the build and dev server. The fix is to remove the import and usage of `MockupCarousel` from `app/HomeClient.jsx`.

### External services (not required for local dev)

The API routes (`/api/booking`, `/api/contact`) require environment variables for Gmail SMTP, Google Calendar, and optionally Upstash Redis. The marketing pages, blog, about, examples, and FAQ pages all work without these. Rate limiting via Upstash Redis fails open gracefully.

### Remotion

The examples page uses `remotion` and `@remotion/player` for animated website previews. These packages must be installed (they are in `package.json`).
