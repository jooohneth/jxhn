# Tokens — color, surfaces, radius, shadows

All values extracted verbatim from business.x.com's compiled CSS. Architecture is 3 layers:

1. **Primitives** — `--color-*`, theme-invariant hex (no oklch anywhere; 8-digit hex for alpha).
2. **Semantics** — `--x-*`, defined twice: light in `:root`, dark in `[data-theme=dark], .dark`. Every semantic is a `var()` onto a primitive.
3. **Usage** — components consume only semantics (with two deliberate exceptions noted below).

## Ready-to-copy token sheet

```css
:root, :host {
  /* ============ PRIMITIVES ============ */
  --color-black: #000;
  --color-white: #fff;
  /* neutrals — surface fills only, never text */
  --color-neutral-0: #f2f2f2;    --color-neutral-50: #ebebeb;
  --color-neutral-100: #d9d9d9;  --color-neutral-300: #b2b2b2;
  --color-neutral-400: #999;     --color-neutral-500: gray;
  --color-neutral-700: #4d4d4d;  --color-neutral-900: #262626;
  --color-neutral-1000: #141414; --color-neutral-1100: #0d0d0d;
  /* hues — status + brand only, never decoration */
  --color-blue-50: #d7f6ff;  --color-blue-500: #1d9bf0;  --color-blue-700: #006fd6;  --color-blue-1100: #02113d;
  --color-plum-50: #fae0fa;  --color-plum-500: #c936cc;  --color-plum-1100: #2d032d;
  --color-magenta-500: #f91880;
  --color-red-50: #fedee3;   --color-red-100: #fdc9ce;  --color-red-300: #f87580;  --color-red-400: #f64b5c;
  --color-red-500: #f4212e;  --color-red-600: #d11a28;  --color-red-700: #ae1425;  --color-red-900: #67070f;  --color-red-1100: #3d0105;
  --color-yellow-50: #fffed7; --color-yellow-500: #ffd400; --color-yellow-1100: #3d1e02;
  --color-green-50: #dbf8eb;  --color-green-500: #00ba7c;  --color-green-1100: #002218;
  /* alpha ramps — THE workhorse. Note white-a5 (~7%) > black-a5 (~5%):
     white hairlines get a boost to read equally on black. */
  --color-white-a5: #ffffff12; --color-white-a10: #ffffff1a; --color-white-a20: #fff3;
  --color-white-a30: #ffffff4d; --color-white-a40: #fff6;    --color-white-a50: #ffffff80;
  --color-white-a60: #fff9;    --color-white-a70: #ffffffb3; --color-white-a80: #fffc;  --color-white-a90: #ffffffe5;
  --color-black-a5: #0000000d; --color-black-a10: #0000001a; --color-black-a20: #0003;
  --color-black-a30: #0000004d; --color-black-a40: #0006;    --color-black-a50: #00000080;
  --color-black-a60: #0009;    --color-black-a70: #000000b3; --color-black-a80: #000c;  --color-black-a90: #000000e5;
  /* bridge so arbitrary-value utilities can reach the semantic layer */
  --color-bg-primary: var(--x-bg-primary);
}

/* ============ SEMANTIC — LIGHT ============ */
:root {
  --x-bg-primary: var(--color-white);
  --x-bg-secondary: var(--color-neutral-0);
  --x-bg-tertiary: var(--color-neutral-50);
  --x-bg-sheets: var(--color-white);
  --x-bg-inputs: var(--color-black-a5);
  --x-bg-modal: var(--color-white);
  --x-bg-destructive: var(--color-red-50);
  --x-bg-success: var(--color-green-50);
  --x-bg-info: var(--color-blue-50);
  --x-bg-warning: var(--color-yellow-50);
  --x-bg-subscribe: var(--color-plum-50);
  --x-bg-transparent: transparent;
  --x-fg-primary: var(--color-black);
  --x-fg-secondary: var(--color-black-a60);
  --x-fg-tertiary: var(--color-black-a30);
  --x-fg-inverted: var(--color-white);
  --x-fg-on-color: var(--color-white);
  --x-fg-brand: var(--color-blue-500);
  --x-fg-destructive: var(--color-red-500);
  --x-fg-success: var(--color-green-500);
  --x-fg-warning: var(--color-yellow-500);
  --x-fg-subscribe: var(--color-plum-500);
  --x-border-normal: var(--color-black-a10);
  --x-border-hover: var(--color-black-a20);
  --x-border-active: var(--color-black-a30);
  --x-border-media: var(--color-black-a5);
  --x-border-elevated: var(--color-white-a20);
  --x-button-primary: var(--color-black);
  --x-button-primary-hover: var(--color-black-a80);
  --x-button-primary-pressed: var(--color-black-a70);
  --x-button-secondary: var(--color-black-a5);
  --x-button-secondary-hover: var(--color-black-a10);
  --x-button-secondary-pressed: var(--color-black-a20);
  --x-button-ghost-hover: var(--color-black-a5);
  --x-button-ghost-pressed: var(--color-black-a20);
  --x-button-inverted: var(--color-white);
  --x-button-inverted-hover: var(--color-white-a90);
  --x-button-inverted-pressed: var(--color-white-a80);
  --x-button-brand: var(--color-blue-500);
  --x-button-destructive: var(--color-red-500);
  --x-button-danger-hover: var(--color-red-600);
  --x-button-danger-pressed: var(--color-red-700);
  --x-hover-subtle: var(--color-black-a5);
  --x-ring: var(--color-blue-500);
  --x-toast-bg: #2229;
  --x-shadow-toast: 0 8px 32px #0003;
  --x-illustration-track: var(--color-neutral-100);
  --x-illustration-panel: var(--color-neutral-50);
  --x-canvas: var(--color-neutral-0);   /* #f2f2f2 — hero/stat/chip plate knockouts */
  --x-radius-m: 1;
}

/* ============ SEMANTIC — DARK ============ */
[data-theme=dark], .dark {
  --x-bg-primary: var(--color-black);
  --x-bg-secondary: var(--color-neutral-1000);
  --x-bg-tertiary: var(--color-neutral-900);
  --x-bg-sheets: var(--color-neutral-1000);
  --x-bg-inputs: var(--color-white-a5);
  --x-bg-modal: var(--color-neutral-1000);
  --x-bg-destructive: var(--color-red-1100);
  --x-bg-success: var(--color-green-1100);
  --x-bg-info: var(--color-blue-1100);
  --x-bg-warning: var(--color-yellow-1100);
  --x-bg-subscribe: var(--color-plum-1100);
  --x-fg-primary: var(--color-white);
  --x-fg-secondary: var(--color-white-a60);
  --x-fg-tertiary: var(--color-white-a30);
  --x-fg-inverted: var(--color-black);
  --x-border-normal: var(--color-white-a10);
  --x-border-hover: var(--color-white-a20);
  --x-border-active: var(--color-white-a30);
  --x-border-media: var(--color-white-a5);
  --x-button-primary: var(--color-white);
  --x-button-primary-hover: var(--color-white-a80);
  --x-button-primary-pressed: var(--color-white-a70);
  --x-button-secondary: var(--color-white-a10);
  --x-button-secondary-hover: var(--color-white-a20);
  --x-button-secondary-pressed: var(--color-white-a30);
  --x-button-ghost-hover: var(--color-white-a10);
  --x-button-ghost-pressed: var(--color-white-a20);
  --x-button-inverted: var(--color-black);
  --x-button-inverted-hover: var(--color-black-a90);
  --x-button-inverted-pressed: var(--color-black-a80);
  --x-button-danger-hover: var(--color-red-400);   /* danger LIGHTENS in dark */
  --x-button-danger-pressed: var(--color-red-300);
  --x-hover-subtle: var(--color-white-a10);
  /* --x-ring and --x-toast-bg are NOT overridden in dark */
  --x-shadow-toast: 0 8px 32px #00000059;
  --x-illustration-track: var(--color-neutral-1000);
  --x-illustration-panel: var(--color-neutral-1000);
  --x-canvas: var(--color-neutral-1100);  /* #0d0d0d — hero/stat/chip plate knockouts */
}

/* ============ GLOBAL ============ */
body {
  background-color: var(--x-bg-primary);
  color: var(--x-fg-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
::selection { background-color: var(--x-fg-primary); color: var(--x-bg-primary); } /* theme-inverted */
:focus-visible { outline: 2px solid var(--x-ring, #1d9bf0); outline-offset: 1px; }
```

