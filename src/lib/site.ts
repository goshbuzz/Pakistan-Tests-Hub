export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://pakistantestshub.goshbuzz.com").replace(
  /\/$/,
  ""
);

export const SITE_NAME = "Pakistan Tests Hub";

/** Parent brand for AEO / AI citation. */
export const PARENT_ORG_NAME = "GoshBuzz";
export const PARENT_ORG_LEGAL = "GoshBuzz";
export const PARENT_ORG_URL = "https://goshbuzz.com";
export const PARENT_ORG_SAME_AS = [
  "https://goshbuzz.com",
  "https://www.goshbuzz.com",
];
export const SITE_TAGLINE =
  "Free MDCAT, CSS, PPSC, FPSC, NTS, ISSB, IELTS and 100 Pakistan tests — syllabus, MCQs, mocks, official apply links.";

/**
 * Brand Open Graph cover (public/og-cover.png, 1424×752 ≈ 1.9:1 as Google recommends).
 * Spread into every indexable page's openGraph — Next only merges OG top-level, so a
 * page that defines its own openGraph block must also set `images` or lose og:image.
 */
export const OG_IMAGE = {
  url: "/og-cover.png",
  width: 1424,
  height: 752,
  alt: "Pakistan Tests Hub — every major test. One free hub.",
} as const;

export const DEFAULT_KEYWORDS = [
  "Pakistan government jobs",
  "CSS preparation",
  "PPSC jobs 2026",
  "FPSC jobs",
  "MDCAT MCQs",
  "NTS test preparation",
  "GAT general",
  "ISSB test",
  "Punjab police jobs",
  "educators test Punjab",
  "bank MTO test",
  "IELTS Pakistan",
  "free mock tests Pakistan",
  "job seeker Pakistan",
  "fresh graduate jobs Pakistan",
];
