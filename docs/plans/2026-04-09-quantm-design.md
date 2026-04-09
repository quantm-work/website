# QuantM Marketing Site — Design Doc

**Date**: 2026-04-09  
**Status**: APPROVED  
**Aesthetic**: White monochrome, luxury-editorial (Bottega Veneta + Bloomberg Terminal)

---

## Overview

QuantM is a premium Next.js marketing site for a fintech/software company. The design prioritizes editorial restraint, sophisticated typography, and choreographed motion. Every interaction earns its place; nothing is decorative.

**Core principle**: The typography and the silence around it are the statement.

---

## Section A: File Structure & Setup

### Next.js Initialization

```bash
bunx create-next-app@latest quantm --typescript --tailwind --eslint
cd quantm
bun install framer-motion
```

### Directory Structure

```
quantm/
├── app/
│   ├── layout.tsx          # Fonts, metadata, GrainOverlay, Cursor
│   ├── page.tsx            # Section composition only
│   └── robots.txt          # Handler
│   └── sitemap.xml         # Handler
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── LogoRow.tsx
│   │   ├── ParallaxStack.tsx
│   │   └── CTASection.tsx
│   ├── ui/
│   │   ├── CustomCursor.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── GrainOverlay.tsx
│   │   └── MotionText.tsx
│   └── icons/
│       ├── Logo.tsx
│       └── PlaceholderLogo[1-5].tsx
├── lib/
│   ├── email.ts            # Obfuscation helper
│   ├── config.ts           # Calendar link, contact email
│   └── animation.ts        # Framer Motion presets
├── styles/
│   └── globals.css         # Design tokens, Tailwind config
└── docs/
    ├── specs/
    │   └── quantm.md       # No-frills spec
    └── plans/
        └── 2026-04-09-quantm-design.md
```

### Design Tokens (`:root`)

All values as CSS custom properties in `globals.css`:

```css
:root {
  /* Typography */
  --font-display: 'DM Serif Display', serif;
  --font-body: 'Geist', sans-serif;

  /* Color */
  --color-ink: #0a0a0a;
  --color-paper: #fafafa;
  --color-mid: #8a8a8a;
  --color-subtle: #e8e8e8;

  /* Spacing */
  --space-unit: 8px;
  --space-xs: calc(var(--space-unit) * 0.5);     /* 4px */
  --space-sm: var(--space-unit);                 /* 8px */
  --space-md: calc(var(--space-unit) * 1.5);     /* 12px */
  --space-lg: calc(var(--space-unit) * 2);       /* 16px */
  --space-xl: calc(var(--space-unit) * 3);       /* 24px */
  --space-2xl: calc(var(--space-unit) * 4);      /* 32px */

  /* Border Radius */
  --radius-none: 0;

  /* Transitions */
  --transition-base: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-slow: 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  /* Typography Scale (fluid, clamp-based) */
  --font-xs: clamp(0.75rem, 2vw, 0.875rem);
  --font-sm: clamp(0.875rem, 2.5vw, 1rem);
  --font-base: clamp(1rem, 3vw, 1.125rem);
  --font-lg: clamp(1.25rem, 4vw, 1.5rem);
  --font-display: clamp(2.5rem, 8vw, 7rem);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-base: 0s;
    --transition-slow: 0s;
  }
}

@media (pointer: coarse) {
  /* Disable custom cursor on touch devices */
  :root {
    --cursor-disabled: true;
  }
}
```

---

## Section B: Typography & Fonts

### Font Setup (`app/layout.tsx`)

```typescript
import { DM_Serif_Display, Geist } from 'next/font/google';

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${geist.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
```

### Type Scale

**Display (h1)**: `clamp(2.5rem, 8vw, 7rem)` — hero headline  
**Large (h2)**: `clamp(1.5rem, 4vw, 2.5rem)` — section titles  
**Base (p)**: `clamp(1rem, 3vw, 1.125rem)` — body text  
**Small (label)**: `clamp(0.875rem, 2.5vw, 1rem)` — UI labels, nav  
**XS (caption)**: `clamp(0.75rem, 2vw, 0.875rem)` — metadata, footer

### Typographic Rules

