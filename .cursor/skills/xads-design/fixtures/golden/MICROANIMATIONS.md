# Measured microanimations (2026-08-04)

Source: live CDP on https://business.x.com/en/advertising

## CSS keyframes confirmed in stylesheet

### hero-pipeline-dot-outward
```css
@keyframes hero-pipeline-dot-outward {
  0%, 7% { opacity: 0; offset-distance: 0%; }
  10% { opacity: 1; offset-distance: 0%; }
  28% { opacity: 1; offset-distance: 100%; }
  32%, 100% { opacity: 0; offset-distance: 100%; }
}
```
Applied to `.hero-pipeline-dot` circles on hero `0 0 1120 402` via `offset-path: path("M560 201 L…")`.
Durations measured: **8.9s, 10.7s, 12.9s, 15.1s** linear infinite; delays ~**1.1–1.46s**.
`prefers-reduced-motion`: animation forced off, opacity 0.

### post-wall-drift / post-wall-float
- Track: **90s** linear infinite (`post-wall-drift`)
- Card: **7s** ease-in-out infinite (`post-wall-float`, ±3px Y at 50%)
- Hover/focus-within pauses track
- Reduced motion: none

### nav-item-in
opacity 0 + translateY(4px) → idle

### Other named keyframes present
`spin`, `sonner-*`, `checkmark`, `nfc-wave`, `nfc-glyph`, `swipe-out-*`, skeleton loading

## JS / Framer driven (animation-name: none)

Benefit targeting mini (`data-group="mechanism"`, `data-part="dashed-ring"`): transform matrices change continuously while CSS `animation-name` is `none`. Port with CSS `spin` 60s/169s linear as approximation, or keep Framer.

See `references/svg/animation.md` for the full skill write-up.
