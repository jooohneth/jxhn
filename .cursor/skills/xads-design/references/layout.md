# Layout — shell, grids, rhythm

Base unit: `--spacing: .25rem` (4px). All utility numbers below resolve against it.

## Breakpoints

| Name | Query | Notes |
|---|---|---|
| `mobile` | ≥640px | |
| `tablet` | ≥768px | sidebar appears; hero canvas appears |
| `tablet-wide` | ≥960px | aspect-ratio steps |
| `tablet-lg` | ≥1024px | **the big one** — 8-col grids activate, section rhythm switches |
| `max-tablet` | <768px | mobile header/pills |

Containers: shell clamp **90rem (1440px)**, content column **72rem (1152px)**, sidebar **13rem (208px)**.

## Page shell — sticky sidebar + content column

```
┌────────────── max-width 1440px, centered ──────────────┐
│ ┌ sidebar 208px ┐ ┌───────── main (flex-1) ──────────┐ │
│ │ sticky top-0  │ │  sticky 48px scroll-fade scrim   │ │
│ │ h-100svh p-24 │ │ ┌── article max-w 1152px px-16 ─┐│ │
│ │ logo          │ │ │  sections                     ││ │
│ │ nav links     │ │ └───────────────────────────────┘│ │
│ │ CreateAd+user │ │  footer (full main width)        │ │
│ └───────────────┘ └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

```css
.shell   { margin-inline: auto; display: flex; flex-direction: column;
           min-height: 100svh; width: 100%; max-width: 90rem; }
.sidebar { display: none; }
.main    { position: relative; display: flex; flex-direction: column;
           flex: 1; min-width: 0; padding-top: 4rem; }   /* clears 64px mobile header */
.article { margin-inline: auto; display: flex; flex-direction: column;
           width: 100%; max-width: 72rem; padding-inline: 1rem; gap: 3.5rem; flex: 1; }
.sections { display: flex; flex-direction: column; gap: 100px; }  /* <1024 only */
.section-anchor { scroll-margin-top: 6rem; }

@media (min-width: 768px) {
  .shell { flex-direction: row; }
  .main  { padding-top: 0; }
  .sidebar { position: sticky; top: 0; display: flex; flex-direction: column;
             justify-content: space-between; align-self: flex-start;
             height: 100svh; width: 13rem; flex-shrink: 0;
             overflow-y: auto; padding: 1.5rem; }
}
@media (min-width: 1024px) { .sections { gap: 0; } }

/* sticky scroll-fade scrim: first child of .main, desktop only */
.scrim-top { pointer-events: none; position: sticky; top: 0; z-index: 10;
  height: 3rem; margin-bottom: -3rem; flex-shrink: 0;
  background: linear-gradient(to bottom, var(--x-bg-primary), transparent); }
```

Sidebar internals: X logo 26px top; nav list; pinned bottom = "Create Ad" pill + user chip. Sidebar is **sticky, not fixed** — it participates in the centered 1440px shell.

Mobile (<768px): fixed 64px header `bg-bg-primary/80 backdrop-blur-md`, hamburger opens a sheet wiped in with `clip-path: inset(0 0 100% 0) → inset(0 0 0 0)` over .3s ease-out-quint; items stagger in 40ms apart (`nav-item-in` keyframe).

## The 8-column grid — one grid, three expressions

Everything at ≥1024px sits on `repeat(8, minmax(0,1fr))` with **16px gutters**. Cards always span 2 columns; wide elements span 4 or 6.

### `.grid-8` — always-on (hero, lead form)

```css
.grid-8 { display: grid; grid-template-columns: repeat(8, minmax(0,1fr)); gap: 1rem; }
```
- Hero h1: `grid-column: span 6`.
- Hero copy + CTA block: columns **5–7** at ≥1024px (`col-span-3 col-start-5`) — right-offset with column 8 left empty.
- Lead form: illustration = 4 cols, field block = 4 cols (nested 2-col field grid, gap 12px×24px).

### `.card-grid` — checkerboard benefit cards

Base: 2 cols, 28px×64px gaps. ≥1024px: 8 cols, 16px×48px gaps; heading spans row 1 + 32px margin. Placement is driven by custom properties per item:

```css
.card-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr));
             column-gap: 1.75rem; row-gap: 4rem; }
