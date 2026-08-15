# Utsav marketing site

Next.js (App Router) + Tailwind v4. Replaces the old static `index.html` /
`customer.html` / `provider.html` set.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build && npm run start` for a
production build (verified clean in this environment).

## What's real vs. placeholder

- **Design**: built to spec — `#E8A020` accent, light/dark theme (toggle in
  the nav, persisted to `localStorage`), Apple/Notion-style layout.
- **Brand assets**: pulled from `utsav-brand-assets.zip` into `public/brand/`
  — favicons, header lockup, OG image all wired into `app/layout.tsx`.
- **Feature sections**: guest list, digital invites, gate passes, gifts, and
  the smart checklist are all built from the real feature set you described,
  as stylized UI mockups (no actual app screenshots were supplied). Swap in
  real screenshots later by dropping them into `public/` and replacing the
  components in `components/FeatureMockups.tsx`.
- **Smart checklist demo** (`components/SmartChecklist.tsx`) is fully
  interactive and generates its list client-side from event type, season,
  time of day, venue, diet, and wedding functions — this is real logic, not
  a static mock.
- **Login CTAs**: every customer/provider login and signup link is a `href="#"`
  placeholder, marked with a `{/* Placeholder */}` comment above it. Search
  the codebase for `Placeholder` to find all of them — there are five spots
  (nav x2, hero, providers band, final CTA, footer).

## Structure

```
app/
  layout.tsx      — fonts, metadata, theme-flash prevention
  page.tsx        — the whole page
  globals.css     — design tokens (light/dark), Tailwind theme
components/
  Nav.tsx
  ThemeToggle.tsx
  SmartChecklist.tsx     — interactive hero demo
  FeatureMockups.tsx     — guest list / invite / gate pass / gift cards
public/brand/       — all logo & favicon assets from the brand kit
```

## Fonts

Self-hosted via `@fontsource` (Manrope for display, Inter for body, IBM Plex
Mono for tags/data) rather than `next/font/google`, so the build has no
runtime dependency on Google's font CDN.