- **Hero `<h1>`**: `font-display`, `letter-spacing: 0.02em`, `line-height: 0.95`, `text-color-ink`
- **Section titles**: `font-display`, `letter-spacing: 0.01em`, `line-height: 1.1`
- **Body text**: `font-body`, `line-height: 1.6`, `color: var(--color-ink)`
- **Nav/labels**: ALL CAPS only; never for body or headlines
- **No font smoothing hacks**: rely on `font-smooth: always` only where tested

---

## Section C: Motion & Choreography

### Animation Presets (`lib/animation.ts`)

```typescript
export const animationPresets = {
  // Page load sequence
  headerFadeDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  
  // Hero word reveal (staggered)
  heroWord: {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8 },
  },
  
  // Logo row fade
  logoRowFade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay: 0.4 },
  },
  
  // Scroll-triggered sections
  sectionReveal: {
    initial: { y: 30, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { duration: 0.8 },
    viewport: { once: true, margin: '0px 0px -100px 0px' },
  },
  
  // Button hover
  buttonHover: {
    scale: 1.03,
    transition: { duration: 0.3 },
  },
};
```

### Page Load Sequence

1. **Header** (0ms delay): fades in + slides down (`opacity: 0 → 1`, `y: -20 → 0`)
2. **Hero headline** (staggered 80ms per word): word-by-word reveal (`y: 40 → 0`, `opacity: 0 → 1`)
3. **Logo row** (400ms delay): fades in as a unit (`opacity: 0 → 1`)

**Total duration**: ~1.2s  
**Skipped if**: `prefers-reduced-motion`

### Scroll-Triggered Animations

Use Framer Motion `whileInView` + `once: true`:

- **Parallax section titles**: `y: 30 → 0`, `opacity: 0 → 1`
- **CTA section**: `scale: 0.97 → 1` + fade
- **Footer**: fade only

### Hover States

- **Nav links**: underline draws left-to-right via `scaleX` transform (0 → 1)
- **Footer links**: opacity `1 → 0.4` on siblings (spotlight effect)
- **Logo SVGs**: opacity `0.3 → 0.7`
- **"Book Now" button**: `scale: 1 → 1.03` + shadow lift
- **"Contact" button (header)**: invert (white fill → black fill)

### Parallax Implementation

Use `useScroll()` + `useTransform()` from Framer Motion:

```typescript
const { scrollY } = useScroll();
const backgroundY = useTransform(scrollY, [0, 1000], [0, 400], {
  clamp: true,
});

return <motion.div style={{ y: backgroundY }} />;
```

**Parallax rate**: 0.4× scroll rate (background moves slower)  
**Applied to**: 3 full-width parallax sections (16:9)  
**Disabled on mobile**: static full-bleed image fallback

### Custom Cursor

**Spec**:
- Default: 12px filled black circle
- Hover over interactive element: expands to 40px, `mix-blend-mode: difference` (white over black)
- Implemented as fixed overlay `<div>`, driven by `mousemove` via `useMotionValue` + spring
- Disabled on touch devices (`@media (pointer: coarse)`)

### Reduced Motion

All animations collapse to instant opacity fade:

```typescript
const useReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// In component:
const shouldReduceMotion = useReducedMotion();
const duration = shouldReduceMotion ? 0 : 0.6;
```

---

## Section D: Components & Composition

### Header (`components/layout/Header.tsx`)

- Sticky top, white background, `height: 64px`
- **Left**: QuantM logo
- **Right**: "Contact" button
  - Black fill, white label
  - Obfuscated email (build-time Base64)
  - Hover: inverts to white fill, black label
- **Mobile** (`< 768px`): hamburger menu, full-screen overlay nav

### Hero (`components/sections/Hero.tsx`)

- Full viewport height, centered
- `<h1>`: "We build the future of finance"
- `clamp(2.5rem, 8vw, 7rem)`, `letter-spacing: 0.02em`, `line-height: 0.95`
- Word-by-word entrance animation (Framer Motion)
- White background, `#0a0a0a` text
- Faint radial gradient vignette at edges (`rgba(0,0,0,0.04)`)

### Logo Row (`components/sections/LogoRow.tsx`)

- 5 placeholder React SVG components (`PlaceholderLogo1–5`)
- `opacity: 0.3`, hover `opacity: 0.7`, smooth transition
- `aria-label="Client logos"`
- 44×44px minimum touch targets

