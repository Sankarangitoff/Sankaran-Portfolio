# About Section Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the About section into a clean two-column layout (structured content left, equal-height image right) with full-width stat cards in a single horizontal row.

**Architecture:** Modify the existing `About.tsx` component to use flex layout with `items-stretch` instead of CSS grid. Add new data fields (`coreTags`, `highlights`) to the JSON data and TypeScript types. Update the admin form to support editing the new fields.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion

---

### Task 1: Update TypeScript types

**Files:**
- Modify: `src/types/content.ts:35-40`

- [ ] **Step 1: Add `coreTags` and `highlights` to the `About` interface**

In `src/types/content.ts`, replace the existing `About` interface:

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

- [ ] **Step 2: Verify the build still compiles**

Run: `npx tsc --noEmit`
Expected: Errors in `About.tsx` and `AboutForm.tsx` because the new fields aren't provided yet — that's fine, we'll fix them in subsequent tasks. The type file itself should have no syntax errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/content.ts
git commit -m "feat(about): add coreTags and highlights to About type"
```

---

### Task 2: Update data file

**Files:**
- Modify: `data/about.json`

- [ ] **Step 1: Add `coreTags` and `highlights` fields, trim `story` to intro only**

Replace the contents of `data/about.json` with:

```json
{
  "heading": "About Me",
  "story": [
    "I'm a results-driven Software Engineer with experience architecting and optimizing scalable distributed systems for production gaming platforms serving 10,000+ active users."
  ],
  "coreTags": ["Ruby on Rails", "Golang", "REST APIs", "Redis", "AWS", "PostgreSQL"],
  "highlights": [
    "Reduced API response times by **40%** through Redis caching",
    "Improved system reliability by **30%** via Sidekiq optimization",
    "Microservices architecture, payment gateways, fraud detection, CI/CD pipelines",
    "AI-augmented development practices for rapid iteration in agile environments"
  ],
  "quickFacts": [
    { "icon": "⚡", "stat": "40%", "label": "API Speed Boost" },
    { "icon": "🚀", "stat": "10K+", "label": "Users Served" },
    { "icon": "💼", "stat": "15+", "label": "Features Shipped" },
    { "icon": "🎯", "stat": "99.5%", "label": "System Uptime" }
  ],
  "locationBadge": "Based in Coimbatore, India"
}
```

- [ ] **Step 2: Commit**

```bash
git add data/about.json
git commit -m "feat(about): add coreTags and highlights data, trim story to intro"
```

---

### Task 3: Redesign the About component

**Files:**
- Modify: `src/components/sections/About.tsx`

- [ ] **Step 1: Rewrite `About.tsx` with the new layout**

Replace the entire contents of `src/components/sections/About.tsx` with:

```tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import type { About as AboutType, SiteSettings } from '@/types'

interface AboutProps {
  data: AboutType
  settings: SiteSettings
}

