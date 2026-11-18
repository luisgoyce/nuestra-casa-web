// Service worker de Nuestra casa: solo recibe avisos (no guarda datos ni trabaja sin conexión).
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('push',event=>{
 let data={};try{data=event.data?event.data.json():{};}catch{data={body:event.data?.text()||''};}
 const title=data.title||'Nuestra casa';
 event.waitUntil(self.registration.showNotification(title,{body:data.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:data.tag||'casa-aviso',data:{url:data.url||'./#inicio'}}));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const target=new URL(event.notification.data?.url||'./#inicio',self.registration.scope).href;
 event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
  for(const c of list){if(c.url.startsWith(self.registration.scope)){c.navigate?.(target);return c.focus();}}
  return self.clients.openWindow(target);
 }));
});
