# Sankaran Portfolio - Design Specification

**Author:** Claude (AI-assisted)
**Date:** 2025-03-19
**Status:** Draft

---

## Overview

A single-page portfolio website for Sankaran Rajendran, a Backend Software Engineer specializing in Ruby on Rails, Golang, and AWS. The site serves as a powerful alternative to a traditional resume, designed to impress recruiters within 5-10 seconds.

### Goals

1. Showcase technical expertise and real-world impact with quantifiable metrics
2. Provide a premium, Awwwards-level user experience
3. Allow content management via headless CMS without code changes
4. Achieve fast load times and excellent SEO
5. Support dark/light theme toggle

### Non-Goals

- Blog section (not included in v1)
- Command palette navigation
- Animated cursor effects
- Multi-page routing (single-page only)

---

## Technical Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router, SSG) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| 3D Graphics | React Three Fiber + Drei |
| CMS | Sanity.io |
| Contact Form | Web3Forms |
| Testing | Playwright (E2E) |
| Hosting | Vercel (free tier) |

### Project Structure

```
sankaran-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main landing page
│   │   ├── layout.tsx            # Root layout + theme provider
│   │   ├── globals.css           # Global styles
│   │   └── studio/
│   │       └── [[...index]]/
│   │           └── page.tsx      # Sanity Studio
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Achievements.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Resume.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── layout/
│   │   │   ├── Navigation.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   └── SkillTag.tsx
│   │   └── three/
│   │       ├── FloatingShapes.tsx
│   │       └── Scene.tsx
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts         # Sanity client config
│   │   │   ├── queries.ts        # GROQ queries
│   │   │   └── schemas/          # Sanity schemas
│   │   └── utils.ts
│   └── hooks/
│       ├── useScrollSpy.ts
│       └── useTheme.ts
├── sanity/
│   ├── schemas/
│   │   ├── siteSettings.ts
│   │   ├── hero.ts
│   │   ├── about.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   ├── achievements.ts
│   │   └── testimonials.ts
│   └── sanity.config.ts
├── public/
│   ├── images/
│   └── resume.pdf
├── tests/
│   ├── e2e/
│   │   ├── navigation.spec.ts
│   │   ├── sections.spec.ts
│   │   ├── contact-form.spec.ts
│   │   ├── theme-toggle.spec.ts
│   │   └── responsive.spec.ts
│   └── playwright.config.ts
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## Visual Design System

### Color Palette

**Dark Mode (Default):**

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | #0A0A0A | Page background |
| `--bg-surface` | #141414 | Cards, sections |
| `--bg-surface-hover` | #1F1F1F | Elevated states |
| `--border` | #2A2A2A | Subtle dividers |
| `--accent` | #FF6B00 | Primary orange |
| `--accent-light` | #FF8533 | Hover states |
| `--accent-glow` | rgba(255,107,0,0.2) | Glow effects |
| `--text-primary` | #FFFFFF | Main text |
| `--text-secondary` | #A1A1A1 | Muted text |
| `--text-tertiary` | #6B6B6B | Subtle text |

**Light Mode:**

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | #FAFAFA | Page background |
| `--bg-surface` | #FFFFFF | Cards, sections |
| `--border` | #E5E5E5 | Dividers |
| `--accent` | #E55A00 | Darker orange for contrast |
| `--text-primary` | #0A0A0A | Main text |
| `--text-secondary` | #525252 | Muted text |

### Typography

| Element | Font | Weight | Size (Desktop) |
|---------|------|--------|----------------|
| H1 (Hero name) | Inter | 800 | 72px |
| H2 (Section) | Inter | 700 | 48px |
| H3 (Card title) | Inter | 600 | 24px |
| Body | Inter | 400 | 16px |
| Small | Inter | 400 | 14px |
| Code/Tags | JetBrains Mono | 500 | 14px |

### Spacing

- Section padding: 120px (desktop), 80px (tablet), 60px (mobile)
- Card padding: 24px
- Max content width: 1200px
- Gap between cards: 24px

### Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
```

