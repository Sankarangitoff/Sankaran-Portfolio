# About Section Redesign

## Summary

Restructure the About section layout from the current stacked/offset arrangement to a clean side-by-side two-column layout with full-width stat cards. Replace the wall-of-text paragraphs with a structured content format using skill tags and bullet points.

## Current State

- **File:** `src/components/sections/About.tsx`
- **Data:** `data/about.json`
- Two-column grid (`lg:grid-cols-2`), but the image drifts toward center and the stat cards sit in a 2x2 grid under the left column only
- Content is 3 dense paragraphs of prose text

## Design

### Layout Structure

```
┌──────────────────────────────────────────────────────┐
│                     About Me                         │
│                    ──────────                        │
├────────────────────────────┬─────────────────────────┤
│                            │                         │
│  Intro paragraph           │   ┌─────────────────┐   │
│                            │   │                 │   │
│  CORE EXPERTISE            │   │   Profile       │   │
│  [Rails] [Golang] [APIs]   │   │   Image         │   │
│  [Redis] [AWS] [PG]        │   │                 │   │
│                            │   │   (glass frame, │   │
│  ▸ 40% API speed via Redis │   │    same height  │   │
│  ▸ 30% reliability via     │   │    as content)  │   │
│    Sidekiq                 │   │                 │   │
│  ▸ Microservices, payments │   │                 │   │
│  ▸ AI-augmented dev        │   └─────────────────┘   │
│                            │                         │
│  📍 Based in Coimbatore    │                         │
├──────────────────────────────────────────────────────┤
│  ⚡ 40%      │  🚀 10K+     │  💼 15+    │  🎯 99.5% │
│  API Speed   │  Users       │  Features  │  System   │
│  Boost       │  Served      │  Shipped   │  Uptime   │
└──────────────────────────────────────────────────────┘
```

### Two-Column Row (Content + Image)

- **Container:** `flex` with `align-items: stretch` so both columns share the same height
- **Left column (content):** `flex: 1`, contains structured text content
- **Right column (image):** `flex: 0 0 40%`, image fills the column height via the existing glass frame wrapper
- **Gap:** `gap-10` (~40px) between columns
- Remove the fixed `aspect-ratio` on the image — it should stretch to match content height
- The image uses `object-cover` to fill without distortion

### Left Column Content Structure

Replace the current `data.story` paragraphs with three distinct sections:

1. **Intro paragraph** — First paragraph from `data.story[0]`, rendered as standard prose text
2. **Core Expertise tags** — A labeled row of pill-shaped tags for key technologies. New data field `data.coreTags` (array of strings). Styled with accent-colored background/border (`rgba(255,107,0,0.1)` bg, `rgba(255,107,0,0.2)` border, `#FF8533` text), `rounded-full`, small font
3. **Accent bullet points** — Key achievements as scannable list items with orange `▸` markers. New data field `data.highlights` (array of strings). Metrics highlighted in accent color
4. **Location badge** — `data.locationBadge`, pushed to bottom via `mt-auto`

### Full-Width Stat Cards Row

- Move the `quickFacts` cards out of the left column
- Render below both columns spanning the full content width
- Use `grid grid-cols-4 gap-3` for a single horizontal row of 4 cards
- Each card keeps the existing glass card styling (`glass` class, `text-center`)
- **Mobile:** Collapse to `grid-cols-2` on small screens

### Mobile Responsiveness

- On screens below `lg` breakpoint: stack columns vertically (content on top, image below)
- Image gets a max-height constraint on mobile to avoid taking over the viewport
- Stat cards go to `grid-cols-2` on mobile (2x2 grid)

## Data Changes

### `data/about.json` — New fields

Add two new fields alongside existing ones:

```json
{
  "heading": "About Me",
  "story": ["...existing intro paragraph..."],
  "coreTags": ["Ruby on Rails", "Golang", "REST APIs", "Redis", "AWS", "PostgreSQL"],
  "highlights": [
    "Reduced API response times by **40%** through Redis caching",
    "Improved system reliability by **30%** via Sidekiq optimization",
    "Microservices architecture, payment gateways, fraud detection, CI/CD pipelines",
    "AI-augmented development practices for rapid iteration in agile environments"
  ],
  "quickFacts": [...unchanged...],
  "locationBadge": "Based in Coimbatore, India"
}
```

- `story` is trimmed to just the first intro paragraph
- `coreTags`: array of technology/skill strings for the pill tags
- `highlights`: array of achievement strings for the bullet points (supports `**bold**` for accent highlighting)

### TypeScript Types

Update `About` interface in `src/types/content.ts`:

```typescript
export interface About {
  heading: string
  story: string[]
  coreTags: string[]
  highlights: string[]
  quickFacts: QuickFact[]
  locationBadge: string
}
```

## Files to Modify

1. **`src/components/sections/About.tsx`** — Restructure layout, add skill tags, bullet points, move stat cards to full-width row
2. **`data/about.json`** — Add `coreTags` and `highlights` fields, trim `story` to intro only
3. **`src/types/content.ts`** — Add `coreTags` and `highlights` to `About` interface
4. **`src/components/admin/forms/AboutForm.tsx`** — Add form fields for `coreTags` and `highlights` editing

## Animations

- Keep existing Framer Motion `whileInView` animations for both columns
- Keep the floating animation on the profile image (`animate: { y: [0, -8, 0] }`)
- Keep the hover glow effect on the image
- Stat cards can stagger in from bottom as they already do

## What Does Not Change

- Section heading component (`SectionHeading`)
- The glass card UI component
- Color scheme and theme variables
- The overall section padding and max-width container
- The profile image source and configuration
