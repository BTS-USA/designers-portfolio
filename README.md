# BTS · Design Collective Portfolio

A modern, animated portfolio website for an in-house corporate design team. Built with React, Vite, TypeScript, Tailwind CSS, ShadCN-style primitives, and Framer Motion.

## Tech stack

- **React 18** + **TypeScript**
- **Vite** for the dev server / build
- **Tailwind CSS** with custom brand tokens (Pink, Teal, Violet, Coral, Ocean + signal colors)
- **ShadCN-style UI primitives** (`Button`, `Badge`) using `class-variance-authority`, `Radix Slot`, `tailwind-merge`
- **Framer Motion** for entrance, parallax, magnetic and hover animations
- **Lenis** for buttery smooth scroll
- **Lucide** icons
- Google Fonts: **Fraunces** (display serif) + **Inter** (body)

## Sections

1. Sticky pill navigation with mobile drawer
2. Hero with animated headline, scribble underline, parallax swatches and a marquee
3. About / Manifesto with parallaxed numerical stats
4. Selected Work — generated SVG art per project, grid hover reveal
5. How we work — 4-step process cards with accent hover
6. Services / Expertise on dark — animated rows + capabilities marquee
7. Team — list + sticky animated designer card (mobile: snap carousel)
8. Testimonial with quote highlight
9. Contact CTA on dark + footer

## Custom touches

- **Custom cursor** (dot + ring) that grows on interactive elements, hidden on touch devices
- **Magnetic** buttons that follow your pointer
- **Two-direction marquees** with hover-pause
- **Smooth scroll** powered by Lenis
- **Brand-aware project art** — every project card generates a colored SVG composition keyed to the brand palette
- Tints/shades derived from the supplied palette so we can layer cleanly

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Where to add your real content

- `src/data/content.ts` — projects, designers, services, capabilities, stats. Replace dummy entries with real ones.
- `src/components/PatternArt.tsx` — when you receive real cover images, swap each `<PatternArt />` for an `<img />` (keep the same rounded card wrapper).
- `src/sections/Testimonial.tsx` — drop in real quotes / quoted person.
- `src/sections/Contact.tsx` — update studio address, email, social links.

## Brand colors

Defined in `tailwind.config.js` under `theme.extend.colors` — the four 100/200/300/400/500/600/700 ramps for `brand`, `teal`, `violet`, `coral`, `ocean`, plus `signal` (red, green, yellow, blue) and a neutral `ink` family.
