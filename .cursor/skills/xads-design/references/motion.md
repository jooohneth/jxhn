# Motion — easings, reveals, loops

The source drives motion with Framer Motion; this file gives both the source constants and vanilla CSS/JS ports. SVG-specific animation (draw-ins, dash flow, orbits, ambient CSS) lives in `references/svg/animation.md`.

## The easing vocabulary

Two curves rule everything, shared verbatim between CSS tokens and the JS motion module:

```css
:root {
  --ease-smooth:    cubic-bezier(.32, .72, 0, 1);  /* THE entrance/crossfade ease */
  --ease-out-quint: cubic-bezier(.23, 1, .32, 1);  /* exits, count-up, accordions, micro-UI */
  --ease-out:       cubic-bezier(0, 0, .2, 1);     /* plain color/border transitions */
  /* default transitions: cubic-bezier(.4,0,.2,1) at .15s (Tailwind default — used for button colors) */
}
html { scroll-behavior: smooth; }   /* gated by prefers-reduced-motion in source */
```

Duration bands:
| Band | Duration | Used for |
|---|---|---|
| micro | .13–.2s | button colors, icon rotations, weight ramps, FAQ icon |
| panel | .3s | accordions, mobile-nav wipe, FAQ highlight/height |
| swap | .4s | carousel crossfades (exit .2s) |
| media | .5s | mockup panel crossfades (ease-smooth) |
| enter | **.55s** | the house entrance |
| count | .6s | stat count-up |
| draw | 1.05–1.6s | SVG path draw-ins |
| ambient | 4.9–169s | linear infinite loops (see `references/svg/animation.md`) |

Springs only where physical: tab underline `{spring, duration:.5, bounce:0}`, button layout `{spring, visualDuration:.25, bounce:.25}`, hero axis draw `{spring, duration:1.05, bounce:0}`.

## The house entrance (viewport reveal)

`opacity:0, y:10px → 1, 0` over 0.55s ease-smooth, children staggered **80ms** after a 100ms lead-in, triggered **once** at **`threshold: 0`** with **`rootMargin: '0px 0px -15% 0px'`** — not threshold 0.3 (tall sections never reach 30% on mobile). Rules (`scaleX`) and pop-nodes (`scale .92→1, delay .5, .25s`) join the same variant group.

```html
<section data-reveal>
  <h2 data-reveal-item>Get $25</h2>
  <p  data-reveal-item>in free ad credit</p>
  <a  data-reveal-item class="x-btn x-btn--primary">Claim Credits</a>
</section>
```
```css
[data-reveal-item] { opacity: 0; transform: translateY(10px);
  transition: opacity .55s var(--ease-smooth), transform .55s var(--ease-smooth);
  transition-delay: calc(.1s + var(--i, 0) * .08s); }
.revealed [data-reveal-item] { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { [data-reveal-item] { transform: none; } }
```
```js
document.querySelectorAll('[data-reveal]').forEach(sec =>
  sec.querySelectorAll('[data-reveal-item]').forEach((el, i) => el.style.setProperty('--i', i)));
// threshold 0 + negative bottom rootMargin, NOT threshold .3 on whole sections:
// a section taller than ~3x the viewport can never reach 30% intersection, so a
// fractional threshold silently strands its children at opacity 0 (worst on mobile).
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
}), { threshold: 0, rootMargin: '0px 0px -15% 0px' });
document.querySelectorAll('[data-reveal]').forEach(s => io.observe(s));
```

Discipline: reveal *sections*, not every element on the page. The hero animates on mount (not scroll); benefit diagrams, orbit section, stats, and the footer wordmark reveal on scroll — body copy mostly just sits there.

## Count-up stats (exact port)

Duration .6s, ease-out-quint, stagger 80ms, triggered once at 40% visibility of the stats container. Value strings keep prefix/suffix and decimal places ("4.74x" counts 0.00x → 4.74x).