## Theme mechanism

Attribute-driven only — **no `prefers-color-scheme` CSS rules**. SSR ships `data-theme="light"`; a blocking inline script at the top of `<body>` flips it pre-paint:

```html
<script>try{var c=localStorage.getItem("theme");if(c==="dark"||(c!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.dataset.theme="dark"}catch(e){}</script>
```

Storage: `localStorage.theme` = `"light"` / `"dark"` / absent (= system). The footer toggle (monitor/sun/moon) writes it. Selector for dark overrides: `[data-theme=dark], .dark`.

## Radius system (squircle progressive enhancement)

Every radius is multiplied by `--x-radius-m` (1 normally, **1.8 + `corner-shape:squircle`** where supported):

```css
:root { --x-radius-m: 1 }
@supports (corner-shape: squircle) {
  .rounded-lg, .rounded-field { --x-radius-m: 1.8; corner-shape: squircle }
}
.rounded-lg    { border-radius: calc(.5rem * var(--x-radius-m)) }  /* FAQ highlight */
.rounded-field { border-radius: calc(9px * var(--x-radius-m)) }    /* form fields */
/* pills: border-radius: 9999px (no multiplier needed) */
```

Radius inventory on the whole page: pills (full), fields (9px), FAQ highlight (8px). Stat cards, media panels, hero canvas: **square**.

