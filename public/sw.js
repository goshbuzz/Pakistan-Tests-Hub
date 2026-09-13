// Bump CACHE together with LOGO_SRC in src/lib/brand.ts whenever brand artwork changes.
const CACHE = "pth-pk-v5";
const CORE = ["/", "/logo.png?v=5", "/manifest.json"];

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