```js
const outQuint = t => 1 + (--t) * t * t * t * t;
function countUp(el, delay = 0) {
  const raw = el.dataset.value ?? el.textContent;
  const m = raw.match(/-?\d+(?:\.\d+)?/); if (!m) return;
  const dec = (m[0].split('.')[1] || '').length;
  const pre = raw.slice(0, m.index), suf = raw.slice(m.index + m[0].length);
  const target = parseFloat(m[0]), D = 600;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = raw; return; }
  el.textContent = pre + (0).toFixed(dec) + suf;
  let start;
  requestAnimationFrame(function tick(now) {
    if (start === undefined) start = now + delay * 1000;
    const t = Math.min(Math.max((now - start) / D, 0), 1);
    el.textContent = pre + (target * outQuint(t)).toFixed(dec) + suf;
    if (t < 1) requestAnimationFrame(tick);
  });
}
const statsIO = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; statsIO.unobserve(e.target);
  e.target.querySelectorAll('.stat-value').forEach((el, i) => countUp(el, i * .08));
}), { threshold: 0, rootMargin: '0px 0px -20% 0px' });   // not a fractional threshold — tall grids never hit it
document.querySelectorAll('.stats-grid').forEach(s => statsIO.observe(s));
```

Progressive enhancement: put the REAL values in the markup (`4.74x`, not `0.00x`) and let `countUp` reset them to 0 before animating — without JS the page must show correct numbers, not placeholders.

## Ambient loops (SVG)

Linear, glacial, never eased. **Full ambient CSS** (spin, dash-flow, on-off, core-blink, float) lives in `references/svg/animation.md` — not duplicated here.

## The three source keyframes

```css
@keyframes spin { to { transform: rotate(360deg) } }                                    /* loading spinner, 1s linear infinite */
@keyframes nav-item-in { 0% { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: translateY(0) } }
@keyframes checkmark { 0% { stroke-dashoffset: 24px } to { stroke-dashoffset: 0 } }     /* .25s ease-out; path has dasharray 24px */
```

Mobile-nav stagger: items get `animation: nav-item-in .3s var(--ease-out-quint) both` with `animation-delay: calc(var(--i) * 40ms)`; the pinned CTA buttons start at `300ms + i*40ms`. The nav sheet itself wipes via `clip-path: inset(0 0 100% 0) → inset(0 0 0 0)`, .3s ease-out-quint, over a `rgba(0,0,0,.4)` + 2px-blur backdrop.

## Carousels

- **Testimonial**: autoplay 5s (`setInterval`); manual dot click pauses autoplay 10s (clear any pending resume timeout on each click so they don't stack). Slides crossfade .4s ease-smooth (exit .2s). Active dot 8→24px wide (`transition: width .15s`) containing a 5s linear width-fill. Vanilla port of the in-dot progress:

```css
.dot { position: relative; height: 8px; width: 8px; overflow: hidden; border: 0; padding: 0;
  background: var(--color-neutral-900); cursor: pointer; transition: width .15s; }
[data-theme=dark] .dot, .dark .dot { background: var(--color-neutral-100); }
.dot[aria-current="true"] { width: 24px; }
.dot__bar { position: absolute; inset-block: 0; left: 0; width: 0; background: var(--color-neutral-0); }
[data-theme=dark] .dot__bar, .dark .dot__bar { background: var(--color-neutral-1000); }
@keyframes dot-fill { from { width: 0 } to { width: 100% } }
.dot[aria-current="true"] .dot__bar { animation: dot-fill 5s linear; }
/* JS: re-set aria-current each slide change; restart the bar by toggling the attribute
   (or el.style.animation = 'none'; el.offsetHeight; el.style.animation = ''). Give the
   8px dot a ≥24px hit area via padding + background-clip or a wrapping button. */
```
- **Steps**: underline slides between tabs (spring .5s bounce 0); mockup slides crossfade opacity (.4s ease-smooth or .5s CSS class-swap); copy paragraphs grid-stacked (`col-start-1 row-start-1`) crossfading .4s.

## Micro-interactions inventory

- Button hover: background token swap, .15s. Icon-in-button hover: `scale(1.1)` (.2s); with tilt: `rotate(7deg)`.
- Nav link hover: variable-weight 500→560 + color, .2s ease.
- Chevrons: `rotate(180deg)` .2s when open.
- FAQ icon: rotate 90° + h-bar fade, .2s ease-out-quint.
- Popovers: `opacity 0/scale .96/y 4 → 1/1/0`, .13s ease-out-quint, transform-origin toward anchor.
- Form fields: border-color .2s ease-out on hover/focus.
- Footer wordmark hover: cursor-following radial glow (see `references/svg/recipes.md` §wordmark + `animation.md`).

## Reduced motion is first-class

Every reveal/loop needs a `prefers-reduced-motion` branch: transforms become opacity-only or none, count-up renders the final value immediately, ambient loops stop, `scroll-behavior` stays auto. The source gates *every* animated component this way — do the same.
