// AgriConecta Service Worker
const CACHE_NAME = 'agriconecta-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/produtos',
  '/servicos',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip chrome extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Cache strategy based on request type
  if (request.destination === 'image') {
    // Cache-first for images
    event.respondWith(cacheFirst(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    // Cache-first for CSS and JS
    event.respondWith(cacheFirst(request));
  } else if (request.mode === 'navigate') {
    // Network-first for HTML pages
    event.respondWith(networkFirst(request));
  } else {
    // Network-first with cache fallback for other requests
    event.respondWith(networkFirst(request));
  }
});

// Cache-first strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    console.log('[SW] Cache hit:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      console.log('[SW] Caching new resource:', request.url);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    throw error;
  }
}

// Network-first strategy
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    if (response.ok) {
      console.log('[SW] Updating cache:', request.url);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }

    // If it's a navigation request and we have an offline page
    if (request.mode === 'navigate') {
      const offlinePage = await cache.match('/');
      if (offlinePage) {
        return offlinePage;
      }
    }

    throw error;
  }
}
