# X Ads SVG Inventory (live extraction)

Source: https://business.x.com/en/advertising
Extracted: 2026-08-04 via browser CDP eval (agent-browser; cursor-ide-browser MCP had no active tab).

## Counts

- **Total `<svg>` on page:** 73
- **Diagram-like SVGs:** 20 (viewBox∋84 | width>100 | stroke-dasharray | data-part)
- **Golden fixtures saved:** 9

## Stroke-width frequencies (diagram SVGs)

| stroke-width | count |
|---|---|
| `0.5` | 101 |
| `1` | 13 |
| `1.2` | 10 |
| `2` | 6 |
| `1.319` | 6 |
| `1.8` | 4 |
| `0.99` | 1 |
| `0.7` | 1 |
| `0.9` | 1 |

## stroke-dasharray frequencies

| dasharray | count |
|---|---|
| `3.2 3.2` | 26 |
| `5 5` | 8 |
| `14.72 14.72` | 4 |
| `3 3` | 2 |
| `0 1` | 2 |
| `15.707963267948966 15.707963267948966` | 1 |

## viewBox list (unique, diagram SVGs)

- `-48 -25.92857142857143 320 172.85714285714286`
- `-5.75 -5.75 84 84`
- `-6 -6 82 82`
- `-6 -6 84 84`
- `0 0 1120 402`
- `0 0 1392 318`
- `0 0 548 379`
- `151.8 -43 460 460`
- `174 8 212 224`
- `18 30 244 180`
- `230.67 5.44 658.67 391.11`
- `24 55 232 130`
- `34 26 212 197`
- `345 -35 430 530`
- `35 51 210 152`
- `36 19 208 203`
- `6 6 67 67`

## Per-SVG inventory

| # | category | viewBox | size | dash | data-part |
|---|---|---|---|---|---|
| 0 | hero-panel | `0 0 1120 402` | × | True | False |
| 1 | other | `230.67 5.44 658.67 391.11` | × | True | False |
| 2 | benefit-mini | `-5.75 -5.75 84 84` | 84×84 | True | True |
| 3 | other | `6 6 67 67` | 67×67 | True | True |
| 4 | benefit-mini | `-6 -6 84 84` | 84×84 | True | True |
| 5 | other | `-6 -6 82 82` | 82×82 | True | True |
| 6 | benefit-mini | `-6 -6 84 84` | 84×84 | True | True |
| 7 | benefit-mini | `-6 -6 84 84` | 84×84 | True | True |
| 8 | orbit-credit | `345 -35 430 530` | 430×530 | True | False |
| 9 | other | `18 30 244 180` | 244×180 | False | True |
| 10 | other | `36 19 208 203` | 208×203 | False | True |
| 11 | other | `174 8 212 224` | 212×224 | False | True |
| 12 | other | `24 55 232 130` | 232×130 | False | True |
| 13 | other | `34 26 212 197` | 212×197 | False | True |
| 14 | other | `35 51 210 152` | 210×152 | False | True |
| 15 | orbit-credit | `-48 -25.92857142857143 320 172.85714285714286` | 320×172.85714285714286 | False | True |
| 16 | large-panel | `0 0 548 379` | 548×379 | True | False |
| 17 | large-panel | `151.8 -43 460 460` | 548×379 | True | False |
| 18 | other | `0 0 1392 318` | × | True | False |
| 19 | other | `0 0 1392 318` | × | True | False |

## Node sizes observed

- 4x4 rect
- r=2 dot
- r=4.25 ring
- r=9 hub

## Knockout fill tokens

- `var(--x-bg-primary)`
- `var(--x-bg-secondary)`
- `var(--x-bg-secondary, #f2f2f2)`
- `var(--x-bg-tertiary)`
- `var(--x-bg-tertiary, #ebebeb)`
- `var(--x-border-hover)`
- `var(--x-border-normal)`
- `var(--x-fg-brand)`
- `var(--x-fg-primary)`
- `var(--x-fg-primary, #09090b)`
- `var(--x-fg-secondary)`
- `var(--x-illustration-panel)`
- `var(--x-illustration-track)`

## Saved golden fixtures

- `benefit-mini-01.svg`
- `benefit-mini-02.svg`
- `benefit-mini-03.svg`
- `benefit-mini-04.svg`
- `benefit-mini-05-67grid.svg`
- `benefit-mini-06-82grid.svg`
- `hero-panel-1120x402.svg`
- `large-panel-carousel.svg`
- `orbit-credit-diagram.svg`
