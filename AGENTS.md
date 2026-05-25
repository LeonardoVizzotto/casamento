# AGENTS.md — Casamento

## Project Overview
Wedding invitation single-page website (Portuguese content). Static site, no backend, no database, no API. Event: Dec 12, 2026, Porto Alegre, Brazil.

## Tech Stack
- **Language:** TypeScript (v6)
- **Build:** Vite (v8)
- **Package Manager:** npm
- **Framework:** None — vanilla TS + DOM manipulation
- **Styling:** Custom CSS with design tokens (CSS custom properties), BEM naming, Google Fonts (Poppins)
- **No CSS framework, no preprocessor, no CSS-in-JS**

## Commands
- `npm run dev` — Vite dev server with HMR
- `npm run build` — `tsc` typecheck then Vite production build → `dist/`
- `npm run preview` — Serve `dist/` locally

No test/lint/format scripts exist yet.

## Architecture
```
index.html              ← All page markup (single-page, multi-section)
public/images/          ← Static assets (SVGs, PNGs)
src/
  main.ts               ← Entry: imports CSS, calls setup*() from modules
  modules/
    nav/                ← setupNavigation() — scroll/active state
    modal/              ← setupModal() — confirm presence modal
  styles/
    tokens.css          ← Design tokens (CSS custom properties)
    layout.css          ← Layout + component styles
```

Pattern: each module exports a single `setup*()` function, all called from `main.ts init()`.

Only `tokens.css` and `layout.css` are the working CSS files. No parallax or sticky-button modules — those were removed.

## Known Issues (Current State)
- **Broken build:** `main.ts` still imports deleted `components.css` and `sections.css`; modules deleted but references remain
- **`html lang="en"`** — should be `lang="pt-BR"` (all content is Portuguese)
- **Mixed-language nav:** desktop in Portuguese, mobile bottom nav in English
- **Duplicate tokens:** spacing scale defined twice in `tokens.css`
- **Undefined CSS vars:** `--color-text-on-primary` (commented out in tokens), `--radius-pill` (never defined)
- **Many CSS classes used in HTML have no rules:** `.schedule-item`, `.section--gifts`, `.modal`, `.site-nav--bottom`, `.section__header--centered`, and others
- **Placeholder content:** modal text, confirmation URL (`example.com`), Pix key `[chave pix]`
- **Favicon `<link>` commented out** despite icon assets existing

## Style Conventions
- BEM: `.block__element--modifier` (e.g. `.section__inner`, `.button--primary`)
- Design tokens in `tokens.css` → consumed via `var(--token-name)`
- Color palette: warm earth tones — dark maroon `#531e16`, pink `#f6bce6`, golden `#f2dfb4`
- Font: Poppins 400/500/700

## Sections (in page order)
1. Hero — logo + "confirmar presença" CTA
2. Schedule — venue address, time, icons
3. Details — emotional invitation text
4. Gifts — Pix key for monetary gifts (couple moving to Portugal)
5. Modal — confirmation dialog (placeholder)
6. Nav — desktop top nav + mobile bottom nav
