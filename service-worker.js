const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })()
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          const networkRespose = await fetch(event.request);
          return networkRespose;
        } catch (error) {
          console.log("Fetch failed; returning offline page instead.", error);
          const cache = await caches.open(CACHE_NAME);
          const cacheResponse = await cache.match(OFFLINE_URL);
          return cacheResponse;
        }
      })()
    );
  }
});

// let deferredPrompt;

// window.addEventListener("beforeinstallprompt", (e)=>{
//     e.preventDefault;
//     deferredPrompt = e;
//     showInstallPromotion();
//     console.log(`'beforeinstallprompt' event was fired.`);
// });

// var buttonInstall = $('.btn-install');

// buttonInstall.addEventListener("click", async()=> {
//     hideInstallPromotion();
//     deferredPrompt.prompt();
//     const { outcome } = await deferredPrompt.userChoice;
//     console.log(`User respons to install promt: ${outcome}`);
//     deferredPrompt = null;
// });
