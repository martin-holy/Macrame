// include contains only files not used in index.html

const appName = 'Macrame',
      exclude = ['/Macrame/updates.json'],
      include = [];

self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches.open(appName).then(cache => {
      console.log('Service Worker: Caching Files');

      return cache.addAll(include);
    })
  );
});

self.addEventListener('activate', async () => {
  console.log('Service Worker: Activated');

  // cache is updated in updateAppCache() and not recreated with new name
  // so there is no need to delete old cache
  // update will just delete files from cache so that new versions of files can be fetched

  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Respond with Cache falling back to Network
  e.respondWith(async function() {
    try {
      const cache = await caches.open(appName),
            res = await cache.match(e.request);
      
      if (res)
        return res;

      const netRes = await fetch(e.request);

      if (netRes.ok && netRes.status === 200 && netRes.type === 'basic')
        if (!exclude.find(x => e.request.url.endsWith(x)))
          cache.put(e.request, netRes.clone());
      
      return netRes;
    } catch (err) {
      console.log('Error in fetch handler:', err);
      throw err;
    }
  }());
});