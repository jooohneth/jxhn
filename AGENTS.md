# AGENTS.md

## Cursor Cloud specific instructions

This is a single-page Next.js 15 personal portfolio site. There is no backend, database, or external API — just a static site built with MDX + Tailwind CSS v4 + Turbopack.

### Services

| Service | Command | Port |
|---|---|---|
| Next.js dev server | `pnpm dev` | 3000 |

No other services are required.

### Key commands

See `CLAUDE.md` for full details. Quick reference:

- **Dev server:** `pnpm dev` (Turbopack, http://localhost:3000)
- **Lint:** `pnpm lint`
- **Build (also type-checks):** `pnpm build`
- There is **no test suite** — `pnpm build` is the correctness gate.

### Gotchas

- **Build script approval:** pnpm v10 blocks lifecycle scripts from `@tailwindcss/oxide`, `sharp`, and `unrs-resolver` by default. The dev server and build still work without running these scripts (the packages ship prebuilt binaries for common platforms). If you hit native module errors, run `pnpm rebuild @tailwindcss/oxide sharp unrs-resolver`.
- **Don't run `pnpm dev` and `pnpm build` simultaneously** — they share `.next/` and `build` will break the running dev server. Stop dev or `rm -rf .next` before building.
- **Theme toggle:** press `t` in the browser to switch light/dark mode.
