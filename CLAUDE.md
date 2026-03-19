# CLAUDE.md - Project Context for Claude Code

## Project Overview

This is **Sankaran Portfolio**, a premium portfolio website for a Backend Software Engineer. It's built with Next.js 14, Tailwind CSS, Framer Motion, and Sanity CMS.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables for theming
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + @react-three/drei
- **CMS**: Sanity.io (embedded studio at /studio)
- **Contact Form**: Web3Forms API
- **Testing**: Playwright E2E

## Key Directories

```
src/app/           → Next.js pages (layout.tsx, page.tsx, studio route)
src/components/    → React components (ui/, layout/, sections/, three/)
src/lib/sanity/    → Sanity client, queries, image helper
src/types/         → TypeScript interfaces for CMS content
sanity/schemas/    → Sanity content type schemas
tests/e2e/         → Playwright test files
```

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run test       # Run Playwright tests
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Usually "production"
- `NEXT_PUBLIC_WEB3FORMS_KEY` - Web3Forms access key

## Architecture Notes

### Theming
- Dark mode is default, controlled by `next-themes`
- CSS variables defined in `globals.css` (`:root` for dark, `.light` for light)
- Colors: Black (#0A0A0A) + Orange (#FF6B00) accent

### Content Flow
1. Content managed in Sanity Studio at `/studio`
2. Fetched via GROQ queries in `src/lib/sanity/queries.ts`
3. Page uses `allContentQuery` to fetch all sections at once
4. Demo content shown when Sanity isn't configured

### Components
- UI components in `src/components/ui/` are reusable (Button, Card, Input, etc.)
- Section components in `src/components/sections/` map to page sections
- 3D scene in `src/components/three/` (dynamically imported, SSR disabled)

## Common Tasks

### Adding a new section
1. Create schema in `sanity/schemas/`
2. Add to `sanity/schemas/index.ts`
3. Add TypeScript types in `src/types/index.ts`
4. Add GROQ query in `src/lib/sanity/queries.ts`
5. Create component in `src/components/sections/`
6. Add to `src/app/page.tsx`

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
