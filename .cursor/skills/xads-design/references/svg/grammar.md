# Drawing grammar

Every rule reconciled against live extraction (2026-08-04) and golden fixtures in `fixtures/golden/`. The old "31 inline SVGs" static extract is superseded — see `INVENTORY.md`.

## ViewBox decision matrix

| Scale | viewBox | preserveAspectRatio | When |
|---|---|---|---|
| **Card miniature (default)** | `-6 -6 84 84` | (default meet) | Benefit-card diagrams; 72×72 content grid, 6-unit padding |
| **Card miniature (variant)** | `-5.75 -5.75 84 84` | meet | Observed on rails diagram (`benefit-mini-01.svg`) |
| **Card miniature (tight)** | `-6 -6 82 82` or `6 6 67 67` | meet | Convergence/funnel variants — content cropped tighter |
| **Product mock** | Camera crop of world coords, e.g. `18 30 244 180` | meet | Format-card ad mocks — drawing keeps world space |
| **Full-bleed panel** | Real pixels, e.g. `0 0 1120 402` | `xMidYMid slice` (cover) or `meet` (fit) | Hero canvas, wordmark |
| **Overflow composition** | Off-center crop, e.g. `345 -35 430 530` | meet + `overflow:visible` | Orbit with center off-canvas |

**Responsive rule:** desktop and mobile are **separate SVG instances** with different geometry, toggled by CSS (`hidden`/`block` at 768px) — not one stretched SVG. Cheap mobile variant: keep geometry, wrap in `transform="rotate(-115.5 cx cy)"` and recrop viewBox.

**Root attributes, always:** `fill="none"` `shape-rendering="geometricPrecision"`. Card minis often add root `stroke-width="0.2"` (inherits to children; explicit 0.5 on elements overrides).

**Accessibility:** Decorative diagrams → `aria-hidden="true"`. Narrative/interactive → `<title>` + appropriate ARIA. Never put meaningful text only inside an aria-hidden graphic.

## Stroke scale ladder

Not two weights — a ladder keyed to scale and role:

| Weight | Role | `vector-effect` | Live freq |
|---|---|---|---|
| **0.5** | Card miniatures, huge backdrop rings, lead-form orbits | — | 101 |
| **1** | Page-scale hero, ticks, callouts, wordmark, solid chords | `non-scaling-stroke` | 13 |
| **0.99–1.319** | Toolbar icons inside product mocks | — | 7 |
| **1.8** | Cursor glyph (only stroke with `stroke-linejoin="round"`) | — | 4 |
| **4** | UI icons on 24×24 (spinner quarter-arc, chevrons) | — | common in non-diagram SVGs |

Caps/joins: **defaults (butt/miter)** everywhere except the cursor. No `stroke-linecap="round"` on schematic dashes.

## Color discipline

Three mechanisms, no literal diagram colors:

1. `stroke="currentColor"` + `class="text-fg-primary"` (or `/50`) on `<svg>`.
2. Direct vars: `stroke/fill="var(--x-fg-primary)"`, secondary `var(--x-fg-secondary)`, skeleton `var(--x-border-normal)`.
3. Knockout fills — **context-dependent** (see table below).

Sanctioned hex exceptions (copy sparingly): verification badge `#E2B719`; particle plate `#09090b`/`#f6f6f4`.

## Knockout context table

| Surface | Knockout fill token | Used for |
|---|---|---|
| Hero canvas, stat panels, hero chips, tick swatches | `var(--x-canvas)` → `#f2f2f2` / `#0d0d0d` | Plate-matched knockouts on canvas-colored surfaces |
| Benefit-card diagram box | `var(--x-bg-primary)` → `#fff` / `#000` | Mini diagrams sit on card primary background |
| Product-mock skeleton UI | `var(--x-illustration-panel)` / `var(--x-illustration-track)` | Bars, dividers, mock panels *inside* browser frames only |

**Canvas-plate trap:** `--x-illustration-panel` resolves to `#141414` in dark mode — a visible seam against `#0d0d0d` canvas. Never use illustration tokens for hero/stat/chip knockouts.

Define once in CSS:

```css
:root { --x-canvas: var(--color-neutral-0); }              /* #f2f2f2 */
[data-theme=dark], .dark { --x-canvas: var(--color-neutral-1100); }  /* #0d0d0d */
```

