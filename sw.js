importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log('✅ Workbox loaded');

  workbox.precaching.precacheAndRoute([
    { url: '/', revision: null },
    { url: '/index.html', revision: null },
    { url: '/style.css', revision: null },
    { url: '/app.js', revision: null },
    { url: '/manifest.json', revision: null },
    { url: '/offline.html', revision: null },
    { url: '/images/icon.png', revision: null },
    { url: '/images/icon-offline.gif', revision: null }
  ]);

  // Fallback offline jika gagal fetch dokumen
  workbox.routing.setCatchHandler(async ({ event }) => {
    if (event.request.destination === 'document') {
      return caches.match('/offline.html');
    }
    return Response.error();
  });

} else {
  console.log('❌ Workbox failed to load');
}

 workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
        }),
      ],
    })
  );
