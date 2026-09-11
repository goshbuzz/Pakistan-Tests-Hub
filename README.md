# Pakistan Tests Hub

Free self-study hub for **100** Pakistani exams (MDCAT, CSS, PPSC, NTS, IELTS, …). Practice stays on-device (IndexedDB). Apply only on official sites.

- Live URL (set `NEXT_PUBLIC_SITE_URL` if you use a custom domain): `https://pakistan-tests-hub.vercel.app`
- `public/ads.txt` must stay at the **site root** for AdSense (`ca-pub-4067724379997931`)
- Web ads = AdSense. Android Play = AdMob banners only (native SDK later)

```bash
npm ci
npm run build
```

Bank check: `npx tsx scripts/verify-banks.mts` — expect `tests 100` and `ISSUES 0`.
