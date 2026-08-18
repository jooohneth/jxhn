# Component recipes

Copy-paste HTML/CSS ports of every component, with exact values from the source. All hover rules belong inside `@media (hover:hover)`. Assumes the token sheet from `tokens.md` and type classes from `typography.md`.

Contents: 1 pill buttons · 2 benefit card · 3 stat card · 4 hero chip · 5 form field · 6 FAQ accordion · 7 sidebar nav · 8 step tabs + media panel · 9 carousel buttons · 10 theme toggle + language pill · 11 testimonial card

## 1. Pill buttons

Three variants, one geometry. **Desktop pills are tiny: 24px tall, 12px padding, 13px text.** Below 768px: 36px / 16px / 15px. Ghost/outline pills (log-in, language): 32px.

```css
.x-btn {
  position: relative; display: inline-flex; align-items: center; justify-content: center;
  gap: .5rem; height: 1.5rem; min-width: 1.5rem; padding-inline: .75rem;
  border-radius: 9999px; border: 0; cursor: pointer; white-space: nowrap; user-select: none;
  font: 500 .8125rem/1.25rem var(--font-sans); letter-spacing: .00813rem;
  transition: color .15s cubic-bezier(.4,0,.2,1), background-color .15s cubic-bezier(.4,0,.2,1),
              border-color .15s cubic-bezier(.4,0,.2,1);
  text-decoration: none;
}
.x-btn svg { width: .75rem; height: .75rem; }
.x-btn:disabled, .x-btn[aria-disabled=true] { cursor: not-allowed; opacity: .7; }
@media (max-width: 767px) {
  .x-btn { height: 2.25rem; min-width: 2.25rem; padding-inline: 1rem;
           font-size: .9375rem; letter-spacing: 0; }
  .x-btn svg { width: 18px; height: 18px; }
}

/* PRIMARY — solid ink, inverts per theme (black-on-light / white-on-dark) */
.x-btn--primary { background: var(--x-button-primary); color: var(--x-fg-inverted); }
@media (hover:hover) { .x-btn--primary:hover { background: var(--x-button-primary-hover); } }
.x-btn--primary:active { background: var(--x-button-primary-pressed); }

/* SECONDARY — 5%-alpha fill, no border */
.x-btn--secondary { background: var(--x-button-secondary); color: var(--x-fg-primary); }
@media (hover:hover) { .x-btn--secondary:hover { background: var(--x-button-secondary-hover); } }
.x-btn--secondary:active { background: var(--x-button-secondary-pressed); }

/* GHOST/OUTLINE — 32px, hairline border, transparent fill */
.x-btn--ghost { height: 2rem; min-width: 2rem; padding-inline: 1rem;
  background: transparent; border: 1px solid var(--x-border-normal); color: var(--x-fg-primary); }
@media (hover:hover) { .x-btn--ghost:hover { background: var(--x-button-ghost-hover); } }
.x-btn--ghost:active { background: var(--x-button-ghost-pressed); }
```

CTA pairs are always primary + secondary side by side, 8px gap: `Get started` `Talk to an Ads expert`. Buttons contain a hidden centered `animate-spin` loading spinner (opacity 0 → 100 while loading; circle at opacity .25, quarter-arc at .75, stroke-width 4).

## 2. Benefit card (hairline top border)

No box — a 1px top rule over open space. Diagram box goes 108px (72px at ≥1024px).

```html
<article class="benefit-card card-grid__item" style="--card-col-start:3; --card-row:2">
  <div>
    <h3 class="text-nav" style="color:var(--x-fg-primary)">Real-time conversations</h3>
    <p class="text-body" style="color:var(--x-fg-secondary); text-wrap:balance">Reach people while they're researching, comparing, and deciding.</p>
  </div>
  <div class="benefit-card__diagram"><!-- references/svg/recipes.md — 84-grid mini-diagram --></div>
</article>
```
```css
.benefit-card { display: flex; flex-direction: column; align-items: flex-start;
  gap: 3rem; border-top: 1px solid var(--x-border-normal); padding-top: 1.5rem; }
.benefit-card__diagram { display: grid; place-items: center; flex-shrink: 0;
  width: 6.75rem; height: 6.75rem; background: var(--x-bg-primary); color: var(--x-fg-primary); }
@media (min-width: 1024px) { .benefit-card__diagram { width: 4.5rem; height: 4.5rem; } }
```

## 3. Stat card (count-up masonry)

Flat panel, **square corners**, background as a separate layer, numeral is `text-h3` (32px — not jumbo; the "big" read comes from the tiny caption next to it). Count-up behavior in `motion.md` §count-up.

