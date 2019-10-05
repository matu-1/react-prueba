// importScripts('js/sw-utils.js');

const CACHE_STATIC_NAME = "static-v1";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_INMUTABLE_NAME = "inmutable-v1";
const CACHE_DYNAMIC_LIMIT = 50;

// todo lo necesario para que funcione es decir es el corazon de la app
const APP_SHELL = [
  "/",
  "index.html", /// or 'index.html'
  "favicon.ico",
  "js/app.js",
  'js/sw-utils.js',
];

////lo que no se va a modificar jamas
const APP_SHELL_INMUTABLE = [
  "04.png"
];

self.addEventListener("install", e => {
  const cacheStatic = caches
    .open(CACHE_STATIC_NAME)
    .then(cache => cache.addAll(APP_SHELL));

  const cacheInmutable = caches
    .open(CACHE_INMUTABLE_NAME)
    .then(cache => cache.addAll(APP_SHELL_INMUTABLE));

    console.log("entro install", e);

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

//cuando se activa limpio los antiguos caches
self.addEventListener("activate", e => {
  const respuesta = caches.keys(keys => {
    keys.forEach(key => {
      if (key !== CACHE_STATIC_NAME && key.includes("static")) {
        return caches.delete(key);
      }
    });
  });

  e.waitUntil(respuesta);
});

self.addEventListener("fetch", e => {

  // busco la peticion en  el cache
  const respuesta = caches.match(e.request).then(resp => {
    if (resp) {
        fetch(e.request).then(newRes => {
          if (newRes.ok) {
            caches.open(CACHE_DYNAMIC_NAME).then(cache => {
              cache.put(e.request, newRes);
            });
             newRes.clone();
             console.log("se actualiza el cache dinamico");
          } else {
            ///si no hay respuesta
          
          }
        }).catch( error => console.log("no hay internet"));
      return resp;
    } else {
      console.log("no existe en el cache", e.request.url);
      return fetch(e.request).then(newRes => {
        if (newRes.ok) {
            caches.open(CACHE_DYNAMIC_NAME).then(cache => {
            cache.put(e.request, newRes);
            console.log("se guarda el cache dinamico");
          });
          return newRes.clone();
        } else {
          ///si no hay respuesta
          return newRes;
        }
      }).catch( error => console.log("no hay internet 2"));
    }
  });

  e.respondWith(respuesta);

});
