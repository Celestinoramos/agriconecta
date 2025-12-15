'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          // eslint-disable-next-line no-console
          console.log('Service Worker registered successfully:', registration.scope);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return null;
}
