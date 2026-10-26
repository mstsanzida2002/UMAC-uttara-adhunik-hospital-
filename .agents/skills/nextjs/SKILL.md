# Project Skill: Uttara Adunik Medical College — Conventions

Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4. Frontend website + fully dynamic admin panel in ONE Next.js app.

## Non-negotiable rules

1. **Thin routes.** `app/**/page.tsx` exports only `metadata` + composes components from `components/`. No data fetching, no business logic in route files.
2. **Components are pure.** Props in, UI out. No `fetch`, no DB access, no imports from `server/`. Client components declare `"use client"` and live in the same feature folder.
3. **Server logic lives in `server/` only.**
   - `server/actions/*` — `"use server"` mutations (form handling, CMS writes)
   - `server/queries/*` — server-only reads (DB/CMS), called by Server Components
4. **Route groups.**
   - `app/(site)/` — public website (Navbar/Footer chrome via its layout)
   - `app/(admin)/admin/` — admin panel (own dashboard chrome, auth-guarded)
5. **Imports use the alias** `@/*` (maps to project root). No deep relative chains like `../../..`.
6. **Static assets only in `public/`** (`/images/...`, `/icons/...`). Never import images from arbitrary folders.
7. **Tailwind v4 CSS-first.** Design tokens live in `app/globals.css` via `@theme`. The Figma design's exact colors/fonts/spacing are the single source of truth — no OS-driven auto dark mode.
8. **Everything on the frontend is DB-driven.** Any visible text/image/setting must be editable from the admin panel. Hardcoding content in components is a convention violation (placeholders during scaffolding are temporary).

## Folder map

```
app/                  routing layer only (thin pages, layouts, route handlers)
  (site)/             public pages — shared chrome layout
  (admin)/admin/      admin panel — own chrome, protected
components/
  home/ about/ ...    feature-scoped components, mirror the routes
  shared/             cross-page UI (Navbar, Footer, ...)
  layouts/            reusable layout shells
  ui/                 design-system primitives (Button, Input, Card, ...)
server/
  actions/            server actions (mutations)
  queries/            server-only data reads
lib/                  shared non-UI helpers
types/                shared TypeScript types
hooks/                client hooks
public/               static assets only
.agents/skills/       this file — AI-agent project context
```

## Pending decisions (to be confirmed with the user)

- Database + ORM (leaning Prisma/Postgres for the CMS layer)
- Auth provider for the admin panel
- Image storage strategy (local `public/uploads` vs external)
- Figma design link → drives all UI implementation