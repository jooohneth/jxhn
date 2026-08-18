# Typography — xVF and the type scale

## The font

One variable woff2 — **xVF** (X's Chirp grotesque, marketing build) — registered under two family names: `xVF` (text) and `xVFDisplay` (display, same file, toggled per-element with an optical-size axis). Facts:

- Weight axis **200–800**, single file, `font-display:swap`.
- Metric-matched Arial fallback (prevents CLS): `ascent-override:90.56%; descent-override:22.64%; line-gap-override:0%; size-adjust:106.01%`.
- Display treatment = **`font-variation-settings:"opsz" 48`** on the hero h1 only — not a size change, an optical-size change.

**xVF is proprietary — substitute Inter Variable** (rsms.me/inter): variable wght covers 200–800 and the 500/560/580 micro-weights; its `opsz` axis (14–32) emulates the display cut (clamp to `"opsz" 32`). Keep the site's own letter-spacing values, not Inter's defaults. Second choice: Roboto Flex (bigger opsz range). Reuse the site's Arial fallback metrics verbatim.

```css
@font-face {
  font-family: "xVF";
  src: url("/fonts/InterVariable.woff2") format("woff2");
  font-weight: 200 800; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "xVF Fallback"; src: local("Arial");
  ascent-override: 90.56%; descent-override: 22.64%;
  line-gap-override: 0%; size-adjust: 106.01%;
}
:root { --font-sans: "xVF", "xVF Fallback", ui-sans-serif, system-ui, sans-serif; }
```

## The scale (complete — verbatim values)

Only two big sizes exist on the whole page. Everything else is a 10–16px tier. Usage counts from the source: `text-nav` ×79, `text-body` ×30, `text-h3` ×16, `text-display` ×1.

| Token | size / line-height | letter-spacing | weight | Used for |
|---|---|---|---|---|
| `display` | 3rem / 3.25rem (48/52) | −.01em | 500 | Hero h1 only (+ `opsz 48`) |
| `h3` | 2rem / 2.25rem (32/36) | −.32px | 500 | Every section heading (both lines) AND stat numerals |
| `nav` | .8125rem / 1.25rem (13/20) | .13px | 500 | Nav links, card titles, form labels, FAQ questions, quotes, desktop CTA labels |
| `nav-sub` | .8125rem / 1rem (13/16) | .13px | 500 | Sub-nav items |
| `body` | .8125rem / 1.25rem (13/20) | .13px | 400 | Default on `body{}`; card copy, captions |
| `button` | .9375rem / 1.25rem (15/20) | 0 | 500 | Pill CTAs below 768px only |
| `faq-answer` | .75rem / 1.125rem (12/18) | .12px | 500 | FAQ answers |
| `caption` | .6875rem / 1.125rem (11/18) | .11px | 400 | Legal/footnotes |
| `meta` | .625rem / .625rem (10/10) | .1px | 500 | Tiny fine print |
| stat numerals | 2.25rem mobile → 3rem/lh 1 ≥768px for jumbo variants; the page's stat cards actually use `text-h3` | | 500 | count-up values |

Rules encoded in the scale:
- **Negative tracking only above 30px; positive micro-tracking (+0.1–0.13px) below 14px.**
- Weight 500 for UI text, 400 for prose. Nothing bold.
- `text-balance` (`text-wrap:balance`) on headings, quotes, and card copy.
- Hero paragraph: 16px mobile → **13px** at ≥1024px (copy gets *smaller* on desktop).

```css
body {
  font-family: var(--font-sans);
  font-size: .8125rem; line-height: 1.25rem; letter-spacing: .13px; font-weight: 400;
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
}
.text-display { font-size: 3rem; line-height: 3.25rem; letter-spacing: -.01em; font-weight: 500; }
.font-display { font-variation-settings: "opsz" 32; }  /* site: "opsz" 48 on xVFDisplay; 32 = Inter max */
.text-h3   { font-size: 2rem; line-height: 2.25rem; letter-spacing: -.32px; font-weight: 500; }
.text-nav  { font-size: .8125rem; line-height: 1.25rem; letter-spacing: .00813rem; font-weight: 500; }
.text-body { font-size: .8125rem; line-height: 1.25rem; letter-spacing: .13px; font-weight: 400; }
.text-faq-answer { font-size: .75rem; line-height: 1.125rem; letter-spacing: .0075rem; font-weight: 500; }
.text-caption { font-size: .6875rem; line-height: 1.125rem; letter-spacing: .11px; font-weight: 400; }
```

## The two-line heading (signature)

Same size, same weight, **color does the hierarchy**:

```html
<header class="section-heading">
  <h2 class="text-h3">Why advertise on X?</h2>
  <p class="text-h3">The internet talks here first</p>
</header>
```
```css
.section-heading { display: flex; flex-direction: column; }
.section-heading > :first-child { color: var(--x-fg-primary); }
.section-heading > :last-child  { color: var(--x-fg-secondary); }
```

Variant: both lines inside one h element as `<span class="block">` pairs (line 2 span gets the secondary color). The hero h1 is a single element with a newline + `white-space:pre-line` — both lines primary there.

## The animated nav weight (signature micro-interaction)

Nav links animate the **variable-font weight axis** instead of color-only states: rest 500 → hover 560 → active 580, over 200ms ease. Hover also sets color to 80% primary.

```css
.nav-wght {
  font-variation-settings: "wght" var(--nav-wght, 500);
  transition: font-variation-settings .2s ease, color .2s ease;
}
@media (hover:hover) {
  .nav-link:hover .nav-wght { --nav-wght: 560; color: color-mix(in oklab, var(--x-fg-primary) 80%, transparent); }
}
.nav-link[aria-current="page"] .nav-wght { --nav-wght: 580; font-weight: 580; color: var(--x-fg-primary); }
@media (prefers-reduced-motion: reduce) { .nav-wght { transition-property: none; } }
```

## The outline wordmark

The giant footer "X.COM" is **SVG stroked letterform paths** (`stroke="currentColor"` on a `text-fg-primary/50` svg), never CSS `-webkit-text-stroke`. See `references/svg/recipes.md` §wordmark for the full construction (4-layer stroke stack + cursor-following glow mask + scroll draw-in). If you fall back to an SVG `<text>` element instead of vectorized paths, the dash/pathLength draw-in won't work — use a clip-path wipe or opacity reveal (details in `references/svg/recipes.md`).