---

## Section Specifications

### 1. Navigation

**Behavior:**
- Fixed at top of viewport
- Transparent on hero, gains glassmorphism background after 100px scroll
- Active section highlighted via scroll spy

**Desktop Layout:**
- Left: Logo/Name "SANKARAN" (clickable, scrolls to top)
- Center/Right: Nav links (About, Skills, Projects, Experience, Achievements, Contact)
- Right: Theme toggle button (sun/moon icon)

**Mobile Layout:**
- Left: Logo/Name
- Right: Hamburger icon
- Opens fullscreen overlay menu with centered links

**Interactions:**
- Nav links: smooth scroll to section
- Hover: orange underline slides in
- Theme toggle: icon rotates/morphs on click

### 2. Hero Section

**Layout:** Full viewport height (100vh)
- Desktop: Split - text left (60%), 3D scene right (40%)
- Mobile: Stacked - 3D (reduced) above, text below

**Content:**
- Greeting: "Hi, I'm" (text-secondary, 18px)
- Name: "SANKARAN" (72px, gradient text with orange glow)
- Title: "AI-Augmented Software Engineer" (typing animation)
- Tagline: "I build performant, reliable, and scalable systems that power real-world applications."
- Profile image: Circular with orange gradient border
- CTA Buttons:
  - "View Projects" (primary, filled orange)
  - "Download Resume" (secondary, outlined)
  - "Contact Me" (ghost button)
- Scroll indicator: Animated chevron at bottom

**3D Scene:**
- Shapes: Torus, sphere, octahedron
- Material: Metallic orange with subtle reflections
- Animation: Slow rotation + gentle float
- Interaction: Subtle parallax following mouse (desktop only)
- Performance: Lazy loaded, low poly count

### 3. About Section

**Layout:** Two columns (image left, text right), stacked on mobile

**Content:**
- Section heading: "About Me"
- Story (rich text from CMS):
  > "I'm a backend engineer who thrives on building systems that handle real pressure. At Techjays, I architect gaming platforms serving 10,000+ concurrent users — where every millisecond matters and downtime isn't an option.
  >
  > My sweet spot? Taking slow, unreliable systems and making them fast and bulletproof. I reduced API response times by 40% through Redis caching, improved system reliability by 30% with smart job processing, and helped migrate critical services from Rails to Go for better performance.
  >
  > I believe the best code is invisible — users just experience things working smoothly. That's what I optimize for."

- Quick Facts (card grid):
  - "1+ Year Building Production Systems"
  - "10,000+ Users Served Daily"
  - "40% Faster APIs Delivered"
  - "High Flyer 2025 Award"

- Location badge: "Based in Coimbatore, India"

**Visual:**
- Profile image with glassmorphism frame
- Floating tech icons around image (optional enhancement)

### 4. Skills Section

**Layout:** Section heading + grid of category cards

**Content:**
- Heading: "Technical Skills"
- Subheading: "Technologies I work with daily"

**Categories:**

| Category | Skills |
|----------|--------|
| Backend Development | Ruby on Rails*, Golang*, Python, Django, REST API Design, GraphQL, Microservices |
| Databases & Caching | PostgreSQL*, Redis*, Query Optimization, Data Migration |
| Cloud & DevOps | AWS*, Docker*, CI/CD Pipelines, Auto Scaling |
| Tools & Practices | Git, GitHub, Sidekiq, Linux, Agile/Scrum, AI-Augmented Development |

*Primary skills (orange accent)

**Visual:**
- Each category in glassmorphism card
- Skills as pill tags
- Primary skills have orange background
- Staggered fade-in animation

### 5. Projects Section

**Layout:** Section heading + 2-column card grid (1 column mobile)

