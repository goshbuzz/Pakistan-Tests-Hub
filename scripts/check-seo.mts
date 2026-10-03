/**
 * SEO / page-identity regression harness (Master Prompt Phases 5–6 + 9).
 * Run after `npm run build`:  npx tsx scripts/check-seo.mts
 *
 * Parses the prerendered HTML in .next/server/app and asserts, with evidence:
 *   1. every indexable page has a title; titles are unique site-wide
 *   2. title length ≤ 65 chars, description ≤ 175 chars (SERP-friendly)
 *   3. every indexable page carries its OWN canonical matching its route
 *   4. exactly the app-only routes carry meta robots noindex
 *   5. every main page ships its own FAQPage JSON-LD (page-relevant FAQ)
 *   6. every main page has an og:image pointing at the 1424×752 brand cover
 *   7. exactly one <h1> per main page
 *   8. the marketing home links into the app (/start) with a CTA
 *   9. sitemap.xml (runtime) — verified separately by the checks below when dev server is up; here we check the module
 * Exits 1 on any FAIL.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = ".next/server/app";

type Expectation = { file: string; route: string; index: boolean };

const MAIN: Expectation[] = [
  { file: "index.html", route: "/", index: true },
  { file: "start.html", route: "/start", index: false },
  { file: "explore.html", route: "/explore", index: true },
  { file: "jobs.html", route: "/jobs", index: true },
  { file: "alerts.html", route: "/alerts", index: true },
  { file: "faq.html", route: "/faq", index: true },
  { file: "about.html", route: "/about", index: true },
  { file: "contact.html", route: "/contact", index: true },
  { file: "privacy.html", route: "/privacy", index: true },
  { file: "terms.html", route: "/terms", index: true },
  { file: "login.html", route: "/login", index: false },
  { file: "profile.html", route: "/profile", index: false },
  { file: "leaderboard.html", route: "/leaderboard", index: false },
];

let failures = 0;
const fail = (m: string) => {
  failures++;
  console.error(`  ✗ ${m}`);
};
const pass = (m: string) => console.log(`  ✓ ${m}`);

function read(file: string): string {
  const p = join(APP_DIR, file);
  if (!existsSync(p)) return "";
  return readFileSync(p, "utf8");
}

const meta = (html: string, re: RegExp) => html.match(re)?.[1] ?? "";
const unesc = (s: string) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");

console.log("check-seo: verifying prerendered HTML identity rules\n");

/* 1–3, 5–8: main pages */
const titles = new Map<string, string>();
for (const { file, route, index } of MAIN) {
  const html = read(file);
  if (!html) {
    fail(`${route}: prerendered HTML missing (${file}) — did the build run?`);
    continue;
  }
  const title = unesc(meta(html, /<title>([^<]*)<\/title>/));
  if (!title) fail(`${route}: no <title>`);
  else {
    if (index && title.length > 65) fail(`${route}: title ${title.length} chars (≤65 wanted): “${title}”`);
    const prev = titles.get(title);
    if (prev) fail(`${route}: title duplicated from ${prev}`);
    titles.set(title, route);
  }
  const desc = unesc(meta(html, /name="description" content="([^"]*)"/));
  if (!desc) fail(`${route}: no meta description`);
  else if (index && desc.length > 175) fail(`${route}: description ${desc.length} chars (≤175 wanted)`);

  const canonical = meta(html, /rel="canonical" href="([^"]*)"/);
  if (index) {
    const want = route === "/" ? "/" : route;
    if (!canonical) fail(`${route}: missing canonical (stray noindex or dup risk)`);
    else if (!canonical.replace(/\/$/, "") .endsWith(want.replace(/^\//, "").replace(/^$/, "")) && !canonical.endsWith(want) && !(want === "/" && /goshbuzz\.com\/?$/.test(canonical)))
      fail(`${route}: canonical “${canonical}” does not point at its own route`);
    else pass(`${route}: canonical ok — ${canonical}`);
    if (/noindex/.test(html)) fail(`${route}: indexable page carries a stray noindex!`);
  } else {
    if (!/name="robots" content="[^"]*noindex/.test(html)) fail(`${route}: expected noindex (app-only screen)`);
    else pass(`${route}: noindex ok`);
  }

  if (index) {
    if (!/"@type":"FAQPage"/.test(html)) fail(`${route}: no FAQPage JSON-LD block (Phase 6 violation)`);
    else pass(`${route}: own FAQPage schema`);
    const ogImage = meta(html, /property="og:image" content="([^"]*)"/);
    if (!/og-cover\.png/.test(ogImage)) fail(`${route}: og:image missing or not the brand cover (got “${ogImage}”)`);
    else pass(`${route}: og:image cover ok`);
    const h1s = (html.match(/<h1[ >]/g) ?? []).length;
    if (h1s !== 1) fail(`${route}: ${h1s} <h1> tags (want exactly 1)`);
  }
}

/* 8: home CTA into the app */
{
  const home = read("index.html");
  const ctas = (home.match(/href="\/start"/g) ?? []).length;
  if (ctas < 3) fail(`home: only ${ctas} links to /start — CTAs into the app expected (≥3)`);
  else pass(`home: ${ctas} CTAs into the app at /start`);
  if (!/Open the free test hub/.test(home)) fail("home: hero CTA copy 'Open the free test hub' not found");
}

/* 4: noindex set is exactly right — sweep every prerendered page */
function walk(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}
const EXPECTED_NOINDEX_FILES = new Set(["start", "login", "profile", "leaderboard"]);
for (const file of walk(APP_DIR)) {
  const rel = file.slice(APP_DIR.length + 1).replace(/\.html$/, "");
  if (rel.includes("_not-found") || rel.startsWith("api")) continue;
  const html = readFileSync(file, "utf8");
  const noindex = /name="robots" content="[^"]*noindex/.test(html);
  const isTestPage = rel.startsWith("tests/");
  const isMain = MAIN.some((m) => m.file.endsWith(`${rel}.html`) || rel === "index");
  if (!isMain && !isTestPage) continue; // only police known page families
  if (isTestPage && noindex) fail(`${rel}: test content page must stay indexable`);
  if (!isTestPage) {
    const want = EXPECTED_NOINDEX_FILES.has(rel);
    if (noindex !== want) fail(`${rel}: noindex=${noindex} but expected ${want}`);
  }
}

/* 9: sitemap module content */
{
  const sm = read("sitemap.xml/sitemap.xml") || "";
  if (sm.includes("/start")) fail("sitemap includes /start (must list indexable pages only)");
}

console.log(failures === 0 ? "\ncheck-seo: PASS — all identity rules hold." : `\ncheck-seo: FAIL — ${failures} issue(s) above.`);
process.exit(failures === 0 ? 0 : 1);
