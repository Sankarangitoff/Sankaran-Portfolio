# Sankaran Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium single-page portfolio website with Sanity CMS, 3D graphics, and dark/light theme support.

**Architecture:** Next.js 14 App Router with SSG, Sanity headless CMS for content, React Three Fiber for 3D hero scene, Framer Motion for animations, Tailwind CSS for styling, Playwright for E2E testing.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, Sanity.io, Web3Forms, Playwright

---

## File Structure Overview

```
src/
├── app/
│   ├── page.tsx                    # Main landing page (assembles all sections)
│   ├── layout.tsx                  # Root layout + providers
│   ├── globals.css                 # Global styles + CSS variables
│   └── studio/[[...index]]/page.tsx # Sanity Studio
├── components/
│   ├── sections/                   # Page sections
│   ├── layout/                     # Nav, Footer, ThemeToggle
│   ├── ui/                         # Reusable UI components
│   └── three/                      # 3D components
├── lib/
│   ├── sanity/                     # Sanity client + queries
│   └── utils.ts                    # Utility functions
├── hooks/                          # Custom React hooks
└── types/                          # TypeScript types
sanity/
├── schemas/                        # CMS schemas
└── sanity.config.ts
tests/e2e/                          # Playwright tests
```

---

## Phase 1: Project Setup

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`

- [ ] **Step 1: Create Next.js app with TypeScript and Tailwind**

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

- [ ] **Step 2: Verify project runs**

```bash
npm run dev
```
Expected: App runs at http://localhost:3000

- [ ] **Step 3: Commit initial setup**

```bash
git add -A && git commit -m "chore: initialize Next.js 14 with TypeScript and Tailwind"
```

---

### Task 2: Install Core Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install animation and 3D libraries**

```bash
npm install framer-motion @react-three/fiber @react-three/drei three
npm install -D @types/three
```

- [ ] **Step 2: Install Sanity dependencies**

```bash
npm install next-sanity @sanity/image-url @portabletext/react
npm install -D sanity @sanity/vision
```

- [ ] **Step 3: Install theme and utility dependencies**

```bash
npm install next-themes clsx tailwind-merge
```

- [ ] **Step 4: Install Playwright**

```bash
npm install -D @playwright/test
npx playwright install
```

- [ ] **Step 5: Commit dependencies**

```bash
git add package.json package-lock.json && git commit -m "chore: add project dependencies"
```

---

### Task 3: Configure Tailwind Theme

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update tailwind.config.ts with custom theme**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-primary)',
        surface: 'var(--bg-surface)',
        'surface-hover': 'var(--bg-surface-hover)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Add CSS variables to globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-primary: #0A0A0A;
    --bg-surface: #141414;
    --bg-surface-hover: #1F1F1F;
    --border: #2A2A2A;
    --accent: #FF6B00;
    --accent-light: #FF8533;
    --accent-glow: rgba(255, 107, 0, 0.2);
    --text-primary: #FFFFFF;
    --text-secondary: #A1A1A1;
    --text-tertiary: #6B6B6B;
  }

  .light {
    --bg-primary: #FAFAFA;
    --bg-surface: #FFFFFF;
    --bg-surface-hover: #F5F5F5;
    --border: #E5E5E5;
    --accent: #E55A00;
    --accent-light: #FF6B00;
    --text-primary: #0A0A0A;
    --text-secondary: #525252;
    --text-tertiary: #737373;
  }

  body {
    @apply bg-background text-text-primary;
  }
}

@layer components {
  .glass {
    @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl;
  }

  .light .glass {
    @apply bg-black/5 border-black/10;
  }
}
```

- [ ] **Step 3: Commit theme configuration**

```bash
git add tailwind.config.ts src/app/globals.css && git commit -m "feat: configure Tailwind theme with dark/light mode colors"
```

---

### Task 4: Create Utility Functions

**Files:**
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create cn utility for class merging**

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Commit utility**

```bash
git add src/lib/utils.ts && git commit -m "feat: add cn utility for class merging"
```

---

### Task 5: Create TypeScript Types

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Define content types**

