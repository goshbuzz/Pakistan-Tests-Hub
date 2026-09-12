/**
 * GA4 (Google Analytics 4) — the single Google tag for this site.
 *
 * The Measurement ID comes from (first one set wins):
 *   1. `NEXT_PUBLIC_GA_ID` — Vercel → Project → Settings → Environment Variables
 *      (add it for Production *and* Preview, then redeploy).
 *   2. `GA_FALLBACK_MEASUREMENT_ID` below — commit it here when env vars are not an option.
 *
 * Find it in GA4 → Admin → Data streams → your web stream → "Measurement ID" (G-XXXXXXXXXX).
 *
 * Note: NEXT_PUBLIC_* values are baked in at build time, so changing the env var
 * requires a new deployment — a normal redeploy is enough.
 */

const GA_FALLBACK_MEASUREMENT_ID = "";

export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_ID || GA_FALLBACK_MEASUREMENT_ID).trim();

/**
 * Only a real GA4 id turns the tag on. Without one the site renders no tag at all,
 * which is safer than shipping gtag.js with a placeholder id (that would break
 * Google's tag scan with "tag not found").
 */
export const GA_ENABLED = /^G-[A-Z0-9]{4,}$/i.test(GA_MEASUREMENT_ID);

export const GA_SCRIPT_SRC = GA_ENABLED
  ? `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  : "";
