# Pakistan Tests Hub

Free self-study hub for **100** Pakistani exams (MDCAT, CSS, PPSC, NTS, IELTS, …). Practice stays on-device (IndexedDB). Apply only on official sites.

- Live: `https://pakistantestshub.goshbuzz.com` (override with `NEXT_PUBLIC_SITE_URL`)
- `public/ads.txt` must stay at the **site root** for AdSense (`ca-pub-4067724379997931`)
- Web ads = AdSense. Android Play = AdMob banners only (native SDK later)

## Site structure (SEO / Google Search Console)

Google was struggling with the app-shaped root (client-only dashboard, inherited
canonicals, a cache-first service worker). The site is now structured as:

| Route | What it is | Indexing |
| --- | --- | --- |
| `/` | **Static marketing home** — pure server-rendered website page with the CTA into the app | index, own title/canonical/OG + unique FAQ schema |
| `/start` | The interactive hub (dashboard formerly at `/`) | `noindex, follow`; PWA `start_url` |
| `/explore` `/jobs` `/alerts` `/faq` `/about` `/contact` `/privacy` `/terms` | Website content pages | index, each with its own title, description, canonical and Open Graph |
| `/tests/[id]` (100 pages) | Per-test prep pages | index, generated unique metadata per test |
| `/login` `/profile` `/leaderboard` `/mock/*` | App-only screens | `noindex` |

Rules to keep it working:

1. **Every page declares its own `title` + `canonical`** (page or `layout.tsx`). Never
   re-add a `alternates.canonical` to the root layout — it leaks into every page and
   makes them look like duplicates of the homepage.
2. **Never precache HTML in `public/sw.js`.** Pages are network-first (cache = offline
   fallback only); only hashed assets and brand files may be cache-first.
3. `sitemap.ts` lists only indexable pages. Keep noindexed routes out of it.
4. The home FAQ copy must stay **different** from `/faq` — two pages shipping the same
   Q&A (or the same `FAQPage` schema) re-creates the duplicate identity problem.

```bash
npm ci
npm run build
```

Bank check: `npx tsx scripts/verify-banks.mts` — expect `tests 100` and `ISSUES 0`.

## Google Analytics 4 (the Google tag)

The tag is wired in `src/components/Analytics.tsx` and stays **off** until a real
Measurement ID exists (no placeholder is ever shipped).

1. GA4 → **Admin → Data streams → your web stream** → copy the **Measurement ID** (`G-XXXXXXXXXX`).
2. Vercel → Project → **Settings → Environment Variables** → add `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`
   for **Production and Preview**, then redeploy.
   (No env vars? Put the ID in `GA_FALLBACK_MEASUREMENT_ID` in `src/lib/analytics.ts` instead.)

Verify: `view-source:` on the live site must contain
`googletagmanager.com/gtag/js?id=G-…`, and **GA4 → Reports → Realtime** should show you as an
active user within ~30 seconds. `NEXT_PUBLIC_*` is baked in at build time, so env-var changes
need a redeploy.

## Deploy notes (Vercel)

`vercel.json` pins **Framework Preset = Next.js** and `next build`, so the project cannot
silently fall back to serving a static folder.

- Project → Settings → Build & Output: Framework Preset **Next.js**, Root Directory = repo root,
  Output Directory empty (default `.next`), Build Command `next build`.
- The connected Git repo must be `goshbuzz/Pakistan-Tests-Hub`. A `DEPLOYMENT_NOT_FOUND` error on
  the live domain means the project is still linked to an old (deleted) repo — reconnect the
  correct repo and redeploy, then re-add the `pakistantestshub.goshbuzz.com` domain if needed.

## Brand assets (logo, favicons, PWA icons)

`public/logo.png` is the one brand file (1024x1024). `src/lib/brand.ts` `LOGO_SRC` is the single
source of truth for its URL — header, login, install prompt, notifications, Open Graph and the
JSON-LD `logo` all read it, so they cannot drift apart again.

**Putting a new logo on Vercel**

1. Replace `public/logo.png` (and re-export `favicon.ico`, `icon-192.png`, `icon-512.png`,
   `apple-touch-icon.png` from it — `icon-512.png` is the one Android/Play uses full-bleed).
2. Bump the cache-buster in `src/lib/brand.ts` (`?v=5` -> `?v=6`) **and** `CACHE` in
   `public/sw.js` (`pth-pk-v5` -> `pth-pk-v6`) in the same commit. Also bump the `?v=` on the
   icon links in `src/app/layout.tsx` and `public/manifest.json` if the icons changed.
3. Merge to `main`. Vercel builds `main`, and the bumped `CACHE` name makes the service worker
   drop the old entries on next load, so the new artwork reaches installed PWAs too.

Step 2 is not optional. The service worker precached `/logo.png` and served it cache-first, so
after a swap the old logo stayed pinned in visitors' Cache Storage no matter what Vercel was
serving — the deploy looked broken while the file on the CDN was already correct. Brand assets are
now network-first (still cached for offline), and the version query is the belt-and-braces path for
browsers that never install the PWA.
