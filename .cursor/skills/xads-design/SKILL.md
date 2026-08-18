---
name: xads-design
description: Build pages in the design language of business.x.com/en/advertising (the X Ads marketing site, design-engineered by Benji Taylor / benji.org) — a pure-achromatic token system (#000/#fff plus alpha ramps, one functional blue #1d9bf0), the xVF variable grotesque at a dense 13px baseline with only two big sizes (48px display / 32px h3), the signature two-line heading where line 2 is the same size but 60%-alpha, an 8-column 16px-gutter grid with checkerboard-staggered cards, hairline (10%-alpha 1px) borders everywhere, pill CTAs only 24px tall, square-cornered stat cards with count-up numerals, first-class light/dark themes via --x-* semantic tokens, motion ruled by two easings ([.32,.72,0,1] in / [.23,1,.32,1] out) with glacial linear ambient loops, and a line-art SVG illustration system (hero construction-circle diagrams, dashed orbits, 84-grid mini-diagrams, outline wordmark, schematic node-and-connector diagrams). Use this skill whenever the user wants something "like the X Ads page", "like business.x.com", "the X advertising site feel", "xads style", "diagrams like the X Ads page", "technical schematic SVG", "line-art data diagrams", "dashed orbit illustrations", "construction circles", "blueprint-style animated SVGs", "monochrome node-and-connector diagrams", an animated outline wordmark, SVG draw-on-scroll effects in this aesthetic, a "monochrome technical marketing page", "black-and-white schematic landing page", mentions xVF/Chirp type, two-line gray-second headings, checkerboard card grids, hairline-bordered benefit cards, count-up stat masonry, or gestures at the aesthetic ("stark black-and-white B2B page", "technical drafting look with tiny type", "dense 13px UI text with huge airy sections", "make it feel like X's ads page").
---

# X Ads Design (business.x.com/en/advertising)

Build interfaces in the visual language of X's advertising marketing site — reverse-engineered from the live site's compiled CSS, SSR markup, and JS bundles (captured 2026-08-04). The language: **pure black-and-white with alpha as the only hierarchy**, a dense 13px UI baseline under two big display sizes, one 8-column grid expressed everywhere, hairline rules, tiny pill buttons, checkerboard stagger, count-up stats, restrained Framer-style motion over a schematic line-art illustration system.

Attribution: the page is design-engineered by Benji Taylor (benji.org), who leads design at X. Every value in this skill is extracted from the site's actual assets, not invented.

## Read these references when relevant

- **`references/tokens.md`** — the 3-layer color architecture (primitives → `--x-*` semantics → utilities), full light+dark token map as ready-to-copy CSS, alpha ramps, the squircle radius multiplier, shadows (nearly none), theme-boot script. Read whenever wiring colors, surfaces, or themes.
- **`references/typography.md`** — xVF variable font facts and the Inter substitution, the complete type scale (display 48 / h3 32 / a 13px everything-else tier), the two-line heading pattern, the animated nav weight trick (wght 500→560→580). Read whenever loading fonts or setting text.
- **`references/layout.md`** — breakpoints (640/768/960/1024), the sticky-sidebar shell (208px sidebar, 1440px clamp, 1152px article), the 8-column grid family, checkerboard card placement, stats masonry, section vertical rhythm. Read whenever structuring a page.
- **`references/components.md`** — exact recipes: pill buttons (3 variants), benefit cards, stat cards, hero chips, form fields, FAQ accordion, sidebar nav, tab underline, carousel buttons, theme toggle, testimonial card. Read whenever building a component.
- **`references/motion.md`** — the two-easing system, viewport reveals (0.55s / 80ms stagger), count-up port, accordion/carousel mechanics, reduced-motion discipline. Read whenever animating page chrome.
- **`references/svg/`** — the line-art illustration system: `README.md` (seven laws), `grammar.md` (drawing rules), `recipes.md` (archetypes + golden fixtures), `animation.md` (shared clock + ambient CSS), `generative.md` (creative composition + prompt scaffolds), `lint.md` (audit checklist). Read whenever drawing or animating anything inside `<svg>`.

## SVG illustration (summary)

The seven laws — full detail in `references/svg/README.md`:

1. Two inks + theme tokens (knockout: `--x-canvas` on plates, `--x-bg-primary` on card minis)
2. Stroke scale ladder (0.5 mini | 1 page + non-scaling | 0.99–1.319 mock icons | 1.8 cursor | 4 on 24×24 UI)
3. Dashed = potential, solid = realized
4. Fixed node kit (4×4, r=2, r=9 hub, r=1.25 travel)
5. 84-grid default (`-6 -6 84 84`); live variants exist
6. Shared clock (~4.92s dash flow, 169s rings, 6s blinks)
7. Ship the hidden pose

Golden fixtures: `fixtures/golden/*.svg`. Motion playground (not fidelity proof): `fixtures/svg-demo.html`.

## The six principles

### 1. Alpha is the hierarchy — never gray hexes for text

Text and borders are **alpha over pure ink**, not gray swatches: secondary text = 60% alpha (`#0009` on white, `#fff9` on black), tertiary = 30%, hairlines = 10%, hover borders = 20%, active = 30%. Because everything is alpha over `#000`/`#fff`, the light↔dark flip is a near-perfect mirror and every tier composites over any surface. The only saturated color in normal flow is `#1d9bf0` (focus ring + brand); red/green/yellow/plum exist solely for status. Zero decorative color, zero gradients (except scroll scrims), zero shadows (except toast).

### 2. Two big sizes, then 13px everything

The whole page has exactly two "large" text sizes: `text-display` (48/52, −0.01em, wt 500, only the hero h1) and `text-h3` (32/36, −0.32px, wt 500, every section heading *and* the stat numerals). Everything else — nav, card titles, body, buttons, quotes, form labels — is a dense **13px/20px** tier (wt 500 for UI, 400 for prose), shrinking to 12/11/10px with slightly *positive* tracking. If your card title is 18px, it's wrong; the bigness of this design comes from whitespace and the h3, not from inflated component type.

### 3. The two-line heading — color does the hierarchy

Every section opens with two lines at the **same size and weight** (`text-h3`), line 1 in `--x-fg-primary`, line 2 in `--x-fg-secondary` (60% alpha): "Why advertise on X?" / "The internet talks here first". Never bold line 1, never shrink line 2. This is the page's typographic signature — a page in this language without it won't read.

### 4. One 8-column grid, deliberately dented

At ≥1024px everything sits on `repeat(8, minmax(0,1fr))` with 16px gutters; cards always span 2 columns. The life comes from **controlled holes**: benefit-card rows start at column 3 then column 1 (checkerboard diagonal), stat cards are bottom-aligned (`align-self:end`) at fixed heights (248/328/408px) leaving a skyline gap, wide format cards start at column 3 leaving columns 1–2 empty. Stagger is placement arithmetic, not randomness.

### 5. Hairlines and whitespace, not boxes

Cards are not boxes. Benefit cards are **hairline top-border only** (1px at 10% alpha) over open space; stat/media cards are flat `#f2f2f2`/`#0d0d0d` panels with **square corners**; sections in the front half separate by 120–200px of whitespace, the back half by a hairline `border-t`. Radius appears only on pills (full), form fields (9px, ×1.8 squircle where supported), and the FAQ highlight (8px).

### 6. Motion: two easings, one entrance, glacial ambience

Every entrance is `opacity:0, y:10px → visible` over **0.55s** with `cubic-bezier(.32,.72,0,1)`, staggered 80ms, triggered once at **`threshold: 0`** with **`rootMargin: '0px 0px -15% 0px'`** (not threshold 0.3 — tall sections never reach 30% on mobile). Exits and micro-UI use `cubic-bezier(.23,1,.32,1)` at 0.2–0.3s. Stats **count up from 0** (0.6s). Ambient decoration is **linear and glacial** — 95s/169s rotations, ~4.9s dash flow, 6s blinks — decoration never eases. Springs only where physical (tab underline, button layout). Every animation has a reduced-motion branch. SVG ambient CSS: `references/svg/animation.md`.

## What this design explicitly doesn't do

- **No gray text hexes** — `#666`-style grays for text are wrong; use alpha (`#0009`). The only gray primitives are surface fills (neutral-0/50/100/900/1000/1100) and `#999` for step numbers.
- **No shadows** on cards, nav, or buttons — elevation = surface tier + hairline. (Only toast has a shadow.)
- **No decorative gradients, no noise, no glassmorphism.** The only blur is the mobile header's `backdrop-blur-md`.
- **No rounded stat/media cards** — big panels are square-cornered.
- **No big buttons** — desktop pills are 24px tall (13px text); 36px only below 768px. The "Log in"/language pill is 32px.
- **No size-based heading hierarchy inside sections** — color (primary vs 60% alpha) carries it.
- **No eased ambient loops** — infinite decoration is always `linear`.
- **No parallax, no scroll-jacking** — native scroll (`scroll-behavior:smooth` for anchors only).

## Signature moves (fidelity checklist)

If the user asks for "the X Ads feel", the page needs most of these:

1. **Two-line h3 heading**, line 2 at 60% alpha (§3 above).
2. **Hero canvas panel** — flat `#f2f2f2`/`#0d0d0d` full-width panel holding a line-art diagram with in-canvas chip callouts (see `references/svg/recipes.md`).
3. **Checkerboard benefit grid** — hairline-top cards with mini line-art diagrams, offset placement.
4. **Count-up stat masonry** — square flat cards, bottom-aligned mixed heights, `text-h3` numerals animating 0→value, one inverted testimonial card.
5. **Tiny pill CTAs** — solid primary + 5%-alpha secondary side by side.
6. **Hairline-ruled back half** — later sections open with `border-t` + generous padding.
7. **Dark/light both first-class** — `data-theme` attribute + pre-paint boot script; test both.

## Stack notes

The source site is Next.js + Tailwind v4 + Framer Motion, but this skill targets **plain HTML/CSS/vanilla JS** (the references give exact ports: IntersectionObserver reveals, rAF count-up, CSS ambient keyframes). The type is proprietary xVF (Chirp) — substitute **Inter Variable** with the site's own tracking values and an `opsz 32` display axis (see `references/typography.md`). When the target project does use Tailwind/React, the reference files quote the site's verbatim utility classes and Framer configs to lift directly.

## Don't trigger this skill when

- The user wants x.ai's warm-ivory aesthetic (that's `xai-design` — cool achromatic vs warm-on-cool are opposite moves).
- The user wants Cursor's warm dev-tool style (`cursor-design`) or Seeker's Graphite/Electric-Blue system (`seeker-design`).
- The user wants X the *product* (timeline UI, tweets) rather than X's *marketing* language.