```html
<li class="stat-card" style="--h:15.5rem; grid-column:1/span 2; grid-row:2">
  <span class="stat-card__bg" aria-hidden="true"></span>
  <div class="stat-card__content">
    <p class="text-h3 stat-value" data-value="4.74x" style="color:var(--x-fg-primary)">0.00x</p>
    <p class="text-body" style="color:var(--x-fg-secondary); text-wrap:balance">Incremental lift using in-feed video ads.</p>
  </div>
</li>
```
```css
.stat-card { position: relative; overflow: hidden; align-self: end; height: var(--h, 15.5rem); }
.stat-card__bg { position: absolute; inset: 0; background: var(--color-neutral-0); }
[data-theme=dark] .stat-card__bg, .dark .stat-card__bg { background: var(--color-neutral-1100); }
.stat-card__content { position: relative; display: flex; flex-direction: column; gap: .75rem; padding: 1.5rem; }
```

## 4. Hero canvas chip (callout)

In the source these are SVG `<g>` groups inside the hero canvas (rect 218×32 SVG units, 1px non-scaling stroke, fill = canvas color so it knocks out lines behind it, 13px wt-500 text inset 10 from the left, vertically centered). HTML equivalent:

```css
.hero-chip { display: inline-flex; align-items: center; height: 32px; padding-inline: 10px;
  background: var(--color-neutral-0); border: 1px solid var(--x-fg-primary);
  font: 500 13px/1 var(--font-sans); color: var(--x-fg-primary); }
[data-theme=dark] .hero-chip, .dark .hero-chip { background: var(--color-neutral-1100); }
```

Square corners. Chip background must match the canvas panel exactly (`#f2f2f2`/`#0d0d0d`).

## 5. Form field

Fully bordered (NOT underline-style), 9px radius (squircle-multiplied), 40px tall. Focus state = same as hover state (border a30) — the visible focus affordance is the border step plus `:focus-visible` ring.

```html
<div class="field">
  <label class="text-nav" for="fn" style="color:var(--x-fg-primary)">First Name</label>
  <input class="field__input" id="fn" type="text" placeholder="Jane">
</div>
```
```css
.field { position: relative; display: flex; flex-direction: column; gap: .375rem; }
.field__input {
  width: 100%; height: 2.5rem; padding-inline: 1rem;
  border: 1px solid var(--x-border-normal);
  border-radius: calc(9px * var(--x-radius-m, 1));
  background: transparent; color: var(--x-fg-primary); outline: none;
  font: 400 .8125rem/1.25rem var(--font-sans); letter-spacing: .13px;
  transition: color .2s cubic-bezier(0,0,.2,1), border-color .2s cubic-bezier(0,0,.2,1),
              box-shadow .2s cubic-bezier(0,0,.2,1);
}
.field__input::placeholder { color: var(--x-fg-tertiary); }
@media (hover:hover) { .field__input:hover { border-color: var(--x-border-active); } }
.field__input:focus { border-color: var(--x-border-active); }
/* the border step alone (~a10→a30) is NOT a visible keyboard-focus indicator —
   keep the explicit ring or the field fails WCAG 2.4.7 */
.field__input:focus-visible { outline: 2px solid var(--x-ring); outline-offset: 1px; }
.field__input:disabled { pointer-events: none; opacity: .5; }
/* textarea: same recipe + resize:none; padding:12px 16px
   select trigger: same recipe as a button + rotating chevron (.2s, rotate 180 when open) */
```

Form grid: 2 columns, `gap: 24px 12px`; full-width fields span both.

## 6. FAQ accordion

Rows have **no borders**; the open row gets a sliding highlight chip (8px radius, `#f2f2f2`/`#0d0d0d`) — in the source a Framer `layoutId` shared element; in vanilla, animate the chip's translateY between rows or fade per-row. The `+` icon **rotates 90° while its horizontal bar fades out** (plus → single bar, NOT ×), 0.2s ease-out-quint. Answer reveals height 0→auto + opacity, 0.3s.

