const V='erguido-v7';
const FILES=['app.html','manifest.webmanifest','icon.png','icon-192.png','pose.js','pose_landmark_full.tflite','pose_solution_packed_assets.data','pose_solution_packed_assets_loader.js','pose_solution_simd_wasm_bin.js','pose_solution_simd_wasm_bin.data','pose_solution_simd_wasm_bin.wasm','pose_web.binarypb','Inter-Bold.otf','Inter-Medium.otf','Inter-Regular.otf','Inter-SemiBold.otf','referencias.html','Erguido_referencias.docx','pro.js','pro.css'];
const CDN=/^https:\/\/cdn\.jsdelivr\.net\/npm\/@mediapipe\/face_mesh@/;
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(f=>c.add(new Request(f,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const q=e.request; if(q.method!=='GET')return;
  const own=q.url.startsWith(self.location.origin), cdn=CDN.test(q.url); if(!own&&!cdn)return;
  const keep=res=>{if(res.ok){const c=res.clone();caches.open(V).then(x=>x.put(q,c));}return res;};
  if(q.mode==='navigate'){e.respondWith(fetch(q).then(keep).catch(()=>caches.match(q).then(r=>r||caches.match('app.html'))));return;}
  e.respondWith(caches.match(q).then(r=>r||fetch(q).then(keep)));
});
