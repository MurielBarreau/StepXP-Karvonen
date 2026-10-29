// StepXP1 - © Muriel Barreau, CEDREPS, 2026 - CC BY-NC 4.0
// Pour forcer la mise à jour chez les élèves après une modification d'index.html : changer V (ex. "stepxp1-v2").
const V="stepxp1-v12",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
// On ne supprime que les caches de StepXP1 : le stockage de cache est partagé avec les autres applis du même compte GitHub.
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith("stepxp1-")&&n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!=="GET"||u.origin!==location.origin||!u.pathname.startsWith(new URL("./",location).pathname))return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
  const net=fetch(r).then(x=>{if(x&&x.ok){const c=x.clone();caches.open(V).then(ch=>ch.put(r,c))}return x}).catch(()=>hit);
  return hit||net}))});
