# Animation architecture

Single source of truth for SVG + illustration motion. Page-level reveals and count-up live in `references/motion.md`; **ambient CSS + measured hero pipelines live here**.

**Last verified live:** 2026-08-04 via CDP on [business.x.com/en/advertising](https://business.x.com/en/advertising). Zero SMIL. Framer Motion / JS drives many transforms; CSS keyframes drive others.

## The shared clock (diagram grammar)

```js
unitsPerSecond = 2π·35/169 ≈ 1.301      // universal flow velocity
DASH_CYCLE     = 6.4                     // 3.2 + 3.2 dash period in user units
FLOW_PERIOD    = DASH_CYCLE / unitsPerSecond ≈ 4.919  // seconds
EASE           = { smooth: [.32,.72,0,1], out: [.23,1,.32,1] }
```

One clock, many hands — dash flow, ring rotation, and blink phasing all derive from the same velocity constant.

### Ambient inventory (grammar + live)

| Duration | Animates | Easing | Drive |
|---|---|---|---|
| **169s** | Backdrop ring pair (dash 14.72), outer cw / inner ccw | linear ∞ | CSS / Framer |
| **95s** | Orbit satellite dots, `rotate:0→−360` | linear ∞, delay .7s | CSS / Framer |
| **60s** | Targeting mechanism arm rotation | linear ∞ | **JS/Framer** — live benefit targeting SVG shows continuously changing `matrix(...)` on `[data-group=mechanism]` and `[data-part=dashed-ring]` with `animation-name: none` |
| **~4.92s** | Dash flow: `stroke-dashoffset: 0 → ±6.4` | linear ∞ | CSS `.flow` |
| **6s** | Hollow↔filled twin blink (`on-off` keyframe) | ease-in-out ∞ | CSS |
| **1.2s** | Core/target fill blink (`core-blink`) | linear ∞ alternate | CSS |
| **3.2s** | Float bob, ±2px | ease-in-out ∞ | CSS |
| **8.9–15.1s** | Hero pipeline travel dots | linear ∞ | **CSS** `hero-pipeline-dot-outward` (measured) |
| **90s** | Post-wall horizontal drift | linear ∞ | CSS `.post-wall-track` |
| **7s** | Post-wall card float | ease-in-out ∞ | CSS `.post-wall-card` |

## Measured live: hero pipeline dots (2026-08-04)

Hero canvas (`viewBox="0 0 1120 402"`) ships circles with class `hero-pipeline-dot` using CSS **`offset-path`** + **`offset-distance`**:

```css
/* Verbatim from live stylesheet */
@keyframes hero-pipeline-dot-outward {
  0%, 7%  { opacity: 0; offset-distance: 0%; }
  10%     { opacity: 1; offset-distance: 0%; }
  28%     { opacity: 1; offset-distance: 100%; }
  32%, 100% { opacity: 0; offset-distance: 100%; }
}

.hero-pipeline-dot {
  /* example inline styles measured on nodes: */
  /* offset-path: path("M560 201 L190.1 -12"); */
  /* animation: hero-pipeline-dot-outward <8.9s|10.7s|12.9s|15.1s> linear infinite; */
  /* animation-delay: ~1.1s–1.46s staggered */
  offset-rotate: 0deg;
}
@media (prefers-reduced-motion: reduce) {
  .hero-pipeline-dot { opacity: 0; animation: none !important; }
}
```

Paths radiate from center `(560, 201)` outward along straight chords (corners / edges). Opacity stays 0 most of the cycle — dots “pulse travel” along the ray.

## Measured live: post-wall strip

```css
.post-wall-track {
  animation: 90s linear 0s infinite normal none running post-wall-drift;
}
.post-wall-card {
  animation: 7s ease-in-out 0s infinite normal none running post-wall-float;
}
@media (hover: hover) and (pointer: fine) {
  .post-wall-track:hover,
  .post-wall-track:focus-within { animation-play-state: paused; }
}
@media (prefers-reduced-motion: reduce) {
  .post-wall-track, .post-wall-card { animation: none; }
}
@keyframes post-wall-drift {
  0% { transform: translate(-50%); }
  100% { transform: translate(0px); }
}
@keyframes post-wall-float {
  50% { transform: translateY(-3px); }
}
```

## Measured live: nav chrome

```css
@keyframes nav-item-in {
  0% { opacity: 0; transform: translateY(4px); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

## Important: JS-driven rotations vs CSS

Benefit-card **targeting** mini: mechanism + dashed ring transforms **change over time** while `getComputedStyle(...).animationName === 'none'`. Agents must not assume every ambient rot is a CSS `@keyframes spin` — Framer/JS often writes `transform: matrix(...)` each frame. When porting without Framer, use CSS `animation: spin 60s|169s linear infinite` on the same groups as a faithful approximation.

### When 6s on-off vs 1.2s core-blink

| Pattern | Use for | Mechanism |
|---|---|---|
| **`on-off` 6s** | Twin-state nodes — hollow/filled rect or dot pairs | Opacity crossfade: `[0,.46,.54,.96,1]` hold–flip–hold on the **filled twin** atop a static hollow twin |
| **`core-blink` 1.2s** | Single-element cores — hub dot, target r=3.25 | Hard fill swap fg↔bg on one circle; no twin stack needed |

Phase-offset siblings: `animation-delay: calc(var(--i) / var(--n) * 6s)`.

### centerPeriod 8.5 — explained

The Framer source defines `ON_OFF_MOTION = { period: 6, centerPeriod: 8.5, … }`. **centerPeriod is a choreography spacing constant** for staggered node groups in multi-diagram layouts — it spaces blink phase offsets across a wider window than the 6s loop itself. In vanilla CSS ports, use simple `calc(i/n * 6s)` delays; reach for 8.5 only when reproducing exact multi-group phasing from the source bundles.

## Viewport triggers (aligned with page policy)

Page reveals use **`threshold: 0`** + **`rootMargin: '0px 0px -15% 0px'`** — NOT `threshold: 0.3`. Tall sections never reach 30% intersection on mobile.

SVG draw-ins and scroll-triggered wordmark entrances follow the same policy:

```js
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
}), { threshold: 0, rootMargin: '0px 0px -15% 0px' });
```

Hero diagram animates **on mount** (not scroll). Benefit minis, orbit section, footer wordmark reveal on scroll.

## Hidden-pose idioms (ship in markup)

| Fingerprint | Meaning |
|---|---|
| `pathLength="1" stroke-dasharray="0 1" opacity="0"` | pathLength draw-in pending |
| `style="transform-box:fill-box;transform-origin:50% 50%;transform:scale(0)"` | pop-in node |
| `style="…transform:rotate(180deg)"` on circle | draw-while-rotate resting state |
| stacked `data-state="hollow\|filled"` twins | opacity crossfade state machine |
| `clipPath > rect style="transform:scaleX(0)"` | wipe reveal |

Groups that rotate/scale need `transform-box: fill-box; transform-origin: center`. Enter + infinite spin: **double-wrap** — outer `<g>` = ambient spin, inner = entrance.

## Full ambient CSS

```css
@keyframes spin-cw  { to { transform: rotate(360deg); } }
@keyframes spin-ccw { to { transform: rotate(-360deg); } }
@keyframes dash-flow { to { stroke-dashoffset: -6.4; } }
@keyframes on-off {
  0%, 46% { opacity: 1; }
  54%, 96% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes core-blink {
  0%, 49% { fill: var(--x-fg-primary); }
  51%, 100% { fill: var(--x-bg-primary); }
}
@keyframes float-y {
  0%, 100% { transform: translateY(-2px); }
  50% { transform: translateY(2px); }
}

.ring-outer  { animation: spin-cw 169s linear infinite; }
.ring-inner  { animation: spin-ccw 169s linear infinite; }
.orbit-dots  { animation: spin-ccw 95s linear infinite .7s; }
.mechanism   { animation: spin-cw 60s linear infinite; }
.flow        { stroke-dasharray: 3.2 3.2; animation: dash-flow 4.919s linear infinite; }
.flow--reverse { animation-direction: reverse; }
.marker-lit  { animation: on-off 6s ease-in-out infinite; }
.core        { animation: core-blink 1.2s linear infinite alternate; }
.float       { animation: float-y 3.2s ease-in-out infinite; }

.ring-outer, .ring-inner, .orbit-dots, .mechanism {
  transform-box: fill-box;
  transform-origin: center;
}

@media (prefers-reduced-motion: reduce) {
  .ring-outer, .ring-inner, .orbit-dots, .mechanism,
  .flow, .marker-lit, .core, .float { animation: none; }
}
```

## Draw-in (pathLength without Framer)

```html
<path d="…" pathLength="1" class="draw"/>
```
```css
.draw { stroke-dasharray: 1 1; stroke-dashoffset: 1; opacity: 0; }
.revealed .draw {
  stroke-dashoffset: 0; opacity: 1;
  transition: stroke-dashoffset 1.6s cubic-bezier(.32,.72,0,1), opacity .4s linear;
}
@media (prefers-reduced-motion: reduce) {
  .draw { stroke-dashoffset: 0; }
  .revealed .draw { transition: opacity .4s linear; }
}
```

Durations: 1.05s axes, 1.6s wordmark, 0.65–1.25s circles (draw-while-rotate: transition both `stroke-dashoffset` and `rotate(180deg)→rotate(35deg)`, left siblings +0.12s delay).

## Twin-state node swap

```html
<g data-group="node">
  <rect data-state="hollow" x="34" y="34" width="4" height="4"
        fill="var(--x-bg-primary)" stroke="var(--x-fg-primary)" stroke-width="0.5"/>
  <rect data-state="filled" class="marker-lit" x="34" y="34" width="4" height="4"
        fill="var(--x-fg-primary)"/>
</g>
```

Hollow twin never animates; filled twin blinks via `on-off`.

## Interactive patterns

- **Wordmark glow:** cursor-following radial mask r=142; base dims 50%→60% on hover, glow stack 0→85%. Map pointer coords into viewBox space.
- **Hero center easter egg:** r=12 logo scales ×6 on hover, text lines rise y:6 staggered.
- **Mock cursor choreography:** shared cursor glyph (fill+stroke fg, stroke 1.8), click feedback = stroke-only circle r=13–14 scaling/fading.

## Reduced motion

Every animated group needs a reduce branch: draw-ins → opacity-only, pop-ins/rotations → plain opacity, ambient loops stop. Treat as first-class variant set, not bolt-on.