**Project Card Structure:**
- Image/screenshot (top with gradient overlay)
- Title
- "The Challenge:" (problem statement)
- "My Solution:" (approach)
- Tech stack (pill tags)
- Impact metrics (highlighted)
- Links: GitHub, Live Demo (if available)

**Projects:**

**Project 1: Bracketology — Fantasy Gaming Platform**
- Challenge: Build a fantasy gaming backend that handles 10,000+ daily users with real-time scoring, dual-currency transactions, and zero tolerance for downtime during peak events.
- Solution: Architected enterprise-grade Rails + Go backend with Redis caching, Sidekiq job queues, and AWS auto-scaling. Integrated payment gateways and fraud detection for secure transactions.
- Tech: Ruby on Rails, Golang, Redis, Sidekiq, AWS, PostgreSQL
- Impact:
  - 40% faster API response (350ms → 210ms)
  - 85% reduction in fraudulent transactions
  - 99.5% uptime, 3x traffic capacity
  - $50K+ daily transaction volume

**Project 2: SPARKFINCH — Full-Stack Application**
- Challenge: Inherited an unstable application with frequent bugs affecting user experience and slow feature delivery.
- Solution: Systematically resolved 30+ frontend/backend bugs using AI-assisted debugging. Deployed 8 new production features using Django with GenAI-augmented workflows.
- Tech: Python, Django, REST APIs, PostgreSQL, GenAI Tools
- Impact:
  - 45% improvement in stability
  - 35% faster development time
  - 8 features shipped to production

**Interactions:**
- Hover: Card lifts (translateY: -8px), border glows orange
- Image zooms subtly on hover

### 6. Experience Timeline

**Layout:** Vertical timeline with center line (desktop), left-aligned line (mobile)

**Entries:**

| Role | Company | Duration | Key Achievements |
|------|---------|----------|------------------|
| Software Engineer | Techjays | Nov 2024 – Present | Architected 10K+ user platform, 40% latency reduction, Led Rails→Go migration |
| Ruby on Rails Intern | Techjays | Jul – Oct 2024 | Built 20+ API endpoints, resolved 45+ bugs |
| Data Science Intern | Brainovision | Jul – Sep 2023 | Processed 100K+ records, automated data pipelines |
| Software Engineer Intern | Accent Techno Soft | Feb – Jun 2023 | Resolved 25+ issues, learned SDLC |

**Visual:**
- Timeline line with orange gradient
- Nodes as glowing orange dots
- Cards slide in from alternating sides on scroll
- Company logos in cards (if available)

### 7. Achievements Section

**Layout:** Bento grid with mixed card sizes

**Items:**

| Metric | Label | Description | Size |
|--------|-------|-------------|------|
| 40% | Faster APIs | Reduced response time from 350ms to 210ms | Large |
| 30% | Reliability Improvement | Sidekiq optimization for 100K+ daily jobs | Large |
| 10,000+ | Concurrent Users | Production gaming platform at scale | Medium |
| High Flyer 2025 | Best Team Player | Award from Techjays | Medium |
| 85% | Fraud Reduction | SEON integration for secure transactions | Medium |
| 99.5% | Uptime | Zero downtime during 3x traffic spikes | Small |
| $50K+ | Daily Volume | Payment gateway with 99.9% success rate | Small |

**Visual:**
- Large numbers with orange gradient text
- Count-up animation when scrolling into view
- Cards have subtle hover lift

### 8. Testimonials Section

**Layout:** Horizontal carousel (desktop), stacked cards (mobile)

**Card Structure:**
- Large opening quotation mark (decorative, orange)
- Quote text
- Avatar (circular, or initials placeholder)
- Name
- Role @ Company

**Behavior:**
- Auto-rotate every 5 seconds
- Pause on hover
- Navigation dots below
- Left/right arrows on hover

**CMS:**
- Toggle to show/hide entire section
- Add unlimited testimonials
- Reorder via drag-drop