```typescript
export interface SiteSettings {
  siteName: string
  siteDescription: string
  profileImage?: SanityImage
  resumePDF?: SanityFile
  email: string
  phone?: string
  location: string
  availability: string
  githubUrl?: string
  linkedinUrl?: string
  showTestimonials: boolean
  showTechCredit: boolean
}

export interface Hero {
  greeting: string
  name: string
  title: string
  tagline: string
  ctaButtons: CTAButton[]
}

export interface CTAButton {
  label: string
  link: string
  style: 'primary' | 'secondary' | 'ghost'
}

export interface About {
  heading: string
  story: PortableTextBlock[]
  quickFacts: QuickFact[]
  locationBadge: string
}

export interface QuickFact {
  icon: string
  stat: string
  label: string
}

export interface Skills {
  heading: string
  subheading: string
  categories: SkillCategory[]
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface Skill {
  name: string
  isPrimary: boolean
}

export interface Projects {
  heading: string
  subheading: string
  items: Project[]
}

export interface Project {
  title: string
  image?: SanityImage
  challenge: string
  solution: string
  techStack: string[]
  impacts: Impact[]
  githubUrl?: string
  liveUrl?: string
  order: number
}

export interface Impact {
  icon: string
  metric: string
  description: string
}

export interface Experience {
  heading: string
  subheading?: string
  entries: ExperienceEntry[]
}

export interface ExperienceEntry {
  role: string
  company: string
  companyLogo?: SanityImage
  startDate: string
  endDate?: string
  isPresent: boolean
  achievements: string[]
  order: number
}

export interface Achievements {
  heading: string
  subheading: string
  items: Achievement[]
}

export interface Achievement {
  icon: string
  metric: string
  label: string
  description: string
  size: 'small' | 'medium' | 'large'
}

export interface Testimonials {
  heading: string
  subheading: string
  items: Testimonial[]
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  avatar?: SanityImage
}

// Sanity types
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface PortableTextBlock {
  _type: 'block'
  _key: string
  children: { text: string }[]
  style?: string
}
```

- [ ] **Step 2: Commit types**

```bash
git add src/types/index.ts && git commit -m "feat: add TypeScript type definitions"
```

---

## Phase 2: Sanity CMS Setup

### Task 6: Initialize Sanity Configuration

**Files:**
- Create: `sanity.config.ts`
- Create: `sanity.cli.ts`
- Create: `src/lib/sanity/client.ts`
- Create: `src/lib/sanity/image.ts`

