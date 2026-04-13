# VORM — Creative studio landing page

A single-page marketing site for a fictional creative studio (**VORM**). It presents work, services, positioning, and contact in a dark, editorial layout with large display type, a lime accent, and light scroll-driven motion.

## What’s in the page

- **Fixed navigation** with a transparent-to-solid scroll state, desktop links, and a full-screen mobile menu.
- **Hero** with stacked headline (“We make things that *move* people.”), studio meta (est. date, discipline tags), intro copy, and stat highlights; decorative rings and a scroll cue.
- **Marquee** strip of service keywords.
- **Selected work** as interactive rows with hover affordances.
- **Services** as expandable rows (accordion).
- **About** with a pull quote and two-column body copy.
- **Contact** with email and phone CTAs.
- **Footer** with copyright and social placeholders.

Reveal animations use CSS keyframes; sections use a small **Intersection Observer** hook so content fades in as it enters the viewport. **Reduced motion** preferences disable non-essential animation.

## Tech stack

| Piece | Role |
|--------|------|
| [React](https://react.dev/) 19 | UI |
| [Vite](https://vite.dev/) 8 | Dev server and production build |
| [Tailwind CSS](https://tailwindcss.com/) 4 | Imported in `src/index.css` via `@import "tailwindcss"` |
| [Google Fonts](https://fonts.google.com/) | Bebas Neue, Cormorant, DM Sans (see `index.html`) |

Styling is mostly custom properties and layout rules in `src/index.css`, with some inline styles in `src/App.jsx` for one-off component styling.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Other scripts:

- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built output locally
- `npm run lint` — ESLint

## Project layout

```
src/
  App.jsx    # All page sections and UI in one module
  main.jsx   # React root
  index.css  # Global styles, layout, animations, breakpoints
index.html   # Document shell and font links
```

## Customization

- **Copy and structure**: edit section components in `src/App.jsx`.
- **Colors and borders**: CSS variables in `src/index.css` under `:root` (`--ink`, `--cream`, `--lime`, `--muted`, `--border`).
- **Spacing and breakpoints**: same file (e.g. `.hero-section`, `.sec`, and the `max-width: 767px` block).

This repository is a local demo / portfolio piece, not an official product.