### 9. Resume Section

**Layout:** Centered card with PDF preview

**Content:**
- Heading: "Resume"
- Subheading: "Get the full picture"
- PDF thumbnail/first page preview
- Buttons:
  - "Download PDF" (primary)
  - "Preview" (secondary, opens modal)

**Modal:**
- Embedded PDF viewer
- Close button
- Download button within modal

### 10. Contact Section

**Layout:** Two columns (form left, info right), stacked on mobile

**Form Fields:**
- Name (required)
- Email (required, validated)
- Message (required, textarea)
- Submit button: "Send Message"

**Contact Info:**
- Email: sankarandhina@gmail.com
- Location: Coimbatore, Tamil Nadu, India
- Availability: "Open to opportunities"
- Social Links: GitHub, LinkedIn, Email icons

**Form Behavior:**
- Client-side validation
- Loading state on submit
- Success toast notification
- Error handling with user-friendly messages
- Submits via Web3Forms API

### 11. Footer

**Layout:** Minimal, centered content

**Content:**
- Social icons: GitHub, LinkedIn, Email
- Copyright: "© 2025 Sankaran Rajendran. All rights reserved."
- Tech credit: "Built with Next.js & Tailwind CSS" (optional, CMS toggle)
- Back to top button (appears on scroll)

---

## Animations Specification

### Page Load Sequence

1. Navigation fades in from top (0ms)
2. Hero greeting fades in + slides up (200ms)
3. Hero name fades in + slides up (400ms)
4. Hero title starts typing animation (600ms)
5. Hero tagline fades in (800ms)
6. CTA buttons fade in (1000ms)
7. 3D scene fades in (500ms, parallel)
8. Scroll indicator pulses (1200ms)

### Scroll Animations

| Element | Animation | Trigger |
|---------|-----------|---------|
| Section headings | Fade in + slide up (20px) | 20% visible |
| Cards | Fade in + slide up, staggered 100ms | 20% visible |
| Timeline entries | Slide in from left/right | 20% visible |
| Skill tags | Fade in, staggered 50ms | Parent visible |
| Achievement numbers | Count up from 0 | 50% visible |
| Images | Scale 1.0 → 1.02 | Hover |

### Hover Effects

| Element | Effect | Duration |
|---------|--------|----------|
| Project cards | translateY(-8px) + shadow + border-glow | 200ms |
| Buttons | scale(1.02) + glow | 150ms |
| Skill tags | background lighten | 150ms |
| Social icons | color → orange | 150ms |
| Nav links | underline slides in | 200ms |

### Performance

- Use `transform` and `opacity` only (GPU accelerated)
- Add `will-change` sparingly
- Respect `prefers-reduced-motion`:
  - Disable scroll animations
  - Disable 3D mouse tracking
  - Keep essential transitions only

---

## CMS Schema (Sanity)

### Site Settings (Singleton)

```typescript
{
  name: 'siteSettings',
  type: 'document',
  fields: [
    { name: 'siteName', type: 'string' },
    { name: 'siteDescription', type: 'text' },
    { name: 'profileImage', type: 'image' },
    { name: 'resumePDF', type: 'file' },
    { name: 'email', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'location', type: 'string' },
    { name: 'availability', type: 'string' },
    { name: 'githubUrl', type: 'url' },
    { name: 'linkedinUrl', type: 'url' },
    { name: 'showTestimonials', type: 'boolean' },
    { name: 'showTechCredit', type: 'boolean' }
  ]
}
```

### Hero

```typescript
{
  name: 'hero',
  type: 'document',
  fields: [
    { name: 'greeting', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'tagline', type: 'text' },
    {
      name: 'ctaButtons',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'link', type: 'string' },
          { name: 'style', type: 'string', options: { list: ['primary', 'secondary', 'ghost'] } }
        ]
      }]
    }
  ]
}
```

### About

