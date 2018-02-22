//service worker created following the google developer guide
//name the cache and what files need caching
var CACHE_NAME = 'restaurant-cache-v1';
var urlsToCache = [
  '/css/styles.css',
  '/data/restaurants.json',
  'js/main.js',
  'js/dbhelper.js',
  'js/restaurant_info.js',
  'index.html',
  'restaurant.html',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

//install the service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    console.log('opened cache');
    return cache.addAll(urlsToCache);
  }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // Cache hit - return response
    if (response) {
      return response;
    }
    return fetch(event.request);
  }));
});
