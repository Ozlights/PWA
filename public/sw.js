var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'index.html',
  'index.js',
  'main.html',
  'main.js',
  'style.css',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css',
  'https://use.fontawesome.com/releases/v5.3.1/js/all.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
