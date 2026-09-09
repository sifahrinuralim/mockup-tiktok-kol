# XYZ Admin

Frontend mockup for a TikTok creator & campaign management platform, built on
the **Educore UI Starter** theme — Vite + React 18 + Tailwind CSS v3.

This is a **UI-only mockup**: there is no backend connected. All data comes
from the `src/data/*` mock files, and async patterns simulate real requests so
loading/empty/error states stay testable.

## Pages

- **Dashboard / Talent Discovery** (`/`) — explore, filter, sort, and pick top
  TikTok creators for campaigns (grid/table + "Add to Campaign" shortlist).
- **Top Talents** (`/top-talents`) — leaderboard with a stats summary, a top-3
  podium, and a full ranking table.
- **Campaign Manager** (`/campaigns`) — campaign pipeline, status filters,
  progress tracking, and creating new (draft) campaigns.
- **Analytics** (`/analytics`) — KPIs, daily trend charts, per-category
  performance, top content, and audience demographics.
- **Saved Lists** (`/saved-lists`) — organize favorite creators into lists for
  upcoming campaigns.
- **Profile** (`/profile`) — user & agency info, notification preferences, and
  account settings.
- **UI Kit** (`/ui-kit`) — design-system component preview (dev reference).

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

```bash
npm run dev       # Start the dev server (port 5173)
npm run build     # Production build to dist/
npm run preview   # Preview the built output
```

## Conventions

- Colors: `primary` (Indigo/Navy) for primary actions; `slate` neutral;
  `emerald` success/active; `amber` warning; `rose` danger.
- Font: Inter. Radius: `rounded-lg` inputs/buttons, `rounded-xl` cards,
  `rounded-2xl` modals.
- Page state flow: loading (skeleton) → empty state → error; actions via
  modal; destructive confirmations via `ConfirmDialog`.
- App identity lives in `src/constants/app.js`; navigation labels in
  `src/constants/navigation.js`.

## Structure

```
src/
├── components/
│   ├── ui/          # Reusable base components (Button, Input, Modal, Table, …)
│   └── common/      # App layout (AppLayout, Sidebar, Navbar, PageHeader, …)
├── constants/       # App identity & domain metadata (labels, options, statuses)
├── data/            # Mock data per domain (talents, campaigns, analytics, …)
├── pages/           # Feature pages (default export) + per-page components
├── hooks/           # Custom hooks (use*)
├── utils/           # Pure utils & formatters (cn, date, currency, metrics)
└── index.css        # Global Tailwind tokens (.input-base, modal animations)
```