```typescript
{
  name: 'about',
  type: 'document',
  fields: [
    { name: 'heading', type: 'string' },
    { name: 'story', type: 'array', of: [{ type: 'block' }] },
    {
      name: 'quickFacts',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', type: 'string' },
          { name: 'stat', type: 'string' },
          { name: 'label', type: 'string' }
        ]
      }]
    },
    { name: 'locationBadge', type: 'string' }
  ]
}
```

### Skills

```typescript
{
  name: 'skills',
  type: 'document',
  fields: [
    { name: 'heading', type: 'string' },
    { name: 'subheading', type: 'string' },
    {
      name: 'categories',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string' },
          {
            name: 'skills',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'name', type: 'string' },
                { name: 'isPrimary', type: 'boolean' }
              ]
            }]
          }
        ]
      }]
    }
  ]
}
```

### Projects

```typescript
{
  name: 'projects',
  type: 'document',
  fields: [
    { name: 'heading', type: 'string' },
    { name: 'subheading', type: 'string' },
    {
      name: 'items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'image', type: 'image' },
          { name: 'challenge', type: 'text' },
          { name: 'solution', type: 'text' },
          { name: 'techStack', type: 'array', of: [{ type: 'string' }] },
          {
            name: 'impacts',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'icon', type: 'string' },
                { name: 'metric', type: 'string' },
                { name: 'description', type: 'string' }
              ]
            }]
          },
          { name: 'githubUrl', type: 'url' },
          { name: 'liveUrl', type: 'url' },
          { name: 'order', type: 'number' }
        ]
      }]
    }
  ]
}
```

### Experience

```typescript
{
  name: 'experience',
  type: 'document',
  fields: [
    { name: 'heading', type: 'string' },
    { name: 'subheading', type: 'string' },
    {
      name: 'entries',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'role', type: 'string' },
          { name: 'company', type: 'string' },
          { name: 'companyLogo', type: 'image' },
          { name: 'startDate', type: 'date' },
          { name: 'endDate', type: 'date' },
          { name: 'isPresent', type: 'boolean' },
          { name: 'achievements', type: 'array', of: [{ type: 'string' }] },
          { name: 'order', type: 'number' }
        ]
      }]
    }
  ]
}
```

### Achievements

```typescript
{
  name: 'achievements',
  type: 'document',
  fields: [
    { name: 'heading', type: 'string' },
    { name: 'subheading', type: 'string' },
    {
      name: 'items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', type: 'string' },
          { name: 'metric', type: 'string' },
          { name: 'label', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'size', type: 'string', options: { list: ['small', 'medium', 'large'] } }
        ]
      }]
    }
  ]
}
```

### Testimonials

```typescript
{
  name: 'testimonials',
  type: 'document',
  fields: [
    { name: 'heading', type: 'string' },
    { name: 'subheading', type: 'string' },
    {
      name: 'items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'quote', type: 'text' },
          { name: 'name', type: 'string' },
          { name: 'role', type: 'string' },
          { name: 'company', type: 'string' },
          { name: 'avatar', type: 'image' }
        ]
      }]
    }
  ]
}
```

---

## Testing Strategy (Playwright)

### Test Structure

```
tests/
├── e2e/
│   ├── navigation.spec.ts     # Nav links, scroll behavior, mobile menu
│   ├── sections.spec.ts       # All sections render correctly
│   ├── contact-form.spec.ts   # Form validation, submission
│   ├── theme-toggle.spec.ts   # Dark/light mode switching
│   ├── responsive.spec.ts     # Mobile/tablet/desktop layouts
│   └── accessibility.spec.ts  # a11y checks
└── playwright.config.ts
```

### Test Cases

**Navigation Tests:**
- Nav links scroll to correct sections
- Active section is highlighted in nav
- Mobile menu opens/closes
- Logo scrolls to top
- Nav background changes on scroll

