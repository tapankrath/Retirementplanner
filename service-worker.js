// RetirementPlanner Service Worker v2
const CACHE_NAME = 'retire-planner-v3';

// All app files to cache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './us-wealth-builder.html',
  './india-wealth-builder.html',
  './us-retirement-plan.html',
  './india-retirement-plan.html',
  './us-to-india-crossborder.html',
  './pricing.html',
  './manifest.json',
  './logo-192.svg',
  './logo-192.png',
  './logo-512.png',
  './logo-512.svg',
  './logo-maskable-512.svg',
  './favicon-32.svg',
  // External CDN (cache on first fetch, not precache)
];

// Install: precache all local assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first for local, network-first for CDN
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isLocal = url.origin === self.location.origin ||
                  url.protocol === 'file:';
  const isCDN   = url.hostname.includes('cdnjs') ||
                  url.hostname.includes('fonts.googleapis') ||
                  url.hostname.includes('fonts.gstatic');

  if (isLocal) {
    // Cache-first for app files
    event.respondWith(
      caches.match(event.request)
        .then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
            }
            return response;
          });
        })
    );
  } else if (isCDN) {
    // Stale-while-revalidate for CDN assets
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          const fetchPromise = fetch(event.request).then(response => {
            if (response && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
          return cached || fetchPromise;
        })
      )
    );
  }
});
