# Generative composition guide

Turn intent into new X Ads-style diagrams without copying golden fixtures verbatim. Read `grammar.md` for rules; use this file for creative workflow and LLM prompt scaffolds.

## 1. Archetype picker (intent → topology)

| User intent | Pick archetype | Topology signature |
|---|---|---|
| "show growth", "scale", "pipeline" | **Relay / Rails** | N horizontal dashed lines, end squares, r=9 carriages |
| "reach", "converge", "aggregate" | **Convergence** | M dashed spokes (ortho/elbow/Q) → central r=9 hub |
| "attention", "focus", "radial" | **Petals** | 3–4 dashed circles at cardinals + center diamond |
| "target", "precision", "aim" | **Targeting** | Concentric dashed+solid rings + rotating 3-arm mechanism |
| "convert", "funnel", "filter" | **Funnel** | Lattice of squares → two solid arms → box |
| "journey", "path", "orbit" | **Orbit** | Off-canvas dashed rings + solid chords + waypoints |
| "build", "construct", "blueprint" | **Construction** | Axis + circle pairs + ticks + optional callout chips |
| "throughput", "process" | **Throughput** | Dashed in-lines → central node → solid out-lines + r=1.25 signals |

If intent spans two (e.g. "reach and convert"), pick primary topology for layout, secondary for one accent element — never merge two full archetypes in one 84-grid mini.

## 2. Composition steps

Build in this order — each step validates before the next:

1. **Choose scale** — mini (`-6 -6 84 84`) vs page panel (real-pixel viewBox). Set knockout token: `--x-bg-primary` for card minis, `--x-canvas` for hero/stat plates.

2. **Place hub** — Usually center (36,36) on 72-grid. One hub per mini; page panels may have axis origin instead.

3. **Route connectors** — Dashed first (potential). Use ortho/elbow/45° per routing table in `grammar.md`. Max 5–7 connectors in a mini before clutter.

4. **Assign dash/solid** — Inbound/possible = dashed (`3.2 3.2`); outbound/realized = solid. Alternate `3 3` on parallel paths at similar angles.

5. **Place nodes** — Snap to grid points (0, 18, 36, 54, 72). Apply knockout fill on every node touching a line. Hub = r=9 ring + r=2 core. Endpoints = 4×4 squares or r=2 dots.

6. **Add motion** — `.flow` on dashed connectors; `marker-lit` on filled twins; `core-blink` on single hub dots; ring spins only on page-scale orbits. Ship hidden pose in markup.

7. **Label** — `data-part`, `data-group`, `data-pos` on groups. `aria-hidden="true"` if decorative.

## 3. Parameterized prompt scaffolds

### Mini diagram (84-grid)

```
Draw an X Ads benefit-card mini SVG (viewBox="-6 -6 84 84").
Archetype: {{ARCHETYPE}} expressing "{{INTENT}}".
Rules:
- stroke-width 0.5 on all schematic elements
- dashed connectors: stroke-dasharray="3.2 3.2" (alternate "3 3" on parallel paths)
- knockout fill var(--x-bg-primary) on all nodes on lines
- hub: r=9 ring + r=2 core at (36,36) unless archetype dictates otherwise
- node kit only: 4×4 squares, r=2 dots, r=1.25 travel dots
- fill="none" shape-rendering="geometricPrecision" aria-hidden="true"
- include data-part/data-group labels
- add class="flow" on dashed lines, marker-lit on filled twins
Output: complete <svg>…</svg> only, no prose.
```

### Page-scale panel

```
Draw an X Ads page-scale schematic SVG for a {{PANEL_SIZE}} panel.
Archetype: {{ARCHETYPE}} expressing "{{INTENT}}".
Rules:
- page strokes: stroke-width="1" vector-effect="non-scaling-stroke"
- backdrop rings: stroke-width 0.5, dash 14.72 or π-exact for r=
- knockouts on hero/stat plates: fill="var(--x-canvas)"
- tick clusters: 4×12 swatch + 4 lines at 4-unit pitch
- ship hidden pose: pathLength draw-ins, opacity 0 on entering groups
- preserveAspectRatio="xMidYMid slice" for hero, meet for fit panels
Output: complete <svg>…</svg> with <title> describing the narrative action.
```

## 4. Density and moiré rules

- **Max elements in 84-grid:** ~7 connectors, ~8 nodes, 1 hub. More → step up to page panel or simplify.
- **Parallel dashes:** never identical dash phase on >2 paths at same angle — offset with `stroke-dashoffset` or alternate `3.2`/`3` patterns.
- **Concentric rings:** max 2 dashed + 1 solid before visual noise; page-scale only for third ring.
- **Stroke contrast:** don't mix 0.5 and 1 in the same mini — minis are 0.5 only.
- **Whitespace is load-bearing:** leave grid holes empty; the aesthetic is sparse technical drafting.

## 5. Anti-patterns

| Don't | Do instead |
|---|---|
| r=5 "hub" circles | r=9 hub ring + r=2 core |
| Gradients on connectors | Token strokes only |
| `stroke-linecap="round"` on dashes | Default butt caps |
| Freehand Bézier spaghetti | Ortho, elbow, or single Q per convergence arc |
| Hex colors for strokes | `var(--x-fg-primary)` or `currentColor` |
| `--x-illustration-panel` on hero knockouts | `var(--x-canvas)` |
| SMIL `<animate>` | CSS keyframes from `animation.md` |
| One SVG stretched mobile↔desktop | Separate instances, CSS toggle |
| Meaningful text in aria-hidden SVG | Surface text in HTML or remove aria-hidden |
| Eased infinite rotation | Linear only for ambient |

## 6. Lint prompt

After generating, run this audit prompt (or check `lint.md` manually):

```
Audit this SVG against X Ads SVG laws. Report PASS/FAIL per check:
1. Stroke weight matches scale (0.5 mini / 1 page + non-scaling-stroke)
2. Knockout fill correct for context (canvas vs bg-primary vs illustration)
3. Dash period 3.2 3.2 (or documented variant) on potential paths
4. viewBox and root attrs (fill=none, shape-rendering, aria-hidden if decorative)
5. Hidden pose present if animated (pathLength, opacity, twins)
6. Reduced-motion CSS branch exists for any animation class
7. No SMIL, no round caps on schematic strokes, token colors only
8. Node kit sizes exact (4×4, r=2, r=9 hub, r=1.25 travel)
List specific line/element failures with fixes.
```

Reference archetypes in `fixtures/golden/` when output fails lint — diff against the closest golden fixture.
