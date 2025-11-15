const CACHE_NAME = 'tongxin-ai-cache-v1';
const FILES_TO_CACHE = [
    '/Tongxin-childmodel2/',
    '/Tongxin-childmodel2/index.html',
    '/Tongxin-childmodel2/style.css',
    '/Tongxin-childmodel2/app.js',
    '/Tongxin-childmodel2/model-config.js',
    '/Tongxin-childmodel2/manifest.json',
    '/Tongxin-childmodel2/1763195248351.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(resp => resp || fetch(event.request))
    );
});
