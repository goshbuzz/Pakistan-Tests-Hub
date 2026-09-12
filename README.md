# Pakistan Tests Hub

Free self-study hub for **100** Pakistani exams (MDCAT, CSS, PPSC, NTS, IELTS, …). Practice stays on-device (IndexedDB). Apply only on official sites.

- Live: `https://pakistantestshub.goshbuzz.com` (override with `NEXT_PUBLIC_SITE_URL`)
- `public/ads.txt` must stay at the **site root** for AdSense (`ca-pub-4067724379997931`)
- Web ads = AdSense. Android Play = AdMob banners only (native SDK later)

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
