# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In Progress

## Current Goal

- Feature 06 (TBD — defined in next feature spec)

## Completed

- **Feature 01: Design System**
  - Installed and configured shadcn/ui (`shadcn@4.6.0`, Nova preset, Radix base, Tailwind v4)
  - Added shadcn components: Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea (in `components/ui/`)
  - Installed `lucide-react`
  - `lib/utils.ts` created with `cn()` helper (clsx + tailwind-merge)
  - `globals.css` rewritten: dark-only theme, Ghost App CSS custom properties mapped to shadcn tokens and Tailwind utilities

- **Feature 02: Editor Chrome**
  - Created `components/editor/editor-navbar.tsx` — fixed-height top bar; sidebar toggle with `PanelLeftOpen`/`PanelLeftClose`; `UserButton` in right section
  - Created `components/editor/project-sidebar.tsx` — floating overlay sidebar, slides from left; My Projects / Shared tabs; New Project button
  - Created `components/editor/editor-shell.tsx` — client wrapper managing sidebar state; used in `app/editor/page.tsx`

- **Feature 03: Auth**
  - Installed `@clerk/ui`
  - Created `proxy.ts` at project root using `clerkMiddleware` + `createRouteMatcher` — all routes protected by default, `/sign-in(.*)` and `/sign-up(.*)` are public (resolved from env vars)
  - Wrapped root layout with `ClerkProvider` using `@clerk/ui/themes` `dark` theme; appearance variables override using `var(--*)` CSS tokens — no hardcoded colors
  - `app/page.tsx` redirects: authenticated → `/editor`, unauthenticated → `/sign-in`
  - Created `app/editor/page.tsx` with `EditorShell`
  - Created `components/auth/auth-panel.tsx` — shared 2-panel auth layout: left panel (lg+) has logo, tagline, and text-only feature list; right panel has centered Clerk form; mobile shows form only
  - Created `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx`
  - Added Clerk env vars to `.env.local`: `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL`, `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
  - `npm run build` passes

- **Feature 04: Project dialogs**
  - `hooks/use-project-dialogs.ts` — mock `MockProject[]`, dialog kind state, create/rename form fields, `isSubmitting`, slug preview via `slugFromDisplayName`, open/close/submit handlers (mock delay, no API)
  - `lib/slug.ts` — `slugFromDisplayName()` for live slug preview
  - `context/project-dialogs-context.tsx` — `ProjectDialogsProvider` + `useProjectDialogsContext()`
  - `components/editor/project-dialogs-root.tsx` — Create / Rename / Delete dialogs using shadcn `Dialog`; rename uses `<form>` (Enter submits), auto-focus via `requestAnimationFrame` + `getElementById`; delete uses destructive primary action only
  - `components/editor/editor-home.tsx` — center copy + `New Project` (Plus) opens create dialog
  - `app/editor/page.tsx` — `EditorShell` + `EditorHome`
  - `components/editor/project-sidebar.tsx` — mock lists per tab; rename/delete icon actions on **My Projects** only; **Shared** tab has no actions; footer `New Project` opens create dialog; both sidebar entry points close sidebar when opening a dialog; mobile (`md:hidden`) full-area scrim under sidebar (`z-10`) closes sidebar on tap
  - `components/editor/editor-shell.tsx` — wraps tree in `ProjectDialogsProvider`, renders `ProjectDialogsRoot`, mobile backdrop for open sidebar

- **Feature 05: Prisma**
  - `prisma/models/project.prisma` — `Project` (ownerId, name, description?, `ProjectStatus` enum `DRAFT`/`ARCHIVED`, `canvasJsonPath`, timestamps; `@@index([ownerId])`, `@@index([createdAt])`); `ProjectCollaborator` (relation cascade delete, email, `createdAt`, `@@unique([projectId, email])`, `@@index([email])`, `@@index([projectId, createdAt])`)
  - `prisma/schema.prisma` — generator + datasource only (multi-file: sibling models under `prisma/`)
  - `prisma.config.ts` — `schema: "prisma"` (directory merge for multi-file); loads `.env` then `.env.local` so `DATABASE_URL` is available to CLI
  - `lib/prisma.ts` — singleton `prisma`: if `DATABASE_URL` starts with `prisma+postgres://`, `new PrismaClient({ accelerateUrl })` + `$extends(withAccelerate())`; else shared `pg` `Pool` + `PrismaPg` adapter; caches client (and pool in dev) on `globalThis` when `NODE_ENV !== "production"`
  - Migration `20260504073035_init_project_models` applied; client generated to `app/generated/prisma`
  - Dependencies: `@prisma/extension-accelerate`, `dotenv`, `pg` (explicit); `npm run build` runs `prisma generate && next build`
  - `.gitignore` — ignore `app/generated/prisma` (generated client); `package.json` `engines.node` aligned with Prisma CLI (`>=20.19.0 || >=22.12.0`)

## In Progress

- None.

## Next Up

- Feature 06 (TBD — defined in next feature spec)

## Open Questions

- None yet.

## Architecture Decisions

- shadcn/ui uses `@base-ui/react` (not `@radix-ui/*`) — this is the newer underlying primitive library used by the Nova preset.
- Dark-only theme: all color variables set in `:root` directly, no `.dark` class toggle needed.
- Ghost App CSS variables (`--bg-base`, `--text-primary`, etc.) are defined in `:root` and mapped to shadcn tokens and Tailwind utilities via `@theme inline`.
- Editor sidebar floats below the navbar (`top-12`, `h-[calc(100vh-3rem)]`); z-index: sidebar at `z-20`, mobile scrim at `z-10`.
- Next.js 16 uses `proxy.ts` (renamed from `middleware.ts`) — exported function must be named `proxy` or be a default export.
- Clerk appearance uses `theme: dark` (not `baseTheme`) from `@clerk/ui/themes`, with `variables` overriding using `var(--*)` CSS custom properties.
- Project dialog + mock project state lives in `useProjectDialogs` and is provided app-wide under `/editor` via `ProjectDialogsProvider` in `EditorShell`.
- Prisma ORM v7: multi-file schema uses `prisma.config.ts` `schema: "prisma"` (folder); all `*.prisma` under `prisma/` are merged — do not use `import` in `schema.prisma` for this setup. Prisma Client output: `app/generated/prisma` (`generator client { provider = "prisma-client" }`). Use Node `>=20.19` or `>=22.12` for Prisma CLI (matches `prisma` package engines).

## Session Notes

- Started from a fresh Next.js 16 scaffold with Tailwind v4 and Geist fonts.
- `components/ui/*` files must not be modified — they are generated by shadcn CLI.
- All app-level styling uses Ghost App token utilities: `bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`, etc.
- Editor components live in `components/editor/`; auth layout in `components/auth/`.
- `.env.local` contains all Clerk keys — do not commit.
- After clone: ensure `DATABASE_URL` in `.env` or `.env.local`, then `npm install` and `npm run build` (runs `prisma generate`).
