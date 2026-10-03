// Bump CACHE together with LOGO_SRC in src/lib/brand.ts whenever brand artwork changes.
// v6: the site root is now a static marketing homepage and the app moved to /start.
// The old cache pinned the previous dashboard HTML — including its stale <title> and
// canonical — which Google then re-crawled through Chrome, confusing indexing. Bumping
// the cache name force-drops every cached page on the next load.
const CACHE = "pth-pk-v6";
// Precache brand chrome only — NEVER "/" or app pages. HTML must stay network-first
// (see the navigate branch below) so crawlers and users always see fresh content.
const CORE = ["/logo.png?v=5", "/manifest.json"];

// Brand assets must never be pinned in the cache: a deploy that swaps the logo or an
// icon has to reach returning visitors and installed PWAs on their next load. These are
// served network-first with a cache fallback — always fresh online, still available
// offline. Everything else stays cache-first for offline navigation.
const REVALIDATE = /\/(logo\.png|icon-\d+\.png|apple-touch-icon\.png|favicon\.ico|manifest\.json)$/;

function putInCache(request, response) {
  if (!response || !response.ok) return;
  const copy = response.clone();
  caches.open(CACHE).then((c) => c.put(request, copy));
}

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;

  if (REVALIDATE.test(url.pathname)) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          putInCache(e.request, res);
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Page navigations = network-first. Fresh HTML for Google (indexing depends on the
  // <title>/canonical/robots a crawl actually receives) and for users after each
  // deploy; the cache is only the offline fallback, never the primary answer.
  const isHtml =
    e.request.mode === "navigate" || (e.request.headers.get("accept") || "").includes("text/html");
  if (isHtml) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          putInCache(e.request, res);
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Everything else (fonts, images, hashed static chunks) stays cache-first.
  e.respondWith(
    caches.match(e.request).then((hit) => {
      const net = fetch(e.request)
        .then((res) => {
          putInCache(e.request, res);
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(self.clients.openWindow(e.notification.data?.url || "/alerts"));
});
