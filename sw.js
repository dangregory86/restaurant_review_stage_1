//service worker created following the google developer guide and https://www.sitepoint.com/getting-started-with-service-workers/
//name the cache and what files need caching
var CACHE_NAME = 'restaurant-cache-v2';
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
    console.log(event.request);
    if (response) {
      return response;
    }
    return requestBackend(event);
  }));
});

function requestBackend(event){
    var url = event.request;
    return fetch(url).then(function(res){
        //if not a valid response send the error
        if(!res || res.status !== 200 || res.type !== 'basic'){
            return res;
        }

        var response = res.clone();

        caches.open(CACHE_NAME).then(function(cache){
            cache.put(event, response);
        });

        return res;
    })
}

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_NAME){
                    return caches.delete(keys[i]);
                }
            }))
        })
    )
});
