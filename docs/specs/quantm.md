# QuantM — Spec

**Created**: 2026-04-09  
**Status**: APPROVED

---

## Mission

Premium Next.js marketing site for QuantM — a fintech/software company — communicating design sophistication, technical depth, and editorial restraint through white monochrome aesthetic, luxury typography, and choreographed motion.

---

## Main Features

- **Hero section**: Full-viewport hero with word-by-word entrance animation
- **Logo row**: 5 client logo placeholders with hover opacity transitions
- **Parallax stack**: 3 full-width `16:9` sections with scroll-driven parallax background (0.4× rate)
- **CTA section**: "Book Now" button with Google Calendar link (`https://calendar.app.google/REX2my8XrmvK5dUw6`)
- **Custom cursor**: 12px circle, expands to 40px on hover over interactive elements (`mix-blend-mode: difference`)
- **Scroll progress**: 2px top-of-viewport line tracking scroll position
- **Responsive header**: Sticky, with contact email button (obfuscated) and mobile hamburger menu
- **Grain overlay**: Subtle SVG noise (fixed, `opacity: 0.035`, `multiply` blend mode)
- **Mobile hamburger menu**: Full-screen overlay nav, slides from right (< 768px)
- **Email obfuscation**: Build-time Base64 encoding, easily editable
- **Print stylesheet**: Hides navigation, shows hero, logo row, contact email (decoded)
- **Accessibility**: WCAG AA contrast, semantic HTML, skip-to-content, focus rings, aria-labels
- **SEO/AEO**: JSON-LD (Organization, Service, FAQPage), meta tags, sitemap, robots.txt

---

## Major User Flows

1. **Page load**: Header fades + slides down (0ms) → Hero headline word-by-word reveal (staggered 80ms/word) → Logo row fades (400ms delay). Total ~1.2s. Skips if `prefers-reduced-motion`.

2. **Scroll engagement**: As user scrolls, parallax sections reveal (`y: 30 → 0`, `opacity: 0 → 1`). Parallax background moves at 0.4× scroll rate on desktop; disabled on mobile.

3. **Hover interactions**: Nav links underline-draw (scaleX), footer links spotlight-dim siblings, logo opacity increases, buttons scale up. All with `transition-base` (0.4s cubic-bezier).

4. **Book consultation**: Click "Book Now" → opens Google Calendar booking link in new tab.

5. **Contact via email**: Click contact email → opens mailto (obfuscated, decoded at build time).

6. **Mobile nav**: Hamburger menu (< 768px) → full-screen overlay slides in from right → click link or ESC to close.

7. **Reduced motion**: All animations collapse to instant opacity fade if `prefers-reduced-motion: reduce` is set.

---

## Required Screens / Pages

| Screen | Purpose | Key Elements |
|--------|---------|--------------|
| Home / Hero | Full-viewport entry point | h1 word-by-word reveal, white bg, centered |
| Logo Row | Client proof | 5 placeholder SVG logos, hover opacity |
| Parallax Stack | Narrative sections | 3 × 16:9 illustration + title, scroll parallax |
| CTA Section | Call-to-action | "Book Now" button, calendar link, hover scale |
| Header (sticky) | Navigation + branding | Logo, Contact button (email), mobile hamburger |
| Footer | Copyright + links | "© 2025", Terms, Privacy, Support, Contact (email) |
| Mobile Menu | Responsive nav | Full-screen overlay, slides from right, ESC to close |

---

## Required Features (from Skills)

