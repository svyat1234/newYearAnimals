const CACHE_NAME = 'nytrail-cache-v4';
// Кешируем критически важные ресурсы для работы оффлайн
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/vite.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => {
        // Принудительно активируем новый SW
        self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Для навигационных запросов (переходы по страницам)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Кешируем успешный ответ
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Если сети нет - возвращаем из кеша
          return caches.match('/index.html') || caches.match('/');
        })
    );
    return;
  }

  // Для всех остальных GET запросов в пределах нашего домена
  if (request.method === 'GET' && new URL(request.url).origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Есть в кеше - отдаем сразу, но обновляем в фоне
          fetch(request).then((response) => {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }).catch(() => {}); // Игнорируем ошибки фонового обновления
          return cachedResponse;
        }
        
        // Нет в кеше - загружаем из сети и кешируем
        return fetch(request).then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        }).catch(() => {
          // Если сети нет и в кеше тоже нет - попробуем fallback
          if (request.destination === 'image') {
            return new Response(); // Пустой ответ для изображений
          }
          return caches.match('/index.html'); // Fallback на главную страницу
        });
      })
    );
  }
});