## Dash vocabulary (exact)

| Pattern | Use |
|---|---|
| `3.2 3.2` | House dash — card connectors, dashed rings (26 live hits) |
| `3 3` | Variant on alternate petals/layers to prevent moiré |
| `14.72 14.72` | Large backdrop rings (r≈235–400) |
| `dash = 2πr/(2n)`, `offset = dash/2` | π-exact orbit: n whole dashes, symmetric on axes (r=200 → `15.70796…` / offset `7.85398…`) |
| `5 5` | Observed on some page-scale elements |
| `pathLength="1" stroke-dasharray="0 1"` | Draw-in hidden pose |
| CSS `repeating-linear-gradient(90deg, currentColor 0 16px, transparent 16px 32px)` | HTML dashed rule when no SVG warranted |

## Node kit (exact sizes)

| Node | Spec |
|---|---|
| Square marker | `<rect x="cx−2" y="cy−2" width="4" height="4">` |
| Diamond | same 4×4 + `transform-box:fill-box; transform-origin:center; rotate(45deg)` |
| Dot | `circle r="2"` |
| Travel/signal dot | `r="1.25"` |
| Waypoint | `r="4.25"` (page scale) |
| Hub ring | `r="9"` + knockout fill + stroke, containing r=2 core |
| Carriage | r=9 ring + r=2 dot (NOT r=5) |
| Target | ring `r="16.25"` + blinking core `r="3.25"` |
| Orbit satellites | `r="6"` |

**Knockout discipline:** every node on a line gets opaque knockout fill so the line breaks behind it.

**Two-state nodes:** stacked twins, not attribute morphs — `data-state="hollow"` (bg fill + stroke) under `data-state="filled"` (`fill="var(--x-fg-primary)"`, animated opacity).

## Connector routing rules

Prefer orthogonal geometry. The schematic look comes from ruler-straight segments, not freehand curves.

| Route type | When | How |
|---|---|---|
| **Ortho (H/V)** | Default for minis | Single `<line>` or `<path M…H…V…>` — axis-aligned only |
| **45° diagonal** | Hub spokes, corner-to-corner | `<line>` at ±45° between grid points |
| **Elbow (L-path)** | Avoid diagonal clutter | `<path M x1 y1 H xm V y2>` — one bend, 90° only |
| **Quadratic (Q)** | Convergence arcs only | `<path M… Q cx cy x2 y2>` — single control point; use sparingly (convergence archetype) |

Rules:
- Connectors meet nodes at node center or edge midpoint — never float offset.
- Dashed connectors = potential/inbound; solid = realized/outbound (throughput/funnel archetypes).
- Alternate `3.2 3.2` and `3 3` on parallel paths at similar angles to reduce moiré.
- Page-scale chords may be solid at stroke 0.5 even when long (lead-form trajectories).

## Tick-mark clusters

Cluster = canvas-color swatch rect (4×12, rotate 90° for horizontal axes) knocking out the axis, then **4 lines, 4 units long, 4 units apart**, stroke-width 1 + non-scaling:

```xml
<g data-part="measurement-mark">
  <rect width="4" height="12" transform="translate(558 109)" fill="var(--x-canvas)"/>
  <line x1="558" y1="108.75" x2="562" y2="108.75" stroke="currentColor"
        stroke-width="1" vector-effect="non-scaling-stroke"/>
  <!-- three more at +4 intervals -->
</g>
```

## Text in SVGs

- **Product-mock text:** outlined vector paths (business names, "Ad", metrics) — animatable per block.
- **Real `<text>` only for callout chips:** `font-size="13"`, weight 500, `dominant-baseline="central"`, 10-unit left inset in 32-unit-tall stroked rect (218×32 in hero). Chip rect fill = `var(--x-canvas)`, stroke 1 + non-scaling.

## Defs

- `clipPath` for viewport windows and animated wipe reveals (rect inside clipPath animates `scaleX(0)→1`).
- `mask` + `radialGradient` for wordmark glow: circle r=142, stops white 0%→40%, transparent 100%.
- One filter in corpus: `<feGaussianBlur stdDeviation="6">`.
- Skeleton UI inside mocks: bars h=8 `var(--x-border-normal)`, panels `rx="4" fill="var(--x-illustration-panel)"`.
