# About Section Video Integration — Design Spec

**Date:** 2026-04-24
**Status:** Approved

## Summary

Add an AI-generated intro video to the About Me section, filling the currently empty right column. The video shows Sankaran typing at a desk, then turning to wave at the viewer. It plays once when scrolled into view, freezing on the wave pose as a natural resting state.

## Layout

Current About section uses `lg:grid-cols-2` with text on the left. The right column is empty because `siteSettings.profileImage` is not set, so the `<Image>` block doesn't render.

**New layout (desktop `lg+`):**

```
|  Text + Quick Facts (LEFT)  |  Video (RIGHT)  |
```

- Text content (story, quick facts, location) stays in the left column — no changes
- Video occupies the right column with the same glass card wrapper the profile image would use
- The grid column order is swapped from current code: text first (left), then media (right)

**Mobile/tablet (below `lg`):**

- Video stacks above the text content, full width
- Capped at `max-h-[400px]` to prevent oversized video on small screens

## Video Composition

The video itself has the person positioned on the **right third of the frame** with empty/dark space on the left. This means when placed in the right column, the person appears on the far right of the About section, naturally facing left toward the text content.

**Google Veo (Flow) prompt:**

> Cinematic medium shot, subject positioned on the right third of the frame, left two-thirds as clean empty negative space. Same person exactly as shown in the start frame — preserve his face, features, hair, and skin tone precisely throughout. A young professional in a casual dark hoodie sits at a minimalist desk in a dimly lit home office, shown in 3/4 profile angled toward the laptop on his right. He types focused for about 3 seconds, fingers moving naturally on the keyboard. Then he pauses, slowly turns his head toward the camera on his left, breaking into a warm genuine smile, and gives a relaxed casual wave with his right hand near shoulder height. Subtle orange accent lighting — a soft warm glow from a small desk lamp and a faint rim light on his hair and shoulder. Dark charcoal walls, black desk, muted bokeh in the background. Shot on 35mm lens, shallow depth of field, 24fps, photoreal, realistic skin texture and pores, natural eye movement, no stylization. Static camera. Left half of the frame intentionally empty.

**Duration:** 5-8 seconds
**Upload your photo as the "Start" frame** for face preservation.

## File Storage

- Video file: `public/videos/about-intro.mp4`
- Poster image (first frame or still photo): `public/videos/about-intro-poster.jpg`
- Both are static assets served directly by Next.js

## Data Model Changes

### `src/types/content.ts` — SiteSettings interface

Add two optional fields:

```typescript
export interface SiteSettings {
  // ... existing fields ...
  aboutVideo?: string       // e.g. "/videos/about-intro.mp4"
  aboutVideoPoster?: string  // e.g. "/videos/about-intro-poster.jpg"
}
```

### `data/siteSettings.json`

Add the video paths (once the video file is placed):

```json
{
  "aboutVideo": "/videos/about-intro.mp4",
  "aboutVideoPoster": "/videos/about-intro-poster.jpg"
}
```

## Component Changes

### `src/components/sections/About.tsx`

**Priority logic for the media column (right side):**

1. If `settings.aboutVideo` is set — render a `<video>` element
2. Else if `settings.profileImage` is set — render the existing `<Image>` element
3. Else — render nothing (current behavior)

**Grid order change:**

Currently the code renders image (left) then text (right). Swap the order so text is always on the left and media (video or image) is always on the right:

```
<div className="grid lg:grid-cols-2 gap-12 items-center">
  {/* LEFT: Text content (story, quick facts, location) */}
  <motion.div ...>
    {/* existing text block, unchanged */}
  </motion.div>

  {/* RIGHT: Video or Image */}
  {settings.aboutVideo ? (
    <AboutVideo
      src={settings.aboutVideo}
      poster={settings.aboutVideoPoster}
    />
  ) : settings.profileImage ? (
    <motion.div ...>
      {/* existing Image block, unchanged */}
    </motion.div>
  ) : null}
</div>
```

**Text animation direction:** Change from `x: 50` (slide from right) to `x: -50` (slide from left) since text is now on the left column.

**Media animation direction:** Use `x: 50` (slide from right) for the video/image since it's now on the right column.

### New: `src/components/ui/AboutVideo.tsx`

A focused component for the About section video:

```typescript
interface AboutVideoProps {
  src: string
  poster?: string
}
```

**Behavior:**

- Uses `useRef` for the video element and `useEffect` with Intersection Observer
- When the section scrolls into view (threshold ~0.3), calls `video.play()`
- Plays once, no loop — freezes on last frame (the wave pose)
- Video attributes: `muted`, `playsInline`, `preload="metadata"`, `poster`
- Wrapped in Framer Motion `motion.div` with `x: 50` slide-in animation
- Wrapped in `glass p-2 rounded-2xl` container
- Video element has `rounded-xl` and `w-full` classes
- `object-cover` to fill the container without distortion

**Intersection Observer config:**

```typescript
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting && !hasPlayed.current) {
      hasPlayed.current = true
      videoRef.current?.play()
    }
  },
  { threshold: 0.3 }
)
```

## Theme Compatibility

- The video has its own dark office background with orange accent lighting — matches the dark theme naturally
- In light mode, the glass card border provides visual separation
- No theme-specific adjustments needed for the video content itself
- The glass card wrapper adapts to both themes via existing CSS variables

## Performance

- `preload="metadata"` — loads only video metadata initially, not the full file
- Poster image displays immediately while video loads
- Intersection Observer triggers play only when visible — no bandwidth waste on page load
- Target video file size: under 2-3MB
- No JavaScript video libraries — native `<video>` element only

## Responsive Behavior

| Breakpoint | Layout | Video Sizing |
|------------|--------|-------------|
| `lg+` (1024px+) | 2-column grid, text left, video right | Fills right column, aspect ratio maintained |
| Below `lg` | Single column, video above text | Full width, `max-h-[400px]`, `object-cover` |

## Files to Create

1. `public/videos/about-intro.mp4` — the generated video (user provides)
2. `public/videos/about-intro-poster.jpg` — poster/thumbnail (user provides)
3. `src/components/ui/AboutVideo.tsx` — video component

## Files to Modify

1. `src/types/content.ts` — add `aboutVideo` and `aboutVideoPoster` to `SiteSettings`
2. `data/siteSettings.json` — add video paths
3. `src/components/sections/About.tsx` — swap column order, add video priority logic

## Out of Scope

- Admin panel UI for uploading/managing the video (can be added later)
- Video format conversion or optimization tooling
- Multiple video support or video gallery
- Sound/audio (video is always muted)