| Requirement | Skill(s) | Notes |
|-------------|----------|-------|
| Next.js App Router + SSR | `vercel:nextjs` | Use `create-next-app` per Next.js skill; latest v16 |
| Tailwind v4 styling | `vercel:shadcn` (includes Tailwind setup) | Mobile-first, CSS custom properties for tokens |
| Component library (UI base) | `vercel:shadcn` | Use `bunx shadcn@latest add Button` for base components as needed |
| Motion animations (Framer Motion) | No dedicated skill; use `next-best-practices` for perf | Custom implementation per design doc (page load, scroll, hover, parallax) |
| Fonts (`next/font/google`) | `vercel:nextjs` + font.md section | DM Serif Display (display) + Geist (body) |
| Image optimization | `vercel:nextjs` + image.md section | `next/image` with priority, width, height |
| SEO / JSON-LD | `vercel:nextjs` + metadata.md section | Generate metadata export, JSON-LD in `<head>` |
| Accessibility (a11y) | No dedicated skill; refer to WCAG AA | Focus rings, skip-to-content, semantic HTML, aria-labels |
| Performance tuning | `vercel:react-best-practices` | LCP < 2.5s, CLS < 0.1, INP < 200ms targets |
| Email obfuscation | Custom implementation (Base64) | Build-time encoding, config file for easy edits |
| Custom cursor + parallax | Custom implementation (Framer Motion) | `useMotionValue`, `useScroll`, `useTransform` |

---

## Open Gaps

- **Placeholder SVG logos** (5×): Marked for swap by user (no placeholder graphics provided; use React SVG stubs)
- **Placeholder illustrations** (3× parallax sections): Marked for swap by user (use B&W placeholder components)
- **Google Analytics / tracking**: Not specified; can add `@next/third-parties` if needed
- **Form backend** (future contact form): No database/API specified; out of scope
- **Auth integration** (future): No auth requirement specified; better-auth available if needed
- **CMS**: No content management system; all copy static in components

---

## Constraints / Assumptions

### Hard Constraints

- **White monochrome** aesthetic (no color outside grayscale + black/white)
- **Luxury-editorial** tone (Bottega Veneta + Bloomberg Terminal reference)
- **Real Google Calendar link**: `https://calendar.app.google/REX2my8XrmvK5dUw6` (will not commit plaintext; config-managed)
- **Real contact email**: `contact@quantm.work` (obfuscated at build time, Base64-encoded for easy editing)
- **Mobile-first** media queries (< 768px hamburger, parallax disabled)
- **Design tokens** in `:root` CSS custom properties (no magic numbers)
- **Framer Motion** for all animations (page load sequence, scroll triggers, hover states, custom cursor, parallax)
- **No shortcuts** on motion: every animation must be intentional (respect `prefers-reduced-motion`)

### Assumptions

- **Local dev**: Bun + `create-next-app` for initialization
- **No backend auth** needed initially (marketing site)
- **Static content**: All copy, links, email in component code (no CMS)
- **Placeholder SVGs**: User will provide client logos + parallax illustrations later
- **Build-time email encoding**: Base64 string; not meant for high-security (public-facing site)
- **Calendar link is public**: Google Calendar link does not expose sensitive data
- **Next.js 16**: Latest stable version per `create-next-app`
- **Vercel deployment** (future): Optimized for Vercel; can self-host if needed
- **No third-party analytics yet**: Can add later (Google Analytics, Plausible, etc.)

---

## Tech Stack Summary

| Tool | Purpose |
|------|---------|
| **Next.js 16** | App Router, SSR, image/font optimization |
| **React 19** | Components, hooks (Framer Motion, custom cursor) |
| **Tailwind CSS v4** | Styling, mobile-first, custom properties |
| **Framer Motion** | All animations (page load, scroll, hover, parallax, custom cursor) |
| **next/font** | DM Serif Display (display), Geist (body) — zero FOUT |
| **Biome** | Linting + formatting (when installed) |
| **Bun** | Package manager + dev server |

---

## Next Steps

1. Initialize repo with `bunx create-next-app@latest quantm --typescript --tailwind`
2. Install Framer Motion: `bun add framer-motion`
3. Implement design doc sections (A–G) as components
4. Map placeholder SVGs (logos, illustrations) for user to swap
5. Test performance (LCP, CLS, INP) and accessibility (WCAG AA)
6. Deploy to Vercel
