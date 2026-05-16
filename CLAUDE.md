# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # next dev --turbopack on http://localhost:3000
pnpm build    # production build (also the type/lint check we rely on — no test suite)
pnpm lint     # next lint
```

Don't run `pnpm dev` and `pnpm build` against the same `.next/` simultaneously — `build` rewrites the build manifest and the running dev server starts throwing `ENOENT … app-build-manifest.json`. Stop dev first, or `rm -rf .next` before restarting.

## Architecture

One-page personal site. The body content lives in **`src/app/page.mdx`** as plain markdown wrapped in a handful of JSX chrome components imported at the top of the file. There is no router, no CMS, no data fetching — content is the file.

The split is deliberate:
- **Chrome** (the dotted-border container, the `> company - [ role, period ]` title strip, the `[ link, link ]` brackets, the `> me` header) lives in `src/components/page.tsx`. Don't put presentational shapes in `page.mdx`.
- **Body** (descriptions, bullets, in-text links) lives in `page.mdx` as markdown. Don't put `<div className="...">` shapes in markdown.
- **Markdown styling** (every `<p>`, `<ul>`, `<li>`, `<a>` rendered from markdown) is applied centrally in `src/mdx-components.tsx`. Don't add classNames to markdown elements from inside `page.mdx`.

Theme + keyboard shortcuts are isolated in `src/components/theme-provider.tsx` (a client component wrapped around `{children}` in `layout.tsx`). The page itself is a Server Component.

MDX is wired via `@next/mdx` with `pageExtensions: ['mdx', 'ts', 'tsx']` and `experimental.mdxRs: true` (Rust compiler, turbopack-native, no remark/rehype plugins).

## Editing content

### Add a bullet

Open `src/app/page.mdx`, find the section, add a `-` line. Nested bullets use 2-space indent and get a `★` marker automatically:

```mdx
- top-level bullet (• marker)
  - nested bullet (★ marker)
```

Don't write `<div className="flex gap-2"><span>•</span>…</div>` shapes — that was the old pattern and it's gone.

### Add an in-text link

`[label](https://url)` in markdown. The `mdx-components.tsx` override gives it `text-accent hover:underline` plus `target="_blank" rel="noopener noreferrer"` automatically. Don't write raw `<a>` inside markdown. (The Cursor skill warns against orange inline links, but on this all-mono terminal-style site the orange reads as a deliberate accent rather than an error — kept on purpose.)

### Add a new experience

Copy any `<Section>` block in `page.mdx` and edit the props + markdown body. Required: `company`. Optional: `role`, `period`, `links`. The title is composed by `Section` as `> {company} - {role}`; `period` renders as a muted secondary line beneath the title. Both are dropped individually when empty. If `links` is omitted or empty, the `[ ]` bracket on the right is hidden.

```mdx
<Section
  company="example"
  role="engineer"          {/* optional */}
  period="2025 → present"  {/* optional */}
  links={[
    ['website', 'https://example.com'],
    ['x', 'https://x.com/example'],
  ]}
>

One-paragraph description renders as a `<p>` in muted foreground.

- bullet
- bullet
  - nested bullet with [a link](https://example.com)

</Section>
```

### About / Header

`<About>` is the `> me` block (heading is hardcoded; only the body changes). `<Header>` takes `name` and a `socials` array of `[label, href]` tuples. Header social links use `text-foreground/60` (not `text-accent`) and intentionally do NOT open in new tabs — that's existing behavior, not a bug.

### MDX whitespace rule

JSX block tags (`<Section …>`, `</Section>`, `<About>`, `</About>`) need **blank lines around them** for the markdown inside to parse. If a bullet list inside a `<Section>` suddenly renders as a JSX-mangled mess, check for a missing blank line.

## Styling

The visual language is [Cursor's](https://cursor.com/brand) — warm off-white/off-black neutrals, the `#F54E00` orange accent, Geist Sans + Geist Mono. The whole site renders in `font-mono` (Geist Mono); the terminal motif (`>` titles, `[ , ]` brackets, dotted dividers) is the site's identity and predates the Cursor pass — keep it.

- `text-accent` and `border-accent` use `--accent` (`#F54E00`). The accent appears on the `border-l` strip next to the name and on inline body links.
- `text-muted` uses `--muted` — the secondary body color. It's a baked color (not foreground-with-opacity) so it can be tuned per theme: a darker warm grey (`#595852`) in light mode for legibility, a lighter warm grey (`#9A9892`) in dark mode for restraint. Use this for body paragraphs, lists, and secondary chrome (header socials, section link rows). The previous `text-foreground/60` pattern washed out too much against the warm light bg.
- `text-foreground/40` is the period/meta hint; `text-foreground/30` is the theme-hint helper. These remain opacity-based because the intent *is* faintness.
- Tokens: `--background`, `--foreground`, `--accent`, `--muted`. Add a new one only when needed.
- The whole site is rendered through `lowercase` on the outer wrapper with `uppercase` selectively re-applied to titles. Write content in the case you want stored; CSS handles display.
- Headers are `font-semibold tracking-tight` (not `font-bold`) — Cursor's restraint principle. Body wrapper is `font-medium`.
- Nested `<ul>` rendered from markdown gets `★` instead of `•` via `.md-list .md-list .md-li::before` in `globals.css`. Markers are positioned with `position: absolute` (not `flex`) so multi-line bullet text wraps correctly under the text.

## Tailwind v4 + CSS imports

`@import url(...)` (the Geist + Geist Mono Google Fonts call) must appear **before** `@import "tailwindcss"` in `globals.css`. Tailwind v4 expands its import inline at build time, and Turbopack rejects `@import url(...)` that follows expanded rules ("@import rules must precede all rules…"). The font import is currently at line 1 for this reason — don't move it.

## Theme + keys

`t` toggles the `dark` class on `<html>` and persists to `localStorage`; an inline script in `layout.tsx` restores it before React hydrates (avoids flash). Don't move the initialization into `ThemeProvider` — the flash-prevention depends on it being inline in `<head>`. The accent color is fixed at `#F54E00` in both modes; the old `r`-key color cycle and `FAVORITE_COLORS` array are gone.
