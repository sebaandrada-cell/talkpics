/* TalkPics service worker: guarda la app en el dispositivo para que abra sin internet.
   Para publicar una actualización, cambia el número de VERSION y, igual, APP_VER en TalkPics.html. */
const VERSION = "talkpics-v38";
// Herramienta de "quitar el fondo" (carpeta bg/, unos 8 MB de descarga): caché aparte que NO se borra al cambiar VERSION,
// para no volver a descargarla en cada actualización. Si cambian esos archivos, sube este número.
const BG_CACHE = "tp-bgtool-1";
const CORE = [
  "./", "index.html", "TalkPics.html", "manifest.webmanifest",
  "icon-192.png", "icon-512.png", "icon-maskable-512.png",
  "apple-touch-icon.png", "favicon.png", "qr-talkpics.png", "og.png"
];

self.addEventListener("install", e => {
  // cache: "reload": la versión nueva se descarga de la web, nunca de la caché HTTP del navegador,
  // que podría devolver los archivos viejos y dejar una versión nueva con contenido antiguo.
  e.waitUntil(caches.open(VERSION)
    .then(c => c.addAll(CORE.map(u => new Request(u, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});

// La app pregunta qué versión tiene el service worker ("Buscar actualizaciones" en Ajustes).
self.addEventListener("message", e => {
  if (e.data === "tp-version" && e.ports && e.ports[0]) e.ports[0].postMessage(VERSION);
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => (k.startsWith("talkpics-") && k !== VERSION) || (k.startsWith("tp-bgtool-") && k !== BG_CACHE)).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  // Solo archivos propios (GET). ARASAAC y demás van directo a internet.
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  // Vídeos y peticiones por rangos: directos a la red. La caché no admite respuestas parciales (206)
  // y con ellas el vídeo de la web dejaría de cargar.
  if (req.headers.has("range") || url.pathname.includes("/video/")) return;

  if (url.pathname.includes("/bg/")) {
    e.respondWith((async () => {
      const cache = await caches.open(BG_CACHE);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })());
    return;
  }

  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req, { ignoreSearch: true });
    // Actualiza en segundo plano; la próxima apertura ya trae la versión nueva.
    const refresh = fetch(req).then(res => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    if (cached) { e.waitUntil(refresh); return cached; }
    const res = await refresh;
    if (res) return res;
    if (req.mode === "navigate") {
      return (await cache.match("TalkPics.html")) || (await cache.match("index.html")) || Response.error();
    }
    return Response.error();
  })());
});
