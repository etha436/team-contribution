# Team Contributions

A mobile-first Progressive Web App for recording and tracking a football
team's monthly player contributions.

This is **not** a payment gateway — it does not move money or talk to any
payment provider. It's a recording and tracking tool: when a player pays
their monthly contribution in person or by any other means, the team
manager logs it here, and the app keeps the totals straight.

## What it does

- Record a player's contribution (name, amount, payment date) as its own
  transaction — nothing ever overwrites a previous payment.
- Automatically calculates the team's total collected, per-player totals,
  and monthly totals from the individual transactions.
- Lets a manager **edit** a contribution if it was entered incorrectly.
  There is intentionally **no delete** — the payment history is a
  permanent record.
- Browse contribution history month by month, and drill into any player's
  full payment history.
- Search players and sort by highest total, most recent payment, or name.
- Works fully offline after the first load, and can be installed to a
  phone's home screen like a native app.

## Data storage — please read

**All data is stored locally on this device only, inside the browser's
IndexedDB storage.** There is no server and no cloud sync in this version.

That means:

- Clearing your browser or site data, uninstalling the browser, or
  switching to a different phone/computer will make existing records
  unavailable.
- Contribution records are **not** synchronized between devices. If two
  people open this app on two different phones, they will see two
  separate sets of data.
- Back up important totals another way (e.g. an export, a spreadsheet, or
  a screenshot) if you need a copy that survives beyond this device.

A future version could add a real backend and multi-device sync — the
code is structured so that's a reasonable next step (see
`src/services/database.js`), but it isn't built yet.

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [react-router-dom](https://reactrouter.com/) for client-side routing
- [idb](https://github.com/jakearchibald/idb) as a small, well-tested
  wrapper around IndexedDB
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) for the service
  worker, offline caching, and web app manifest
- [lucide-react](https://lucide.dev/) for icons

No backend, no environment variables, no database server. Everything runs
in the browser.

## Project structure

```
src/
  components/   Reusable UI building blocks (cards, rows, nav, forms...)
  pages/        One file per screen (Dashboard, Players, History, ...)
  services/     IndexedDB access — the only place that talks to storage
  hooks/        useContributions (data + mutations), useToast
  utils/        Pure helper functions: currency, dates, aggregation math
```

`services/database.js` is intentionally the only file that imports `idb`.
Every page reads and writes contributions through the `useContributions`
hook, which keeps the in-memory list and IndexedDB in sync.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL on your phone (same Wi-Fi network) or in your
desktop browser to try it out.

### Build for production

```bash
npm run build
npm run preview   # serve the production build locally to double check it
```

The production build is written to `dist/`.

## Deploying to Netlify

This project deploys as a static site — no server, no environment
variables required.

1. Push this repository to GitHub/GitLab/Bitbucket, or drag-and-drop the
   `dist/` folder into Netlify after running `npm run build`.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. `netlify.toml` is already included and configures the SPA redirect so
   that refreshing a deep link like `/dashboard`, `/players`, or
   `/history` doesn't produce a 404.

## Testing checklist

This was verified before shipping:

- Adding a contribution persists after a page refresh and after fully
  closing and reopening the app.
- Multiple payments from the same player in the same month are stored as
  separate transactions and summed correctly.
- Editing a contribution recalculates the player's total and the monthly
  total, and leaves every other transaction untouched.
- There is no delete control anywhere in the UI.
- Contributions in different months are kept separate; switching months
  in History only shows that month's records.
- Player search is case-insensitive.
- `npm run build` completes with no errors and produces a working
  `dist/` folder.

## Roadmap (not built yet, on purpose)

Explicitly out of scope for this version: online/M-Pesa payments, user
accounts or login, a backend or cloud database, and multi-device sync.
The architecture (a thin storage service behind a data hook) is meant to
make adding those later straightforward without a rewrite.