- [ ] **Step 1: Create sanity.config.ts in project root**

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Sankaran Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})
```

- [ ] **Step 2: Create sanity.cli.ts**

```typescript
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})
```

- [ ] **Step 3: Create Sanity client**

```typescript
// src/lib/sanity/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})
```

- [ ] **Step 4: Create image URL builder**

```typescript
// src/lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImage } from '@/types'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}
```

- [ ] **Step 5: Create .env.local template**

```bash
echo "NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_WEB3FORMS_KEY=your-web3forms-key" > .env.local.example
```

- [ ] **Step 6: Commit Sanity configuration**

```bash
git add sanity.config.ts sanity.cli.ts src/lib/sanity/ .env.local.example && git commit -m "feat: configure Sanity CMS client"
```

---

### Task 7: Create Sanity Schemas

**Files:**
- Create: `sanity/schemas/index.ts`
- Create: `sanity/schemas/siteSettings.ts`
- Create: `sanity/schemas/hero.ts`
- Create: `sanity/schemas/about.ts`
- Create: `sanity/schemas/skills.ts`
- Create: `sanity/schemas/projects.ts`
- Create: `sanity/schemas/experience.ts`
- Create: `sanity/schemas/achievements.ts`
- Create: `sanity/schemas/testimonials.ts`

- [ ] **Step 1: Create siteSettings schema**

```typescript
// sanity/schemas/siteSettings.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'siteDescription', title: 'Site Description', type: 'text' }),
    defineField({ name: 'profileImage', title: 'Profile Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'resumePDF', title: 'Resume PDF', type: 'file' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'availability', title: 'Availability', type: 'string' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'showTestimonials', title: 'Show Testimonials', type: 'boolean', initialValue: true }),
    defineField({ name: 'showTechCredit', title: 'Show Tech Credit', type: 'boolean', initialValue: true }),
  ],
})
```

- [ ] **Step 2: Create hero schema**

```typescript
// sanity/schemas/hero.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'greeting', title: 'Greeting', type: 'string', initialValue: "Hi, I'm" }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'text' }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'link', title: 'Link', type: 'string' }),
          defineField({
            name: 'style',
            title: 'Style',
            type: 'string',
            options: { list: ['primary', 'secondary', 'ghost'] },
          }),
        ],
      }],
    }),
  ],
})
```

- [ ] **Step 3: Create remaining schemas (about, skills, projects, experience, achievements, testimonials)**

```typescript
// sanity/schemas/about.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'About Me' }),
    defineField({ name: 'story', title: 'Story', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'quickFacts',
      title: 'Quick Facts',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
          defineField({ name: 'stat', title: 'Stat', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'locationBadge', title: 'Location Badge', type: 'string' }),
  ],
})
```

```typescript
// sanity/schemas/skills.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skills',
  title: 'Skills Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Technical Skills' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Category Name', type: 'string' }),
          defineField({
            name: 'skills',
            title: 'Skills',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'name', title: 'Skill Name', type: 'string' }),
                defineField({ name: 'isPrimary', title: 'Is Primary', type: 'boolean', initialValue: false }),
              ],
            }],
          }),
        ],
      }],
    }),
  ],
})
```

```typescript
// sanity/schemas/projects.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'projects',
  title: 'Projects Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Featured Projects' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Projects',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'challenge', title: 'Challenge', type: 'text' }),
          defineField({ name: 'solution', title: 'Solution', type: 'text' }),
          defineField({ name: 'techStack', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] }),
          defineField({
            name: 'impacts',
            title: 'Impacts',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'icon', title: 'Icon', type: 'string' }),
                defineField({ name: 'metric', title: 'Metric', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'string' }),
              ],
            }],
          }),
          defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
          defineField({ name: 'liveUrl', title: 'Live URL', type: 'url' }),
          defineField({ name: 'order', title: 'Order', type: 'number' }),
        ],
      }],
    }),
  ],
})
```

```typescript
// sanity/schemas/experience.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Experience' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'entries',
      title: 'Entries',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'role', title: 'Role', type: 'string' }),
          defineField({ name: 'company', title: 'Company', type: 'string' }),
          defineField({ name: 'companyLogo', title: 'Company Logo', type: 'image' }),
          defineField({ name: 'startDate', title: 'Start Date', type: 'date' }),
          defineField({ name: 'endDate', title: 'End Date', type: 'date' }),
          defineField({ name: 'isPresent', title: 'Currently Working', type: 'boolean', initialValue: false }),
          defineField({ name: 'achievements', title: 'Achievements', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'order', title: 'Order', type: 'number' }),
        ],
      }],
    }),
  ],
})
```

```typescript
// sanity/schemas/achievements.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'achievements',
  title: 'Achievements Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Achievements & Highlights' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          defineField({ name: 'metric', title: 'Metric', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'string' }),
          defineField({
            name: 'size',
            title: 'Card Size',
            type: 'string',
            options: { list: ['small', 'medium', 'large'] },
            initialValue: 'medium',
          }),
        ],
      }],
    }),
  ],
})
```

```typescript
// sanity/schemas/testimonials.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Testimonials Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'What People Say' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'quote', title: 'Quote', type: 'text' }),
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'role', title: 'Role', type: 'string' }),
          defineField({ name: 'company', title: 'Company', type: 'string' }),
          defineField({ name: 'avatar', title: 'Avatar', type: 'image' }),
        ],
      }],
    }),
  ],
})
```

- [ ] **Step 4: Create schema index**

```typescript
// sanity/schemas/index.ts
import siteSettings from './siteSettings'
import hero from './hero'
import about from './about'
import skills from './skills'
import projects from './projects'
import experience from './experience'
import achievements from './achievements'
import testimonials from './testimonials'

export const schemaTypes = [
  siteSettings,
  hero,
  about,
  skills,
  projects,
  experience,
  achievements,
  testimonials,
]
```

- [ ] **Step 5: Commit schemas**

```bash
git add sanity/schemas/ && git commit -m "feat: add Sanity CMS schemas for all content types"
```

---

### Task 8: Create Sanity Studio Route

**Files:**
- Create: `src/app/studio/[[...index]]/page.tsx`

- [ ] **Step 1: Create studio page**

```typescript
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 2: Commit studio route**

```bash
git add src/app/studio/ && git commit -m "feat: add Sanity Studio route at /studio"
```

---

### Task 9: Create Sanity Queries

**Files:**
- Create: `src/lib/sanity/queries.ts`