```html
<li class="faq-row" data-open>
  <span class="faq-row__bg" aria-hidden="true"></span>
  <h3 class="text-nav">
    <button class="faq-row__btn" aria-expanded="true">
      <span style="color:var(--x-fg-primary)">Is there a minimum budget to advertise?</span>
      <svg class="faq-row__icon" viewBox="0 0 16 16" fill="none">
        <rect fill="currentColor" x="7.333" y="2.667" width="1.333" height="10.667" rx="0.2"/>
        <rect class="h-bar" fill="currentColor" x="2.667" y="7.333" width="10.667" height="1.333" rx="0.2"/>
      </svg>
    </button>
  </h3>
  <div class="faq-row__panel"><p class="text-faq-answer" style="color:var(--x-fg-secondary)">No. Start with any budget…</p></div>
</li>
```
```css
.faq-list { display: flex; flex-direction: column; gap: .25rem; list-style: none; padding: 0; }
.faq-row { position: relative; overflow: hidden; border-radius: 8px; padding: 1rem 1.125rem; }
.faq-row__bg { position: absolute; inset: 0; z-index: -1; border-radius: 8px;
  background: var(--color-neutral-0); opacity: 0; transition: opacity .3s cubic-bezier(.23,1,.32,1); }
[data-theme=dark] .faq-row__bg, .dark .faq-row__bg { background: var(--color-neutral-1100); }
.faq-row[data-open] .faq-row__bg { opacity: 1; }
.faq-row__btn { display: flex; width: 100%; align-items: flex-start; justify-content: space-between;
  gap: 1rem; text-align: left; background: none; border: 0; padding: 0; cursor: pointer;
  font: inherit; color: var(--x-fg-primary); }
.faq-row__btn::before { content: ""; position: absolute; inset: 0; }  /* full-row hit area */
.faq-row__icon { margin-top: 1px; width: 1rem; height: 1rem; flex-shrink: 0;
  color: var(--x-fg-primary); transition: transform .2s cubic-bezier(.23,1,.32,1); }
.faq-row[data-open] .faq-row__icon { transform: rotate(90deg); }
.faq-row__icon .h-bar { transition: opacity .2s cubic-bezier(.23,1,.32,1); }
.faq-row[data-open] .faq-row__icon .h-bar { opacity: 0; }
.faq-row__panel { display: grid; grid-template-rows: 0fr;
  transition: grid-template-rows .3s cubic-bezier(.23,1,.32,1); }
.faq-row[data-open] .faq-row__panel { grid-template-rows: 1fr; }
.faq-row__panel > * { overflow: hidden; max-width: 26.5625rem; padding-top: .25rem; margin: 0; }
```

## 7. Sidebar nav link

13px, secondary color at rest; hover ramps variable-font weight 500→560 + color to 80% primary; active pins 580 + full primary. See `typography.md` §nav-weight for the CSS. Structure: `<a>` row (full-pill radius, 4px block padding) wrapping a `<span class="nav-wght text-nav">` (2px×8px padding, max-width 160px). Expandable groups: chevron `size-3.5` rotates; sub-list indents behind a 1px vertical rail (`width:1px; background:var(--x-border-normal)`); expansion animates `grid-template-rows: 0fr→1fr` over .2s ease-out-quint.

## 8. Step tabs with sliding underline

Tabs sit on a hairline `border-bottom`; the active tab's 1px white underline sits at `bottom:-1px` exactly covering the hairline. In the source it's a Framer `layoutId` spring (duration .5, bounce 0) sliding between tabs; vanilla port: one absolutely-positioned underline in the tab-row, translated to the active tab with `transition: transform .5s cubic-bezier(.32,.72,0,1), width .5s`.

```html
<button class="step-tab" aria-selected="true">
  <span class="step-tab__num text-nav">01</span>
  <span class="step-tab__label text-nav">Choose your objective</span>
  <span class="step-tab__underline"></span>
</button>
```
```css
.step-tab { position: relative; display: flex; width: 100%; align-items: center; gap: .5rem;
  white-space: nowrap; text-align: left; padding-bottom: 1rem;
  border: 0; border-bottom: 1px solid var(--x-border-normal);
  background: none; cursor: pointer; outline-offset: 2px;
  transition: color .2s cubic-bezier(0,0,.2,1); }
.step-tab__num { flex-shrink: 0; color: var(--color-neutral-400); }   /* #999 always */
.step-tab__label { min-width: 0; overflow: hidden; text-overflow: ellipsis;
  color: var(--x-fg-secondary); transition: color .2s cubic-bezier(0,0,.2,1); }
.step-tab[aria-selected=true] .step-tab__label { color: var(--x-fg-primary); }
.step-tab__underline { position: absolute; bottom: -1px; left: 0; height: 1px; width: 100%;
  background: var(--x-fg-primary); opacity: 0; }
.step-tab[aria-selected=true] .step-tab__underline { opacity: 1; }
```

