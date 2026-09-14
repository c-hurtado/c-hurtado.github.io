const CACHE = 'v1';
const CACHE_URLS = 'https://carloshurtado.com/';

// Install
self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE).then(cache => cache.addAll(CACHE_URLS))
));

// Activate
self.addEventListener('activate', event => event.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => cache(k).then(() => null))))
));

// Fetch
self.addEventListener('fetch', event => event.respondWith(
  caches.match(event.request)
    .then(response => {
      if (response) return response;
      return fetch(event.request).then(response => {
        if (response.ok && response.type === 'basic') {
          return caches.put(event.request, response);
        }
        return response;
      });
    })
));

// Sync
self.addEventListener('sync', event => {
  event.waitUntil(
    fetch(event.tag).then(() => event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.tag, event.waitUntilCacheableResponse(event.request)))))
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAKEUP') {
    event.waitUntil(self.skipWaiting());
  }
});