### Parallax Stack (`components/sections/ParallaxStack.tsx`)

- 3 full-width `16:9` sections
- Titles: "Infrastructure at Scale" / "Capital Moves Fast" / "Built for What's Next"
- B&W placeholder illustration components (clearly marked for swap)
- Framer Motion `useScroll` + `useTransform` parallax on background layer (0.4× rate)
- Each section: `<section aria-label="[title]">`
- **Mobile**: parallax disabled, static full-bleed images

### CTA Section (`components/sections/CTASection.tsx`)

- Full-width, generous padding (`96px vertical`, `32px horizontal`)
- White background
- **"Book Now"** button: black fill, white label
- `href="https://calendar.app.google/REX2my8XrmvK5dUw6"` (real calendar link)
- `target="_blank"`, `rel="noopener noreferrer"`
- Hover: `scale: 1 → 1.03` + soft shadow
- `aria-label="Book a consultation"`

### Footer (`components/layout/Footer.tsx`)

- Single row: left "QuantM © 2025" / right "Terms · Privacy · Support · Contact"
- Contact → obfuscated mailto
- Footer link hover: opacity spotlight effect on siblings
- Black text on white

### UI Components

**CustomCursor** (`components/ui/CustomCursor.tsx`):
- Fixed overlay, `12px` circle by default
- Expands to `40px` on hover over interactive elements
- `mix-blend-mode: difference` for inversion effect
- Disabled on touch devices

**ScrollProgress** (`components/ui/ScrollProgress.tsx`):
- 2px fixed line at top of viewport
- Color: `#0a0a0a`
- `scaleX: 0 → 1` driven by `useScroll().scrollYProgress`
- `transform-origin: left`

**GrainOverlay** (`components/ui/GrainOverlay.tsx`):
- Fixed, full viewport SVG grain noise overlay
- `pointer-events: none`, `opacity: 0.035`, `mix-blend-mode: multiply`
- Inline SVG data URI (zero network request)

**MotionText** (`components/ui/MotionText.tsx`):
- Wrapper for word-by-word reveal animations
- Splits text into words, applies staggered animations
- Used in Hero

### Logo SVG (`components/icons/Logo.tsx`)

- QuantM wordmark
- `role="img"`, `<title>` inside SVG

---

## Section E: Accessibility & SEO

### Accessibility

- **Skip to content**: visually hidden until focused, appears top-left
- **Focus ring**: visible `outline: 2px solid #0a0a0a`, `outline-offset: 3px`
- **WCAG AA contrast**: all text verified (99%+ to pass)
- **Aria attributes**:
  - `aria-current="page"` on active nav state
  - `aria-label` on all sections and interactive elements
  - `role="img"` on SVG logos with `<title>`
- **Keyboard navigation**: logical DOM order, no keyboard traps
- **Form inputs** (future): visible labels, error messages

### SEO & AEO

**Meta tags**:
- `<title>`: "QuantM — We Build the Future of Finance"
- `<meta name="description">`: "QuantM builds AI-powered software for modern finance. Award-caliber execution, luxury design, zero shortcuts."
- `<meta name="robots">`: "index, follow"
- `<link rel="canonical">`: `https://quantm.work`
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type: website`
- Twitter Card: `twitter:card: summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
- `<meta name="author" content="QuantM">`

**JSON-LD** (in `<head>`):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "QuantM",
  "url": "https://quantm.work",
  "logo": "https://quantm.work/logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-xxx-xxx-xxxx",
    "contactType": "Sales"
  },
  "sameAs": [
    "https://linkedin.com/company/quantm",
    "https://twitter.com/quantm"
  ]
}
```

**FAQPage** (JSON-LD + DOM, sr-only):
- 4–5 Q&A pairs about what QuantM does, who it's for, how to engage
- Plain, declarative copy (no metaphors that confuse LLM parsers)

**Semantic HTML**:
- One `<h1>` only (hero headline)
- Proper `<h2>–<h3>` hierarchy
- `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- All images/SVGs have `alt` text
- `lang="en"` on `<html>`

**Sitemap & Robots**:
- `public/sitemap.xml`: generated via route handler
- `public/robots.txt`: generated via route handler

