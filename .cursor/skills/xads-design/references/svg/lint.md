# SVG lint checklist

Machine-checkable audit before shipping. Run manually or via the lint prompt in `generative.md`.

## Stroke weight per scale

| Context | Required | FAIL if |
|---|---|---|
| Benefit-card mini (viewBox ∋ 84) | `stroke-width="0.5"` on all schematic elements | Any 1+ stroke without documented exception |
| Page-scale hero/ticks/callouts | `stroke-width="1"` + `vector-effect="non-scaling-stroke"` | Missing non-scaling on responsive paths |
| Product-mock icons | 0.99–1.319 | Arbitrary values outside ladder |
| Cursor glyph | 1.8, may use `stroke-linejoin="round"` | Any other join override |
| UI icons (24×24) | 4 | N/A for diagram SVGs |

## Knockout on line intersections

- [ ] Every node sitting on a connector has opaque knockout fill
- [ ] Card mini knockouts use `var(--x-bg-primary)`
- [ ] Hero/stat/chip/tick knockouts use `var(--x-canvas)` (NOT `--x-illustration-panel`)
- [ ] Illustration tokens only inside product-mock skeleton UI
- [ ] Hub rings use r=9 (not r=5 or other arbitrary radius)

## Dash period

- [ ] Potential/inbound paths: `stroke-dasharray="3.2 3.2"` (or `3 3` on alternates)
- [ ] Realized/outbound paths: solid (no dasharray)
- [ ] Large rings: `14.72 14.72` or π-exact `2πr/(2n)` with half-dash offset
- [ ] Parallel paths at similar angle use different dash or offset (moiré check)

## viewBox and root attrs

- [ ] Mini default: `viewBox="-6 -6 84 84"` (variants documented if different)
- [ ] `fill="none"` on root
- [ ] `shape-rendering="geometricPrecision"`
- [ ] Decorative: `aria-hidden="true"`
- [ ] Narrative: `<title>` present, not aria-hidden
- [ ] Page panels: appropriate `preserveAspectRatio` (slice vs meet)

## Hidden pose (if animated)

- [ ] Draw-ins: `pathLength="1" stroke-dasharray="0 1"` + `opacity="0"` or `.draw` class
- [ ] Pop-ins: `transform:scale(0)` on entering nodes
- [ ] Twin-state: stacked hollow + filled, not single-element fill animation
- [ ] Rotating groups: `transform-box: fill-box; transform-origin: center`

## Reduced motion

- [ ] Every `@keyframes` animation has `@media (prefers-reduced-motion: reduce)` branch
- [ ] Draw-ins degrade to opacity-only (not stuck at stroke-dashoffset: 1)
- [ ] Ambient loops stop (`animation: none`)

## Prohibited patterns

- [ ] No SMIL (`<animate>`, `<animateTransform>`)
- [ ] No `stroke-linecap="round"` on schematic dashes (cursor excepted)
- [ ] No hex stroke/fill colors except `#E2B719` badge and particle plate pair
- [ ] No decorative gradients (wordmark glow mask excepted)
- [ ] No arbitrary node sizes outside kit (4×4, r=2, r=1.25, r=4.25, r=9, r=16.25)

## Token colors only

- [ ] Strokes: `currentColor`, `var(--x-fg-primary)`, `var(--x-fg-secondary)`, `var(--x-border-normal)`
- [ ] Fills: token vars or knockout tokens above — no `#666`, `#999` on diagram elements
- [ ] Theme inheritance works: no raw `var(--color-neutral-0)` without `--x-canvas` wrapper

## Quick PASS criteria

All checks pass → ship. Any FAIL → fix or document exception with live-source citation from `fixtures/golden/INVENTORY.md`.