function renderHighlight(text: string) {
  // Split on **bold** markers and wrap matched segments in accent-colored spans
  const parts = text.split(/\*\*(.*?)\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-accent font-semibold">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

export default function About({ data, settings }: AboutProps) {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading title={data.heading} />

        {/* Two-column row: content left, image right, equal height */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* LEFT: Structured content */}
          <motion.div
            className="flex-1 flex flex-col min-w-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Intro paragraph */}
            <div className="prose prose-invert prose-lg mb-6">
              {data.story?.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Core Expertise tags */}
            {data.coreTags && data.coreTags.length > 0 && (
              <div className="mb-6">
                <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-3">
                  Core Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.coreTags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-accent/10 border border-accent/20 text-accent-light px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Accent bullet points */}
            {data.highlights && data.highlights.length > 0 && (
              <div className="mb-6 space-y-3">
                {data.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-accent text-sm mt-0.5 flex-shrink-0">▸</span>
                    <span className="text-text-secondary text-sm leading-relaxed">
                      {renderHighlight(highlight)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Location badge — pushed to bottom */}
            <p className="text-text-secondary text-sm mt-auto">
              📍 {data.locationBadge}
            </p>
          </motion.div>

          {/* RIGHT: Profile image — matches content height */}
          {settings.profileImage && (
            <motion.div
              className="lg:w-[40%] flex-shrink-0 flex max-h-[400px] lg:max-h-none"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                className="glass p-2 rounded-2xl relative overflow-hidden group flex-1 flex"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Orange glow effect behind image */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-accent/20 via-transparent to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Image
                  src={settings.profileImage}
                  alt="Profile"
                  width={500}
                  height={500}
                  className="rounded-xl relative z-10 w-full h-full object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Full-width stat cards row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {data.quickFacts?.map((fact, i) => (
            <Card key={i} hover={false} className="text-center p-4">
              <span className="text-2xl mb-2 block">{fact.icon}</span>
              <p className="font-bold text-accent">{fact.stat}</p>
              <p className="text-sm text-text-secondary">{fact.label}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

Key changes from the original:
- Container changed from `grid lg:grid-cols-2` to `flex flex-col lg:flex-row items-stretch` for equal-height columns
- Left column uses `flex flex-col` so the location badge can be pushed to bottom with `mt-auto`
- Right column uses `lg:w-[40%]` with `flex` so the image fills the column height
- Image uses `object-cover` and `h-full` to fill without distortion
- Mobile: image gets `max-h-[400px]` constraint, removed on `lg`
- `quickFacts` cards moved outside both columns into a full-width `grid grid-cols-2 lg:grid-cols-4` row
- New `coreTags` rendered as accent-colored pill badges
- New `highlights` rendered as bullet points with `▸` markers
- `renderHighlight()` helper parses `**bold**` syntax into accent-colored spans

- [ ] **Step 2: Verify the dev server renders correctly**

Run: Open `http://localhost:3002/#about` in the browser.

Check:
1. Content (intro, tags, bullets, location) appears on the left
2. Profile image appears on the right, same height as the content
3. 4 stat cards appear in a single horizontal row below both columns
4. On narrow viewport (<1024px), columns stack vertically

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds with no TypeScript or lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat(about): redesign layout with two-column flex, skill tags, bullet points, full-width stats"
```

---

### Task 4: Update admin form

**Files:**
- Modify: `src/components/admin/forms/AboutForm.tsx`

- [ ] **Step 1: Add `coreTags` and `highlights` editors to the admin form**

Replace the entire contents of `src/components/admin/forms/AboutForm.tsx` with:

```tsx
'use client'

import { useState } from 'react'
import AdminInput from '@/components/admin/ui/AdminInput'
import AdminTextarea from '@/components/admin/ui/AdminTextarea'
import ArrayEditor from '@/components/admin/ui/ArrayEditor'
import type { About, QuickFact } from '@/types'

interface Props {
  initialData: About
}

export default function AboutForm({ initialData }: Props) {
  const [data, setData] = useState<About>(initialData)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setMessage('Saved successfully!')
      else setMessage('Failed to save')
    } catch { setMessage('Error saving') }
    finally { setSaving(false) }
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <AdminInput label="Heading" value={data.heading} onChange={(v) => setData({ ...data, heading: v })} />
        <AdminInput label="Location Badge" value={data.locationBadge} onChange={(v) => setData({ ...data, locationBadge: v })} />

        <ArrayEditor<string>
          label="Story Paragraphs"
          items={data.story || []}
          onChange={(story) => setData({ ...data, story })}
          createItem={() => ''}
          renderItem={(item, _index, onChange) => (
            <AdminTextarea label="Paragraph" value={item} onChange={onChange} rows={3} />
          )}
        />

        <ArrayEditor<string>
          label="Core Expertise Tags"
          items={data.coreTags || []}
          onChange={(coreTags) => setData({ ...data, coreTags })}
          createItem={() => ''}
          renderItem={(item, _index, onChange) => (
            <AdminInput label="Tag" value={item} onChange={onChange} />
          )}
        />

        <ArrayEditor<string>
          label="Highlights (use **text** for accent)"
          items={data.highlights || []}
          onChange={(highlights) => setData({ ...data, highlights })}
          createItem={() => ''}
          renderItem={(item, _index, onChange) => (
            <AdminTextarea label="Highlight" value={item} onChange={onChange} rows={2} />
          )}
        />

        <ArrayEditor<QuickFact>
          label="Quick Facts"
          items={data.quickFacts || []}
          onChange={(quickFacts) => setData({ ...data, quickFacts })}
          createItem={() => ({ icon: '', stat: '', label: '' })}
          renderItem={(item, _index, onChange) => (
            <div>
              <AdminInput label="Icon (emoji)" value={item.icon} onChange={(v) => onChange({ ...item, icon: v })} />
              <AdminInput label="Stat" value={item.stat} onChange={(v) => onChange({ ...item, stat: v })} />
              <AdminInput label="Label" value={item.label} onChange={(v) => onChange({ ...item, label: v })} />
            </div>
          )}
        />
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {message}
        </div>
      )}
      <div className="mt-6">
        <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors text-sm">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
```

Changes from the original:
- Added `ArrayEditor<string>` for `coreTags` with `AdminInput` for each tag
- Added `ArrayEditor<string>` for `highlights` with `AdminTextarea` (2 rows) for each highlight
- Label for highlights includes hint about `**text**` syntax

- [ ] **Step 2: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/admin/forms/AboutForm.tsx
git commit -m "feat(about): add coreTags and highlights editors to admin form"
```

---

### Task 5: Visual verification

**Files:** None (verification only)

- [ ] **Step 1: Check desktop layout at `http://localhost:3002/#about`**

Verify:
1. "About Me" heading centered at top
2. Left column shows: intro paragraph, "CORE EXPERTISE" label with 6 pill tags, 4 bullet points with orange ▸ markers, location badge at bottom
3. Right column shows profile image in glass frame, same height as left content
4. 4 stat cards in a single horizontal row spanning full width below both columns
5. Hover effects work on image (orange glow) and image floats up/down

- [ ] **Step 2: Check mobile layout (resize browser below 1024px)**

Verify:
1. Columns stack vertically: content on top, image below
2. Image has constrained height (doesn't take over viewport)
3. Stat cards display in 2x2 grid

- [ ] **Step 3: Check the admin form at `http://localhost:3002/admin/about`**

Verify:
1. "Core Expertise Tags" section appears with 6 editable tag inputs
2. "Highlights" section appears with 4 editable textarea inputs
3. Saving works without errors

- [ ] **Step 4: Final commit if any tweaks were needed**

```bash
git add -A
git commit -m "fix(about): visual tweaks from verification"
```

Only run this step if tweaks were made. Skip if everything looked correct.
