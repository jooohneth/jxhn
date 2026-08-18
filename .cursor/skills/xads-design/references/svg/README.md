# X Ads SVG illustration system

Line-art schematic diagrams in the technical-drafting language of [business.x.com/en/advertising](https://business.x.com/en/advertising). Reverse-engineered from live page extraction (2026-08-04): **~73 `<svg>` elements**, **~20 diagram-like** (viewBox∋84 | width>100 | stroke-dasharray | data-part). Nine golden fixtures saved under `fixtures/golden/`.

The old "31 SVG" count was a static HTML extract; the live page has grown. Use `fixtures/golden/INVENTORY.md` for measured stroke/dash/viewBox frequencies.

## When to read which file

| File | Read when… |
|---|---|
| **`grammar.md`** | Drawing anything — viewBox matrix, stroke ladder, dash vocabulary, node kit, knockout context, connector routing |
| **`recipes.md`** | Copy-paste starting points — one archetype per topology; golden fixtures for source-faithful geometry |
| **`animation.md`** | Animating — shared clock, **measured** `hero-pipeline-dot-outward` / post-wall / JS-driven targeting spins, hidden pose, ambient CSS, reduced motion |
| **`generative.md`** | Creating *new* diagrams from intent — archetype picker, composition steps, prompt scaffolds, density rules |
| **`lint.md`** | Auditing output — machine-checkable checklist before shipping |

Page chrome (tokens, type, layout, components) lives in sibling references. This folder owns everything inside `<svg>`.

## The seven laws (reconciled)

1. **Two inks + theme tokens.** Strokes/fills use `var(--x-fg-primary)` or `currentColor`; knockouts use context-appropriate plate tokens (see knockout table in `grammar.md`). Grays come from alpha tokens (`--x-fg-secondary`, `--x-border-normal`) or illustration tokens (`--x-illustration-panel/track`) inside product mocks only. Sanctioned hex exceptions: gold badge `#E2B719`; particle plate `#09090b`/`#f6f6f4`. SVGs inherit theme through tokens — no hard-coded theme colors.

2. **Stroke scale ladder** (not binary). Live diagram corpus frequencies (2026-08-04):
   - **0.5** — 101 hits: card miniatures, large backdrop rings, lead-form orbits
   - **1** + `vector-effect="non-scaling-stroke"` — 13 hits: page-scale hero, ticks, callouts, wordmark
   - **0.99–1.319** — mock toolbar icons inside product UI
   - **1.8** — cursor glyph (single explicit `stroke-linejoin="round"`)
   - **4** — UI icons on 24×24 viewBox (spinner, chevrons)
   Default caps/joins: butt/miter — square-cut dashes are the look.

3. **Dashed = potential, solid = realized.** Inputs, orbits, possibilities are dashed (`3.2 3.2` at card scale); outputs, structure, results are solid. Large circles: `dash = circumference / (2 × n)`, offset by half a dash to center on axes.

4. **Fixed node kit.** 4×4 squares (`x = cx−2`), r=2 dots, r=9 hub rings with r=2 core, r=1.25 travel dots, r=4.25 waypoints. Diamond = 4×4 rotated 45°. Every node on a line is knocked out.

5. **84-grid default; live variants exist.** Canonical minis: `viewBox="-6 -6 84 84"` (72×72 content, center 36,36). Also observed: `-5.75 -5.75 84 84`, `-6 -6 82 82`, `6 6 67 67`. Page panels use real-pixel viewBoxes with `preserveAspectRatio`.

6. **Shared clock.** All ambient motion derives from `unitsPerSecond = 2π·35/169 ≈ 1.301`: dash flow ~4.92s per 6.4-unit cycle, rings 169s (or 95s/60s singletons), blinks 6s hold–flip–hold. Entrances use `[.32,.72,0,1]`. Details in `animation.md`.

7. **Ship the hidden pose.** Static markup carries pre-animation state: `opacity="0"`, `pathLength="1" stroke-dasharray="0 1"`, `transform:scale(0)`, stacked twin-state nodes. Label with `data-part`/`data-group`. Decorative: `aria-hidden="true"`.

## Don't

- No SMIL — CSS or JS only
- No eased infinite loops — ambient is linear
- No hex colors (except sanctioned exceptions), no decorative gradients
- No round line caps on schematic strokes
- No arbitrary node sizes
- Always branch `prefers-reduced-motion`

## Quick intent → topology

| Intent | Archetype | Golden fixture |
|---|---|---|
| Growth / relay | Horizontal dashed rails + carriage (r=9) | `benefit-mini-01.svg` |
| Reach / convergence | Dashed connectors → knockout hub | `benefit-mini-02.svg` |
| Attention | Dashed petal circles + center diamond | `benefit-mini-04.svg` |
| Targeting | Concentric rings + rotating arms | `benefit-mini-03.svg` |
| Funnel / conversion | Node lattice → solid arms → box | `benefit-mini-05-67grid.svg` |
| Journey / orbit | Off-canvas dashed rings + solid chords | `orbit-credit-diagram.svg`, `large-panel-carousel.svg` |
| Construction / hero | Axis + circle pairs + ticks + chips | `hero-panel-1120x402.svg` |

For generative composition from scratch, start with `generative.md`. For motion playground (not fidelity proof), open `fixtures/svg-demo.html`.