.card-grid__heading { grid-column: 1 / -1; }
@media (min-width: 1024px) {
  .card-grid { grid-template-columns: repeat(8, minmax(0,1fr));
               column-gap: 1rem; row-gap: 3rem; }
  .card-grid__heading { grid-area: 1 / 1 / auto / -1; margin-bottom: 2rem; }
  .card-grid__item { grid-column: var(--card-col-start, auto) / span var(--card-col-span, 2);
                     grid-row: var(--card-row, auto); }
}
```
```html
<article class="card-grid__item" style="--card-col-start:3; --card-row:2">…</article>
```

The canonical 6-card checkerboard: row 2 starts at columns **3 / 5 / 7** (cols 1–2 empty), row 3 at **1 / 3 / 5** (cols 7–8 empty) — a diagonal step down-left.

### Stats masonry — bottom-aligned fixed heights

8 cols × 2 rows; every card `align-self: end` with a **fixed height**, producing the skyline:

| card | placement | height |
|---|---|---|
| stat A | col 1, row 2 | 248px |
| stat B | col 3, rows 1–2 | 408px |
| stat C | col 5, row 1 | 248px |
| stat D | col 7, row 1 | 328px |
| testimonial | cols 5–8, row 2 | 248px |

Row 1 columns 1–2 stay **empty**. Below 1024px: plain flex column, 16px gap. The section's two-line heading sits **above** the masonry grid (in the section's normal flow with the standard 56px gap), not inside the grid.

### FAQ split

≥1024px: heading block = columns 1–4, accordion list = columns 5–8.

### Format cards — `display:contents` alternation

Each `<li>` (media panel + text block) becomes `display:contents` at ≥1024px so panels flatten into the parent 8-col grid, two cards per row (2+2 cols each + their text). Wide items break rhythm: media spans columns 3–6 (`aspect-[7/3]`), text 7–8, columns 1–2 empty. Regular media panels are `aspect-[7/6]`. Mobile alternates media/text order per item with `order` swaps.

## Section vertical rhythm

Below 1024px: flat **100px gap** between all sections. At ≥1024px, gap 0 — rhythm comes from each section's own padding, in two regimes:

| Regime | Sections | Pattern |
|---|---|---|
| **Whitespace half** (top) | hero, benefits, ad-credit, stats | no border; pt 80–120px, exits up to **pb 200px** |
| **Ruled half** (bottom) | steps, formats, FAQ, footer | `border-top: 1px solid var(--x-border-normal)`; pt 42px mobile / 80–100px desktop |

```css
.section        { padding-block: 1rem; }
.section--ruled { border-top: 1px solid var(--x-border-normal); padding-top: 42px; }
@media (min-width: 1024px) {
  .section        { padding-top: 7.5rem; padding-bottom: 12.5rem; }  /* 120 / 200 */
  .section--ruled { padding-top: 5rem;   padding-bottom: 7.5rem; }   /* 80 / 120 */
}
```

Inside a section: heading block → content = **56px** (`gap-14`). Hero canvas: `aspect-ratio: 1120/402` (≥1024: `1120/462`), full article width, `margin-top: 24px`.

Spacing values actually used: 4, 12, 16, 24, 32, 48, 56, 64, 80, 96, 100, 120, 200px — 4px-based with two arbitrary values (42px ruled-section top, 100px mobile gap).

## Footer

Sits inside `<main>` after the article (spans full main width, own 18→24px inset). `border-t` hairline. Layout: brand column (fixed 160px desktop, contains theme toggle) + link columns (2-col grid mobile → 3-col ≥1024px, gap-x 32 / gap-y 56→40). Bottom: language pill, © line, then the giant outline X.COM wordmark spanning full width (see `references/svg/recipes.md` §wordmark).
