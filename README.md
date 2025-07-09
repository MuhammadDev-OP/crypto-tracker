# Crypto Tracker \u2014 Next.js × Bun

Real‑time cryptocurrency price dashboard written with **Next.js 14 (App Router)**, **Bun** as the package manager/runtime, **Tailwind CSS**, **TanStack Query v5** for data‑fetching & caching, and **Recharts** for spark‑line charts.

> **Live demo:** add the project to Vercel and you will instantly get preview & production URLs for every branch.

---

## ✨ Features

|             |  Details                                                                                  |
| ----------- | ----------------------------------------------------------------------------------------- |
| Data source | [CoinGecko v3 REST API](https://www.coingecko.com/en/api/documentation) (no key required) |
| Runtime     | [Bun >= 1.0](https://bun.sh) + ES2022 modules                                             |
| Framework   | Next.js 14 (React 18, App Router, server actions)                                         |
| State/Data  | TanStack React Query v5 (+ DevTools)                                                      |
| Styling     | Tailwind CSS 3 + Radix UI primitives + lucide‑react icons                                 |
| Charts      | Recharts 2 (responsive LineChart)                                                         |
| CI / CD     | GitHub Actions ➜ Vercel automatic deployments                                             |

---

## 🖇️ Repository

```
https://github.com/MuhammadDev-OP/crypto-tracker.git
```

---

## 🚀 Quick start

### 1 · Clone and install

```bash
git clone https://github.com/MuhammadDev-OP/crypto-tracker.git
cd crypto-tracker

# install with Bun (fast)
bun install
```

### 2 · Run the development server

```bash
# any of the following is fine
a. bun run dev          # uses the npm script in package.json
b. bunx next dev        # equivalent manual call

# open http://localhost:3000
```

### 3 · Build & preview production locally

```bash
# build the optimized production bundle
bun run build

# start production server on :3000
bun run start
```

> **Note:** `bun run <script>` will execute any script from **package.json** using Bun's ultra‑fast runtime.

---

## ⚙️ Configuration

| File                                        | Purpose                                                                                                  |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `src/components/pages/crypto-dashboard.tsx` | Main UI with selectors, TanStack Query hook and Recharts chart.                                          |
| `app/api/crypto/route.ts`                   | **Route Handler** that proxies CoinGecko (current spot + historical series) and applies 60 s edge cache. |
| `tailwind.config.ts`                        | Tailwind design tokens; extend colours or fonts here.                                                    |
### Environment variables

The public CoinGecko endpoints used here **do not require a token**; simply respect the 30 req / min free limit.

If you upgrade to the Pro tier or want to access private endpoints, create a `.env.local`:

```env
# example only – replace with your token\ nCOINGECKO_API_KEY=xxxxxxxxxxxxxxxx
```

and pass it in `fetch` headers inside `app/api/crypto/route.ts`.

---

## 📂 Script cheatsheet

| Script          | What it does                     |
| --------------- | -------------------------------- |
| `bun run dev`   | Start Dev server (`next dev`)    |
| `bun run lint`  | ESLint check (Next.js rules)     |
| `bun run build` | Production build (`next build`)  |
| `bun run start` | Start prod server (`next start`) |

---

## 🛠 Tooling versions

| Package                 | Version (2025‑06) |
| ----------------------- | ----------------- |
| `bun`                   |  1.x              |
| `next`                  |  14.2.3           |
| `react` / `react-dom`   |  18.x             |
| `@tanstack/react-query` |  5.82.0           |
| `recharts`              |  2.15.x           |
| `tailwindcss`           |  3.4.x            |

See [`package.json`](./package.json) for the full list.

---
---

## 🚚 Deployment on Vercel


MIT © 2025 Muhammad B.

> Crypto data provided by [https://www.coingecko.com](https://www.coingecko.com). This project is for educational/demo purposes; **not** financial advice.
