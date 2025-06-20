const CACHE_NAME = 'my-pwa-cache-v2'; // ganti versi jika ada perubahan

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log('✅ Workbox loaded');

  // Precaching semua file
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: null },
    { url: '/index.html', revision: null },
    { url: '/style.css', revision: null },
    { url: '/app.js', revision: null },
    { url: '/offline.html', revision: null },
    { url: '/images/icon.png', revision: null }
  ]);

  // Offline fallback
  workbox.routing.setCatchHandler(async ({event}) => {
    if (event.request.destination === 'document') {
      return caches.match('/offline.html');
    }
    return Response.error();
  });

  // Hapus cache lama saat activate
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
        );
      })
    );
  });

} else {
  console.log('❌ Workbox failed to load');
}
