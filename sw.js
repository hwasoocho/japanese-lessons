/* Network-first service worker: a push to main still shows up on next load,
   the cache only kicks in when offline. Bump VERSION when cached files change. */
const VERSION = "gj-v6";
const CORE = [
  "./",
  "index.html",
  "kana-data.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    /* no-cache forces revalidation — GitHub Pages serves max-age=600, so a
       plain fetch() would return the HTTP-cached copy for up to 10 minutes */
    fetch(e.request, { cache: "no-cache" })
      .then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