- [ ] **Step 1: Create GROQ queries**

```typescript
import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`

export const heroQuery = groq`*[_type == "hero"][0]`

export const aboutQuery = groq`*[_type == "about"][0]`

export const skillsQuery = groq`*[_type == "skills"][0]`

export const projectsQuery = groq`*[_type == "projects"][0]{
  heading,
  subheading,
  "items": items[] | order(order asc)
}`

export const experienceQuery = groq`*[_type == "experience"][0]{
  heading,
  subheading,
  "entries": entries[] | order(order asc)
}`

export const achievementsQuery = groq`*[_type == "achievements"][0]`

export const testimonialsQuery = groq`*[_type == "testimonials"][0]`

export const allContentQuery = groq`{
  "siteSettings": *[_type == "siteSettings"][0],
  "hero": *[_type == "hero"][0],
  "about": *[_type == "about"][0],
  "skills": *[_type == "skills"][0],
  "projects": *[_type == "projects"][0]{ heading, subheading, "items": items[] | order(order asc) },
  "experience": *[_type == "experience"][0]{ heading, subheading, "entries": entries[] | order(order asc) },
  "achievements": *[_type == "achievements"][0],
  "testimonials": *[_type == "testimonials"][0]
}`
```

- [ ] **Step 2: Commit queries**

```bash
git add src/lib/sanity/queries.ts && git commit -m "feat: add Sanity GROQ queries"
```

---

## Phase 3: UI Components

### Task 10: Create Button Component

**Files:**
- Create: `src/components/ui/Button.tsx`

- [ ] **Step 1: Create Button component**

```typescript
'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-accent text-white hover:bg-accent-light shadow-lg shadow-accent/20 hover:shadow-accent/40',
      secondary: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
      ghost: 'text-text-secondary hover:text-accent hover:bg-surface',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const Component = href ? 'a' : motion.button

    return (
      <Component
        ref={ref as any}
        href={href}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export default Button
```

- [ ] **Step 2: Commit Button**

```bash
git add src/components/ui/Button.tsx && git commit -m "feat: add Button component with variants"
```

---

### Task 11: Create Card Component

**Files:**
- Create: `src/components/ui/Card.tsx`

- [ ] **Step 1: Create Card component**

```typescript
'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'glass p-6',
          hover && 'hover:border-accent/50 transition-colors duration-200',
          className
        )}
        whileHover={hover ? { y: -8, boxShadow: '0 20px 40px rgba(255, 107, 0, 0.1)' } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card
```

- [ ] **Step 2: Commit Card**

```bash
git add src/components/ui/Card.tsx && git commit -m "feat: add Card component with glassmorphism"
```

---

### Task 12: Create SectionHeading Component

**Files:**
- Create: `src/components/ui/SectionHeading.tsx`

- [ ] **Step 1: Create SectionHeading component**

```typescript
'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <motion.div
      className={cn('text-center mb-16', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit SectionHeading**

```bash
git add src/components/ui/SectionHeading.tsx && git commit -m "feat: add SectionHeading component"
```

---

### Task 13: Create SkillTag Component

**Files:**
- Create: `src/components/ui/SkillTag.tsx`

- [ ] **Step 1: Create SkillTag component**

```typescript
'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SkillTagProps {
  name: string
  isPrimary?: boolean
}

export default function SkillTag({ name, isPrimary = false }: SkillTagProps) {
  return (
    <motion.span
      className={cn(
        'inline-block px-3 py-1.5 rounded-full text-sm font-mono transition-colors duration-150',
        isPrimary
          ? 'bg-accent text-white'
          : 'bg-surface text-text-secondary hover:bg-surface-hover'
      )}
      whileHover={{ scale: 1.05 }}
    >
      {name}
    </motion.span>
  )
}
```

- [ ] **Step 2: Commit SkillTag**

```bash
git add src/components/ui/SkillTag.tsx && git commit -m "feat: add SkillTag component"
```

---

### Task 14: Create Input Component

**Files:**
- Create: `src/components/ui/Input.tsx`

- [ ] **Step 1: Create Input component**

```typescript
'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 bg-surface border border-border rounded-lg',
            'text-text-primary placeholder:text-text-tertiary',
            'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
            'transition-colors duration-200',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
```

- [ ] **Step 2: Create Textarea component**

```typescript
// Add to same file or create src/components/ui/Textarea.tsx
'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-3 bg-surface border border-border rounded-lg',
            'text-text-primary placeholder:text-text-tertiary',
            'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
            'transition-colors duration-200 resize-none',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
export default Input
```

- [ ] **Step 3: Commit Input components**

```bash
git add src/components/ui/Input.tsx && git commit -m "feat: add Input and Textarea components"
```

---

## Phase 4: Layout Components

### Task 15: Create ThemeToggle Component

**Files:**
- Create: `src/components/layout/ThemeToggle.tsx`
- Create: `src/components/providers/ThemeProvider.tsx`

- [ ] **Step 1: Create ThemeProvider**

```typescript
// src/components/providers/ThemeProvider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  )
}
```

- [ ] **Step 2: Create ThemeToggle**

```typescript
// src/components/layout/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-10 h-10" />

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center hover:bg-surface-hover transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  )
}
```

- [ ] **Step 3: Commit theme components**

```bash
git add src/components/providers/ src/components/layout/ThemeToggle.tsx && git commit -m "feat: add theme toggle with dark/light mode support"
```

---

### Task 16: Create Navigation Component

**Files:**
- Create: `src/components/layout/Navigation.tsx`
- Create: `src/components/layout/MobileMenu.tsx`
- Create: `src/hooks/useScrollSpy.ts`

- [ ] **Step 1: Create useScrollSpy hook**

```typescript
// src/hooks/useScrollSpy.ts
'use client'

import { useState, useEffect } from 'react'

const sections = ['about', 'skills', 'projects', 'experience', 'achievements', 'contact']

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)

      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { activeSection, scrolled }
}
```

- [ ] **Step 2: Create MobileMenu**

```typescript
// src/components/layout/MobileMenu.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 md:hidden"
        >
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={onClose} />
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute right-0 top-0 bottom-0 w-64 bg-surface p-6 flex flex-col"
          >
            <div className="flex justify-end mb-8">
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-4 flex-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className={`block py-2 text-lg transition-colors ${
                      activeSection === item.href.slice(1)
                        ? 'text-accent'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-border">
              <ThemeToggle />
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: Create Navigation**

```typescript
// src/components/layout/Navigation.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const { activeSection, scrolled } = useScrollSpy()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'glass py-4' : 'py-6'
        )}
      >
        <nav className="max-w-content mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-accent">
            SANKARAN
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'relative py-2 text-sm transition-colors',
                    activeSection === item.href.slice(1)
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-text-secondary hover:text-text-primary"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  )
}
```

- [ ] **Step 4: Commit navigation components**

```bash
git add src/components/layout/Navigation.tsx src/components/layout/MobileMenu.tsx src/hooks/useScrollSpy.ts && git commit -m "feat: add Navigation with scroll spy and mobile menu"
```

---

### Task 17: Create Footer Component

**Files:**
- Create: `src/components/sections/Footer.tsx`

- [ ] **Step 1: Create Footer**

```typescript
'use client'

import { motion } from 'framer-motion'
import type { SiteSettings } from '@/types'

interface FooterProps {
  settings: SiteSettings
}

export default function Footer({ settings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-content mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex gap-6">
            {settings.githubUrl && (
              <a
                href={settings.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {settings.linkedinUrl && (
              <a
                href={settings.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            <a
              href={`mailto:${settings.email}`}
              className="text-text-secondary hover:text-accent transition-colors"
              aria-label="Email"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-text-tertiary text-sm">
            © {new Date().getFullYear()} Sankaran Rajendran. All rights reserved.
          </p>

          {/* Tech Credit */}
          {settings.showTechCredit && (
            <p className="text-text-tertiary text-xs">
              Built with Next.js & Tailwind CSS
            </p>
          )}

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="mt-4 text-text-secondary hover:text-accent transition-colors"
            whileHover={{ y: -2 }}
            aria-label="Back to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit Footer**

```bash
git add src/components/sections/Footer.tsx && git commit -m "feat: add Footer component"
```

---

## Phase 5: Section Components

### Task 18: Create Hero Section with 3D Scene

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/three/FloatingShapes.tsx`
- Create: `src/components/three/Scene.tsx`

- [ ] **Step 1: Create FloatingShapes component**

```typescript
// src/components/three/FloatingShapes.tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function FloatingShapes() {
  const torusRef = useRef<THREE.Mesh>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const octaRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (torusRef.current) torusRef.current.rotation.y = t * 0.1
    if (sphereRef.current) sphereRef.current.rotation.x = t * 0.15
    if (octaRef.current) octaRef.current.rotation.z = t * 0.12
  })

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={torusRef} position={[2, 0, 0]}>
          <torusGeometry args={[1, 0.4, 16, 32]} />
          <MeshDistortMaterial color="#FF6B00" metalness={0.8} roughness={0.2} distort={0.2} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={sphereRef} position={[-1, 1.5, -1]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial color="#FF8533" metalness={0.9} roughness={0.1} distort={0.3} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh ref={octaRef} position={[0, -1, 1]}>
          <octahedronGeometry args={[0.6]} />
          <MeshDistortMaterial color="#FF6B00" metalness={0.7} roughness={0.3} distort={0.15} />
        </mesh>
      </Float>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </>
  )
}
```

- [ ] **Step 2: Create Scene wrapper with Suspense fallback**

```typescript
// src/components/three/Scene.tsx
'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import FloatingShapes from './FloatingShapes'

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <FloatingShapes />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 3: Create Hero section with typing animation**

```typescript
// src/components/sections/Hero.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'
import type { Hero as HeroType, SiteSettings } from '@/types'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })

interface HeroProps {
  data: HeroType
  settings: SiteSettings
}

export default function Hero({ data, settings }: HeroProps) {
  const [displayText, setDisplayText] = useState('')
  const fullText = data.title

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [fullText])

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <Scene />
      <div className="max-w-content mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-text-secondary mb-2">{data.greeting}</p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
            {data.name}
          </h1>
          <p className="text-2xl md:text-3xl text-text-secondary mb-4 h-10">
            {displayText}<span className="animate-pulse">|</span>
          </p>
          <p className="text-lg text-text-secondary mb-8 max-w-lg">{data.tagline}</p>
          <div className="flex flex-wrap gap-4">
            {data.ctaButtons?.map((btn, i) => (
              <Button key={i} variant={btn.style} href={btn.link}>{btn.label}</Button>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg className="w-6 h-6 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Commit Hero and 3D components**

```bash
git add src/components/sections/Hero.tsx src/components/three/ && git commit -m "feat: add Hero section with 3D floating shapes and typing animation"
```

---

### Task 19: Create About Section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create About component**

```typescript
'use client'

import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import { urlFor } from '@/lib/sanity/image'
import type { About as AboutType, SiteSettings } from '@/types'

interface AboutProps {
  data: AboutType
  settings: SiteSettings
}

export default function About({ data, settings }: AboutProps) {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading title={data.heading} />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {settings.profileImage && (
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass p-2 rounded-2xl inline-block">
                <Image
                  src={urlFor(settings.profileImage).width(400).height(400).url()}
                  alt="Profile"
                  width={400}
                  height={400}
                  className="rounded-xl"
                />
              </div>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="prose prose-invert prose-lg mb-8">
              <PortableText value={data.story} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {data.quickFacts?.map((fact, i) => (
                <Card key={i} hover={false} className="text-center p-4">
                  <span className="text-2xl mb-2 block">{fact.icon}</span>
                  <p className="font-bold text-accent">{fact.stat}</p>
                  <p className="text-sm text-text-secondary">{fact.label}</p>
                </Card>
              ))}
            </div>
            <p className="text-text-secondary">📍 {data.locationBadge}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit About**

```bash
git add src/components/sections/About.tsx && git commit -m "feat: add About section"
```

---

### Task 20: Create Skills Section

**Files:**
- Create: `src/components/sections/Skills.tsx`

- [ ] **Step 1: Create Skills component**

```typescript
'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import SkillTag from '@/components/ui/SkillTag'
import type { Skills as SkillsType } from '@/types'

interface SkillsProps {
  data: SkillsType
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="py-24 md:py-32 bg-surface/50">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading title={data.heading} subtitle={data.subheading} />
        <div className="grid md:grid-cols-2 gap-6">
          {data.categories?.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills?.map((skill, j) => (
                    <SkillTag key={j} name={skill.name} isPrimary={skill.isPrimary} />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit Skills**

```bash
git add src/components/sections/Skills.tsx && git commit -m "feat: add Skills section"
```

---

### Task 21: Create Projects Section

**Files:**
- Create: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Create Projects component**

```typescript
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import SkillTag from '@/components/ui/SkillTag'
import { urlFor } from '@/lib/sanity/image'
import type { Projects as ProjectsType } from '@/types'

interface ProjectsProps {
  data: ProjectsType
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-content mx-auto px-6">
        <SectionHeading title={data.heading} subtitle={data.subheading} />
        <div className="grid lg:grid-cols-2 gap-8">
          {data.items?.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="overflow-hidden">
                {project.image && (
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                    <Image
                      src={urlFor(project.image).width(600).height(300).url()}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-text-secondary text-sm mb-2"><strong>Challenge:</strong> {project.challenge}</p>
                <p className="text-text-secondary text-sm mb-4"><strong>Solution:</strong> {project.solution}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.map((tech, j) => (
                    <SkillTag key={j} name={tech} />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {project.impacts?.map((impact, j) => (
                    <div key={j} className="text-center p-2 bg-surface rounded-lg">
                      <span className="text-lg">{impact.icon}</span>
                      <p className="text-accent font-bold">{impact.metric}</p>
                      <p className="text-xs text-text-tertiary">{impact.description}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent">GitHub →</a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent">Live Demo →</a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit Projects**

```bash
git add src/components/sections/Projects.tsx && git commit -m "feat: add Projects section"
```

---

### Task 22-27: Create Remaining Sections

*Following the same pattern, create:*

- `src/components/sections/Experience.tsx` - Vertical timeline with alternating cards
- `src/components/sections/Achievements.tsx` - Bento grid with count-up animation
- `src/components/sections/Testimonials.tsx` - Carousel with auto-rotate
- `src/components/sections/Resume.tsx` - PDF download/preview with modal
- `src/components/sections/Contact.tsx` - Form with Web3Forms integration

Each follows the established pattern:
1. Import types and UI components
2. Use Framer Motion for scroll animations
3. Follow spec layout requirements
4. Commit after creation

---

## Phase 6: Integration & Testing

### Task 28: Create Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update layout with providers**

```typescript
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import ThemeProvider from '@/components/providers/ThemeProvider'
import Navigation from '@/components/layout/Navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Sankaran Rajendran | Backend Software Engineer',
  description: 'Backend Software Engineer specializing in Ruby on Rails, Golang, and AWS. Building scalable systems serving 10,000+ users.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

### Task 29: Create Main Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create page that fetches content and renders sections**

```typescript
import { client } from '@/lib/sanity/client'
import { allContentQuery } from '@/lib/sanity/queries'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Achievements from '@/components/sections/Achievements'
import Testimonials from '@/components/sections/Testimonials'
import Resume from '@/components/sections/Resume'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export const revalidate = 60

export default async function Home() {
  const content = await client.fetch(allContentQuery)

  return (
    <>
      <Hero data={content.hero} settings={content.siteSettings} />
      <About data={content.about} settings={content.siteSettings} />
      <Skills data={content.skills} />
      <Projects data={content.projects} />
      <Experience data={content.experience} />
      <Achievements data={content.achievements} />
      {content.siteSettings?.showTestimonials && (
        <Testimonials data={content.testimonials} />
      )}
      <Resume settings={content.siteSettings} />
      <Contact settings={content.siteSettings} />
      <Footer settings={content.siteSettings} />
    </>
  )
}
```

---

### Task 30-34: Playwright Tests

**Files to create:**
- `tests/e2e/navigation.spec.ts`
- `tests/e2e/sections.spec.ts`
- `tests/e2e/contact-form.spec.ts`
- `tests/e2e/theme-toggle.spec.ts`
- `tests/e2e/responsive.spec.ts`
- `playwright.config.ts`

---

### Task 35: Final Setup & Documentation

- [ ] Create `.env.local` with actual values
- [ ] Run `npm run build` to verify production build
- [ ] Run `npx playwright test` to verify tests pass
- [ ] Deploy to Vercel
- [ ] Configure Sanity CORS and webhooks
- [ ] Populate initial content via Sanity Studio

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-5 | Project setup, dependencies, theme |
| 2 | 6-9 | Sanity CMS schemas and queries |
| 3 | 10-14 | UI components |
| 4 | 15-17 | Layout components |
| 5 | 18-27 | Section components + 3D |
| 6 | 28-35 | Integration, tests, deployment |

---

*End of Implementation Plan*
