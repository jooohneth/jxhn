# Recipes — worked examples

Copy-paste starting points in the house language. **Prefer golden fixtures** (`fixtures/golden/*.svg`) for source-faithful geometry; simplified templates below are a **teaching subset** — adapt coordinates, keep the grammar.

## Parameterized mini template

Replace `{{CONNECTORS}}`, `{{NODES}}`, `{{HUB}}` when generating:

```html
<svg width="84" height="84" viewBox="-6 -6 84 84" fill="none"
     xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision"
     stroke-width="0.2" aria-hidden="true">
  <g data-group="connectors">{{CONNECTORS}}</g>
  {{NODES}}
  {{HUB}}
</svg>
```

Connector line pattern:

```xml
<line class="flow" data-part="connector" x1="{{x1}}" y1="{{y1}}" x2="{{x2}}" y2="{{y2}}"
      stroke="var(--x-fg-primary)" stroke-width="0.5" stroke-dasharray="3.2 3.2"/>
```

Hub pattern (always r=9, NOT r=5):

```xml
<g data-group="hub">
  <circle data-part="ring" cx="36" cy="36" r="9"
          fill="var(--x-bg-primary)" stroke="var(--x-fg-primary)" stroke-width="0.5"/>
  <circle data-part="center-dot" cx="36" cy="36" r="2" fill="var(--x-fg-primary)"/>
</g>
```

Mount in benefit card: 108px (72px ≥1024px), `background: var(--x-bg-primary); color: var(--x-fg-primary)`.

---

## Relay (growth / horizontal flow)

**Golden:** `fixtures/golden/benefit-mini-01.svg` — three horizontal dashed rails, 4×4 end squares, r=9 carriage + r=2 core per rail.

Teaching subset: one rail with left square node, dashed connector, hub at center, two diagonal out-lines to r=2 dots. See README quick-intent table.

Key facts from golden: carriage uses **r=9 ring**, rows at y≈9/36/63 on the 72-grid, dash offset alternates direction per row.

---

## Rails (parallel channels)

Same as relay — multiple horizontal dashed lines at equal vertical spacing, end-nodes at both edges, one carriage per rail sliding along the dashed path. Use `3.2 3.2` on all rails; reverse dash-flow direction on alternate rows.

---

## Convergence (reach / hub)

**Golden:** `fixtures/golden/benefit-mini-02.svg`, `benefit-mini-06-82grid.svg`

Five dashed connectors (1 straight, 2 quadratics, 2 elbows) converging on knockout hub r=9 at center. Endpoints alternate r=2 dots and 4×4 squares with hollow+lit twins. Tighter grid variant uses `viewBox="-6 -6 82 82"`.

---

## Petals (attention)

**Golden:** `fixtures/golden/benefit-mini-04.svg`

Four dashed circles r≈17 at cardinals, center diamond (4×4 rotated 45°) knocked out in `var(--x-bg-primary)`, twin-state r=2 nodes on each petal. Use `3 3` dash on two petals, `3.2 3.2` on the other two to avoid moiré.

---

## Targeting (precision)

**Golden:** `fixtures/golden/benefit-mini-03.svg`

Dashed ring r=35 (`3.2 3.2`) + solid knockout ring r=23 + 3-arm mechanism at 120° ending in counter-rotated 4×4 squares (60s spin) + r=9 hub + r=2 core.

---

## Funnel (conversion)

**Golden:** `fixtures/golden/benefit-mini-05-67grid.svg` (`viewBox="6 6 67 67"`)

7-node lattice (4×4 squares) joined by dashed connectors, two solid arms funneling into 18×18 box outline containing 4×4 figure. Nodes may morph square→diamond→circle (see `animation.md`).

---

## Hero construction-circle (page scale)

**Golden:** `fixtures/golden/hero-panel-1120x402.svg`

Axis + mirrored circle pairs + tick clusters + center node + callout chips. Page scale stroke 1 + non-scaling; tick swatches and chip rects fill `var(--x-canvas)`.

Simplified teaching geometry:

```html
<svg viewBox="0 0 800 300" fill="none" preserveAspectRatio="xMidYMid slice"
     shape-rendering="geometricPrecision" style="color: var(--x-fg-primary)">
  <!-- axis paths with pathLength="1" class="draw" -->
  <!-- construction circle pairs, r stepping ~×0.78, ×0.5 -->
  <!-- tick cluster with fill="var(--x-canvas)" swatch -->
  <!-- callout: rect fill var(--x-canvas), stroke 1 non-scaling, text 13px wt 500 -->
</svg>
```

Timeline: axis draw 1.05s → ticks fade as draw-front passes → circles draw-while-rotate → center pop → callouts fade ~1.5s. See `animation.md`.

---

## Orbit / trajectory (journey)

**Golden:** `fixtures/golden/orbit-credit-diagram.svg`, `large-panel-carousel.svg`

Dashed rings with center off-canvas, solid trajectory chords, waypoint dots r=4.25, blinking target r=16.25 + core r=3.25. Backdrop rings: `stroke-dasharray="14.72 14.72"`, spin 169s cw/ccw. Single-orbit variant: π-exact dash on r=200, satellites r=6 on 95s spin.

---

## Outline wordmark

**Reference:** footer X.COM — `viewBox="0 0 1392 318"`. Vectorize lettering as compound path; stack base (50% ink draw-in) + glow mask (cursor-following radial, three stroke weights 2.5/1.5/0.75). See `animation.md` for scroll entrance and hover; full markup pattern in workspace analysis `svg-system.md` §wordmark if needed.

If using `<text>` instead of paths: pathLength draw-in won't work — use clip-path wipe or opacity fade (`typography.md` §wordmark).
