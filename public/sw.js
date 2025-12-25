// AgriConecta Service Worker
// Version with timestamp for cache busting
const VERSION = '1.0.0';
const CACHE_NAME = `agriconecta-v${VERSION}-${Date.now()}`;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/produtos',
  '/servicos',
  '/sobre',
  '/contacto',
  '/faq',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Routes to exclude from caching (admin and API routes)
const EXCLUDED_ROUTES = [
  '/admin',
  '/api',
  '/_next/webpack',
];

// Check if a URL should be excluded from caching
function shouldExclude(url) {
  return EXCLUDED_ROUTES.some(route => url.pathname.startsWith(route));
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker version:', VERSION);
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

  // SECURITY: Exclude admin and API routes from caching
  if (shouldExclude(url)) {
    console.log('[SW] Excluded from cache:', url.pathname);
    return; // Let the request go through without caching
  }

  // Cache strategy based on request type
  if (request.destination === 'image') {
    // Cache-first for images
    event.respondWith(cacheFirst(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    // Cache-first for CSS and JS
    event.respondWith(cacheFirst(request));
  } else if (request.mode === 'navigate') {
    // Network-first for HTML pages with offline fallback
    event.respondWith(networkFirstWithOffline(request));
  } else {
    // Stale-while-revalidate for other requests (like products data)
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache-first strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    throw error;
  }
}

// Network-first strategy with offline page fallback
async function networkFirstWithOffline(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }

    // If it's a navigation request and network failed, show offline page
    if (request.mode === 'navigate') {
      const offlinePage = await cache.match('/offline');
      if (offlinePage) {
        return offlinePage;
      }
    }

    throw error;
  }
}

// Stale-while-revalidate strategy (good for product data)
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  // Fetch in background and update cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });

  // Return cached version immediately if available, otherwise wait for network
  return cached || fetchPromise;
}