Media panel under the tabs (browser-window mock): outer panel `aspect-[15/8]`, `bg: var(--x-bg-secondary)`, border in the *primitive* pair `#f2f2f2`/`#0d0d0d`; inside, a browser frame offset 60px top / 68px left bleeding off right/bottom, 32px title bar with **three 8px square traffic lights** (`#d9d9d9`/`#262626`, 6px gap — squares, not circles); slides crossfade opacity .5s ease-smooth.

## 9. Carousel prev/next buttons

32px transparent circles; hover = 5%-alpha fill + **icon scales 1.1**; chevron path `M17.41 12 10 19.41 8.59 18l6-6-6-6L10 4.59z` (prev rotated 180°); disabled = opacity .7.

```css
.carousel-btn { display: inline-flex; align-items: center; justify-content: center;
  width: 2rem; height: 2rem; padding: 0; border-radius: 9999px; border: 0;
  background: transparent; color: var(--x-fg-primary); cursor: pointer;
  transition: background-color .15s cubic-bezier(.4,0,.2,1); }
.carousel-btn svg { width: 1rem; height: 1rem; transition: transform .2s; }
@media (hover:hover) {
  .carousel-btn:hover { background: var(--x-button-ghost-hover); }
  .carousel-btn:hover svg { transform: scale(1.1); }
}
.carousel-btn:active { background: var(--x-button-ghost-pressed); }
.carousel-btn:disabled { cursor: not-allowed; opacity: .7; }
```

## 10. Theme toggle + language pill

Toggle = fieldset of three 24px icon buttons (monitor/sun/moon, 16px `fill="currentColor"` icons; 36px/24px on mobile). Selected: `background: var(--x-button-secondary); color: var(--x-fg-primary)` + `aria-pressed="true"`. Unselected hover: `background: var(--x-border-hover)`. Language pill = the ghost pill (§1) with a chevron-down. Toggle writes `localStorage.theme` and sets `document.documentElement.dataset.theme`.

## Accessibility notes (this aesthetic's known traps)

The alpha-heavy monochrome style fails audits in predictable places — handle these up front:

- **30%-alpha text (`--x-fg-tertiary`) is decoration-only.** ~1.7:1 contrast. Placeholders are acceptable; real content (copyright lines, status labels, attributions) needs ≥ the a50/a60 tokens. In the dark-mode testimonial, use `neutral-700` (not `neutral-500`) for attribution.
- **Keyboard focus**: never leave `outline: none` on fields — the a10→a30 border step is invisible as a focus cue. Keep the `:focus-visible` ring (2px `--x-ring`).
- **Skip link**: the sticky sidebar puts 8+ tab stops before content — add a visually-hidden-until-focused "Skip to content" link first in `<body>`.
- **Landmarks**: keep `<footer>` outside `<main>` (else no contentinfo landmark); wrap footer link columns in `<nav aria-label="Footer">`.
- **Tabs**: the full ARIA pattern — `role=tab` + `aria-controls`/`aria-selected`, `role=tabpanel` + `aria-labelledby`, arrow-key roving tabindex — and hide inactive grid-stacked copy with `visibility: hidden` (opacity 0 alone leaves it in the accessibility tree).
- **Accordion**: `aria-expanded` + `aria-controls`/panel ids; also set `visibility` or `inert` on collapsed panels; if using a full-row `::before` hit-area, anchor it to the question heading, not the row, or the open answer becomes an unclickable/unselectable button.
- **Carousel dots**: 8px dots need a ≥24px hit target (pad a wrapping button); don't use `role=tablist` unless children are real `role=tab`s; expose the active dot (`aria-current`); autoplay needs a real pause affordance.
- Decorative SVGs: `aria-hidden="true"`, and don't put meaningful text (live metrics, labels) inside an aria-hidden graphic — surface it in HTML too.

## 11. Testimonial card (inverted surface)

The one inverted card: `#141414` in light mode / `#ebebeb` in dark (opposite of everything else). 248px tall, 4 columns wide, square corners.

- Quote: `text-nav`, white (light mode) / black (dark), `max-width: 26rem`, `text-wrap: balance`, vertically centered.
- Attribution: `text-nav` in `--color-neutral-500` (readable on both surfaces).
- Brand logo: 21px-tall CSS-mask span (`background: #fff` / dark `#000`; `mask: url(logo.svg) center/contain no-repeat`).
- Watermark: same mask technique, 224px tall, **5% opacity**, bottom-right, translated 24px out of the card.
- Dots (top-right): **rectangles not circles** — 8px tall, inactive 8px wide, active 24px wide (`transition: width .15s`), containing a 5s linear width-fill progress bar. Autoplay 5s; manual click pauses autoplay 10s. Slide crossfade .4s ease-smooth.