**Section Tests:**
- All sections are visible and contain expected content
- Hero 3D scene loads without errors
- Projects cards display correctly
- Timeline entries render in order
- Achievements count-up animation triggers

**Contact Form Tests:**
- Validation shows errors for empty fields
- Validation shows error for invalid email
- Submit button shows loading state
- Success message appears after submission
- Form resets after successful submission

**Theme Toggle Tests:**
- Default theme is dark
- Toggle switches to light mode
- Theme persists on page reload
- All sections have correct colors in both modes

**Responsive Tests:**
- Mobile: hamburger menu, stacked layouts
- Tablet: adjusted grid columns
- Desktop: full layouts, hover effects

**Accessibility Tests:**
- All images have alt text
- Form inputs have labels
- Color contrast meets WCAG AA
- Keyboard navigation works
- Focus states are visible

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Mobile | < 640px | Single column, stacked layouts, hamburger menu |
| Tablet | 640px - 1024px | 2-column grids, adjusted spacing |
| Desktop | > 1024px | Full layouts, all animations, hover effects |

### Mobile Specific:
- Hero: 3D reduced size, content stacked
- Skills: 2 categories per row
- Projects: Single column
- Timeline: Left-aligned line
- Achievements: 2-column bento
- Testimonials: Stacked cards
- Contact: Info above form
- 3D: Simplified, no mouse tracking

---

## Performance Requirements

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |

### Optimization Strategies:
- Static Site Generation (SSG) for all pages
- Image optimization via Next.js Image component
- Lazy load 3D scene below fold
- Font subsetting (Inter, JetBrains Mono)
- Minimal JavaScript bundle
- Sanity CDN for images

---

## SEO Requirements

- Meta title: "Sankaran Rajendran | Backend Software Engineer"
- Meta description: "Backend Software Engineer specializing in Ruby on Rails, Golang, and AWS. Building scalable systems serving 10,000+ users."
- Open Graph tags for social sharing
- Twitter card meta tags
- Canonical URL
- Sitemap.xml
- robots.txt
- JSON-LD structured data (Person schema)

---

## Deployment

### Vercel Setup:
1. Connect GitHub repository
2. Framework: Next.js (auto-detected)
3. Environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_WEB3FORMS_KEY`
   - `SANITY_API_TOKEN` (for preview)

### Sanity Setup:
1. Create project at sanity.io
2. Install Sanity Studio at /studio route
3. Configure CORS for production domain
4. Set up webhook for on-demand revalidation

---

## Success Criteria

1. **Visual:** Site matches design spec, looks premium on all devices
2. **Performance:** Lighthouse score > 90
3. **Functionality:** All sections work, form submits, theme toggles
4. **CMS:** All content editable via Sanity Studio
5. **Testing:** All Playwright tests pass
6. **Accessibility:** WCAG AA compliant
7. **SEO:** Proper meta tags, structured data

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "tailwindcss": "^3.x",
    "framer-motion": "^11.x",
    "@react-three/fiber": "^8.x",
    "@react-three/drei": "^9.x",
    "three": "^0.160.x",
    "next-sanity": "^7.x",
    "@sanity/image-url": "^1.x",
    "next-themes": "^0.x"
  },
  "devDependencies": {
    "@playwright/test": "^1.x",
    "typescript": "^5.x",
    "@types/react": "^18.x",
    "@types/node": "^20.x",
    "sanity": "^3.x"
  }
}
```

---

## Appendix: Content for Initial Setup

### Hero Default Content
- Greeting: "Hi, I'm"
- Name: "SANKARAN"
- Title: "AI-Augmented Software Engineer"
- Tagline: "I build performant, reliable, and scalable systems that power real-world applications."

### Contact Information
- Email: sankarandhina@gmail.com
- Phone: 9677797357
- Location: Coimbatore, Tamil Nadu, India
- GitHub: (to be provided)
- LinkedIn: linkedin.com/in/sankaran-rajendran

---

*End of Specification*