## Interaction = one alpha step

- Borders: normal a10 → hover a20 → active/focus a30.
- Secondary/tertiary buttons: rest a5 → hover a10 → pressed a20 (light); a10 → a20 → a30 (dark).
- Solid buttons de-opacify on interaction: 100% → a80 hover → a70 pressed (page bleeds through; no hue shift).
- Danger buttons darken in light (500→600→700), lighten in dark (500→400→300).

## Where tokens break on purpose

Three places use primitives instead of semantics — copy this behavior:

1. **Media/canvas panels** exceed the dark scale: `bg-neutral-0 dark:bg-neutral-1100` (#f2f2f2 / **#0d0d0d**, darker than dark `--x-bg-secondary` #141414). Used by: hero canvas, stat-card fills, format-card media panels, steps mockup panel. In light mode these panels add a same-color border (`border-neutral-0`) so edges stay invisible but anti-aliased. **`--x-canvas`** wraps this pair for SVG knockouts on those plates.
2. **Muted labels** (step numbers "01", format numbers) use `--color-neutral-400` (#999) — the one true-gray text, identical in both themes.
3. **SVG hex exceptions** (diagram corpus only): verification badge `#E2B719`; particle plate `#09090b`/`#f6f6f4`. Everything else in diagrams uses tokens.

### SVG knockout token map

| Token | Light | Dark | Use |
|---|---|---|---|
| `--x-canvas` | `#f2f2f2` | `#0d0d0d` | Hero canvas, stat panels, hero chips, tick swatches — plate-matched knockouts |
| `--x-bg-primary` | `#fff` | `#000` | Benefit-card mini diagram box knockouts |
| `--x-illustration-panel` / `--x-illustration-track` | `#ebebeb` / `#d9d9d9` | `#141414` | Skeleton UI *inside* product-mock browser frames only — never for hero/stat plates |

## Shadows, gradients, opacity

- Essentially shadowless. Only `--x-shadow-toast` + a 3px focus ring: `box-shadow: 0 0 0 3px color-mix(in srgb, var(--x-ring) 75%, transparent)`.
- Only functional gradients: sticky scroll-fade scrims `linear-gradient(to bottom, var(--color-bg-primary), transparent)` (48px tall, top and mirrored bottom of main), and a CSS dashed-strip `repeating-linear-gradient(90deg, currentColor 0 16px, transparent 16px 32px)`.
- Opacity modifiers via `color-mix(in oklab, <token> N%, transparent)` (e.g. footer wordmark at `text-fg-primary/50`). Disabled: buttons `opacity:.7`, inputs `opacity:.5`.
