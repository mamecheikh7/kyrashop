const CACHE='kyrashop-v7';
const ASSETS=['./','./index.html','./style.css','./script.js','./manifest.json',
'./assets/logo.jpg','./assets/catalogue.jpg','./assets/catalogue-client.jpg',
'./assets/products/1.jpg','./assets/products/2.jpg','./assets/products/5.jpg',
'./assets/products/6.jpg','./assets/products/7.jpg','./assets/products/8.jpg',
'./assets/products/10.jpg','./assets/products/11.jpg','./assets/products/12.jpg',
'./assets/products/13.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