---

## Section F: Performance & Mobile

### Performance Targets

- **LCP**: < 2.5s (hero image loaded)
- **CLS**: < 0.1 (no layout shifts)
- **INP**: < 200ms (interaction to paint)

### Image Optimization

- **`next/image`** on all images: explicit `width`, `height`, `priority` on hero
- Hero image: `priority={true}`, `quality={90}`
- Placeholder illustrations: lazy-load with `loading="lazy"`
- No render-blocking resources

### Font Optimization

- `next/font` with `display: 'swap'` (no FOUT, no CLS)
- DM Serif Display: subset to Latin (minimal)
- Geist: subset to Latin (minimal)

### Grain Overlay

- Inline SVG data URI: zero network request
- Pre-optimized, ~2KB
- `pointer-events: none`, low opacity

### Mobile Strategy

**Mobile-first breakpoints:**

```css
/* Mobile (< 768px) */
.hero h1 { font-size: clamp(1.5rem, 5vw, 2.5rem); }

/* Tablet (768px–1024px) */
@media (min-width: 768px) {
  .hero h1 { font-size: clamp(2.5rem, 7vw, 5rem); }
}

/* Desktop (> 1024px) */
@media (min-width: 1024px) {
  .hero h1 { font-size: clamp(2.5rem, 8vw, 7rem); }
}
```

**Hamburger menu** (< 768px):
- Slides in from right
- Full-screen overlay (white background)
- Closes on link click or ESC key
- `AnimatePresence` + Framer Motion

**Parallax disabled on mobile**:
- Replace with static full-bleed images
- Controlled via `useMediaQuery('(min-width: 768px)')`

**Hero line breaks** (tested at 375px, 390px, 430px):
- No widows/orphans
- Intentional breaks for rhythm

**Touch targets**: minimum 44×44px

**Tap highlight**: `-webkit-tap-highlight-color: transparent`

### Print Stylesheet

```css
@media print {
  header, .parallax-section, .cta-button, footer a { display: none; }
  body { background: white; color: black; font-size: 12pt; }
  h1 { page-break-before: avoid; }
  a { text-decoration: underline; }
}
```

---

## Section G: Email Obfuscation & Config

### Email Obfuscation (`lib/email.ts`)

Build-time Base64 encoding:

```typescript
// config.ts
export const EMAIL_ENCODED = Buffer.from('contact@quantm.work').toString('base64');

// email.ts
export const decodeEmail = () => {
  return Buffer.from(process.env.EMAIL_ENCODED || 'Y29udGFjdEBxdWFudG0ud29yaw==', 'base64').toString();
};
```

**Easy to edit**: Update `contact@quantm.work` in `config.ts`, re-build.

### Calendar Link Config (`lib/config.ts`)

```typescript
export const CALENDAR_LINK = 'https://calendar.app.google/REX2my8XrmvK5dUw6';
export const CONTACT_EMAIL = 'contact@quantm.work';
export const COMPANY_NAME = 'QuantM';
```

---

## Acceptance Criteria

- [ ] File structure created
- [ ] Design tokens in `:root` (globals.css)
- [ ] Fonts (DM Serif Display + Geist) integrated via `next/font`
- [ ] Framer Motion animations implemented (page load, scroll-triggered, hover states)
- [ ] Custom cursor + scroll progress as fixed overlays
- [ ] All components created (Header, Hero, LogoRow, ParallaxStack, CTA, Footer, UI)
- [ ] Placeholder SVG logo components created
- [ ] Mobile hamburger menu functional (< 768px)
- [ ] Parallax disabled on mobile; static fallback
- [ ] `prefers-reduced-motion` respected (all animations collapse to fade)
- [ ] Accessibility: skip link, focus rings, WCAG AA contrast, semantic HTML, aria-labels
- [ ] SEO: metadata, JSON-LD, sitemap, robots.txt
- [ ] Email obfuscation (Base64, easily editable)
- [ ] Calendar link + config management
- [ ] Print stylesheet
- [ ] Performance optimized: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Mobile: 44×44px touch targets, no tap highlight, tested at 375px–430px

---

## Next Phase

After design approval, proceed to **add-project** with the no-frills spec (`docs/specs/quantm.md`) to scaffold the repository shell.
