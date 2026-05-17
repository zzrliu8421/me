// Service Worker for image caching
const CACHE_NAME = 'image-cache-v1';
const IMAGE_CACHE_URLS = [
    './profile.webp',
    './favicon.ico',
    './favicon.png'
];

// Install event - pre-cache images
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(IMAGE_CACHE_URLS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache or fetch from network
self.addEventListener('fetch', (event) => {
    // Only cache image requests
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    // Return cached image if found
                    if (response) {
                        return response;
                    }
                    
                    // Fetch from network and cache the result
                    return fetch(event.request)
                        .then((networkResponse) => {
                            // Only cache successful responses
                            if (networkResponse && networkResponse.status === 200) {
                                const responseToCache = networkResponse.clone();
                                caches.open(CACHE_NAME)
                                    .then((cache) => {
                                        cache.put(event.request, responseToCache);
                                    });
                            }
                            return networkResponse;
                        })
                        .catch((error) => {
                            console.error('Error fetching image:', error);
                            // Return a placeholder image if fetch fails
                            return new Response(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#2a2a2a"/><text x="50" y="55" font-size="12" text-anchor="middle" fill="#a0a0a0">Image</text></svg>',
                                {
                                    headers: { 'Content-Type': 'image/svg+xml' }
                                }
                            );
                        });
                })
        );
    }
});