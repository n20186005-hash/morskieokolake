/* Morskie Oko — Independent Visitor Guide · Service Worker */
const CACHE_NAME = 'morskie-oko-v3';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith('morskie-oko-') && key !== CACHE_NAME)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    const cache = caches.open(CACHE_NAME);
    const network = fetch(request, { cache: 'no-cache' });
    event.waitUntil(network.then(async (response) => {
      if (response.ok && response.type === 'basic' && !response.redirected) {
        const copy = response.clone();
        await (await cache).put(request, copy);
      }
    }).catch(() => {}));
    event.respondWith(network.catch(async () => {
      const pages = await cache;
      const cached = await pages.match(request);
      if (cached) return cached;
      const locale = url.pathname.split('/')[1];
      if (!['en', 'zh', 'pl', 'ru', 'de'].includes(locale)) return Response.error();
      return (await pages.match('/' + locale)) ?? Response.error();
    }));
    return;
  }

  // Only content-hashed framework assets can safely be served cache-first.
  if (!url.pathname.startsWith('/_next/static/')) return;
  const cache = caches.open(CACHE_NAME);
  const cached = cache.then((assets) => assets.match(request));
  const network = cached.then((hit) => hit ? null : fetch(request));
  event.waitUntil(network.then(async (response) => {
    if (response?.ok && response.type === 'basic') {
      const copy = response.clone();
      await (await cache).put(request, copy);
    }
  }).catch(() => {}));
  event.respondWith(cached.then(async (hit) => hit ?? await network ?? Response.error()));
});
