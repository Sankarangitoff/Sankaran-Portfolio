# CLAUDE.md - Project Context for Claude Code

## Project Overview

This is **Sankaran Portfolio**, a premium portfolio website for a Backend Software Engineer. It's built with Next.js 14, Tailwind CSS, Framer Motion, and a custom admin panel.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables for theming
- **Animations**: Framer Motion
- **Game Engine**: Pure CSS/DOM pixel art platformer (Experience section), Web Audio API for 8-bit sounds
- **3D Graphics**: React Three Fiber + @react-three/drei
- **Content Management**: Custom admin panel at `/admin` with JSON file storage
- **Auth**: bcryptjs + jose (JWT in httpOnly cookies)
- **Contact Form**: Web3Forms API
- **Testing**: Playwright E2E

## Key Directories

```
src/app/           → Next.js pages (layout.tsx, page.tsx, admin routes)
src/app/admin/     → Admin panel pages (login, dashboard, section editors)
src/app/api/admin/ → Admin API routes (login, logout, content CRUD, upload)
src/components/    → React components (ui/, layout/, sections/, three/, admin/)
src/components/game/ → Pixel art platformer game (Character, GameWorld, ExperienceStation, ExperienceCard, GameHUD, MobileControls)
src/hooks/         → Custom hooks (useScrollSpy, useGameControls, useSoundEffects)
src/lib/           → Content data access (content.ts), auth (auth.ts), utils
src/types/         → TypeScript interfaces (content.ts, index.ts re-exports)
data/              → JSON content files (one per section, source of truth)
public/uploads/    → Uploaded images and files
tests/e2e/         → Playwright test files
```

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run dev -- -p 3001  # Use alternate port if 3000 is occupied (also try 3002)
npm run build      # Production build
npm run test       # Run Playwright tests
npx tsx scripts/hash-password.ts <password>  # Generate bcrypt hash
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_WEB3FORMS_KEY` - Web3Forms access key
- `ADMIN_USERNAME` - Admin panel username
- `ADMIN_PASSWORD_HASH` - bcrypt hash (generate with hash-password script)
- `JWT_SECRET` - 64-char random string for JWT signing

## Architecture Notes

### Theming
- Dark mode is default, controlled by `next-themes`
- CSS variables defined in `globals.css` (`:root` for dark, `.light` for light)
- Colors: Black (#0A0A0A) + Orange (#FF6B00) accent

### Content Flow
1. Content stored as JSON files in `data/` directory (8 files, one per section)
2. `src/lib/content.ts` provides `getSection()`, `getAllContent()`, `writeSection()`
3. `src/app/page.tsx` calls `getAllContent()` to render the portfolio
4. Admin panel at `/admin` provides UI to edit each section via API routes
5. API routes at `/api/admin/content/[section]` handle GET/PUT for each section

### Admin Panel
- Protected by middleware (`src/middleware.ts`) — JWT auth check
- Login at `/admin/login`, dashboard at `/admin`
- 8 section editors with forms for each content type
- Image uploads saved to `public/uploads/`
- Dark theme (gray-950 background, orange-500 accent)

### Components
- UI components in `src/components/ui/` are reusable (Button, Card, Input, etc.)
- Section components in `src/components/sections/` map to page sections
- Admin components in `src/components/admin/` (sidebar, forms, UI inputs)
- 3D scene in `src/components/three/` (dynamically imported, SSR disabled)

## Common Tasks

### Adding a new section
1. Add TypeScript types in `src/types/content.ts`
2. Create `data/newSection.json` with seed data
3. Add section key to `SECTIONS` array in `src/lib/content.ts`
4. Create component in `src/components/sections/`
5. Add to `src/app/page.tsx`
6. Create admin form in `src/components/admin/forms/`
7. Create admin page in `src/app/admin/newSection/page.tsx`
8. Add link to `AdminSidebar.tsx`

### Modifying theme colors
- Edit CSS variables in `src/app/globals.css`
- Tailwind config uses these variables in `tailwind.config.ts`

## Testing

Playwright tests cover:
- Navigation and scroll spy
- Section visibility
- Theme toggle
- Contact form
- Responsive design

Run with: `npm run test`

## Gotchas

- **Sections appear black on full-page screenshot**: All section components use framer-motion `whileInView` with `initial={{ opacity: 0 }}` — content only becomes visible when scrolled into viewport. This is expected behavior, not missing content.
- **Content source of truth**: The `data/*.json` files are the single source of truth. If sections appear empty, check these files first. Admin panel at `/admin` edits these same files via API routes.
- **Platform is Windows**: Use `netstat -ano | findstr ":3000"` to check port usage. PowerShell variable interpolation in bash tool requires careful escaping.
- **Resume data**: Owner is Sankaran Rajendran, Software Engineering Analyst at Techjays, Coimbatore. Resume PDF not stored in repo — content was manually populated into `data/` JSON files from external PDF.
- **Build includes ESLint**: `npm run build` runs ESLint after TypeScript. `npx tsc --noEmit` alone won't catch lint errors like unused variables. Always verify with `npm run build`.
- **Game components use styled-jsx**: Components in `src/components/game/` use `<style jsx>` for scoped CSS animations (character sprites, parallax, coin spin). Rest of the codebase uses Tailwind.
- **Experience section is interactive**: The Experience section (`src/components/sections/Experience.tsx`) is a pixel art platformer game with sticky viewport, not a static timeline. The section height is 3x viewport for scroll-driven gameplay.
- **Git state**: The repo has accumulated uncommitted changes across multiple sessions (sanity removal, admin panel, content system). Stage carefully — `git add .` will include a lot.
- **`.next` cache corruption**: After modifying multiple files, the dev server may throw `e[o] is not a function` or `Cannot find module './NNN.js'` errors. Fix by stopping the server, deleting the `.next` directory, and restarting.
- **Git hooks block automation**: A pre-tool hook (`validate_bash.py`) blocks `git add`, `git commit`, and recursive `rm` commands. When automating changes, skip commits and let the user stage/commit manually.
- **Killing processes on Windows**: Use `taskkill //PID <pid> //F` (double-slash flags in bash). Find PIDs with `netstat -ano | grep ":<port>"`.
