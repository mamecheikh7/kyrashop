const SHOP={name:'KyraShop',whatsapp:'221770146578',currency:'FCFA',version:'V7 FINAL'};
const products=[
{id:1,name:'Parfum Hayaty',price:10000,category:'Parfums',note:'Une fragrance douce et élégante.',tag:'Doux',tone:'rose'},
{id:2,name:'Oud Mood Lattafa',price:10000,category:'Parfums',note:'Une présence chaleureuse autour de l’oud.',tag:'Oud',tone:'brown'},
{id:3,name:'Fakhar Lattafa',price:14000,category:'Parfums',note:'Un parfum au caractère affirmé.',tag:'Signature',tone:'black'},
{id:4,name:'Coffret Lamsat Harir / Intense Musk / Oud Al Layli',price:10000,category:'Coffrets',note:'Un coffret pratique pour varier les senteurs.',tag:'Coffret',tone:'cream'},
{id:5,name:'Liquid Brun',price:23000,category:'Parfums',note:'Une référence au profil profond et élégant.',tag:'Premium',tone:'bronze'},
{id:6,name:'Badee al Oud',price:15000,category:'Parfums',note:'Une fragrance boisée autour de l’oud.',tag:'Oud',tone:'green'},
{id:7,name:'Rifakhat',price:12000,category:'Parfums',note:'Une senteur facile à porter au quotidien.',tag:'Quotidien',tone:'lilac'},
{id:8,name:'Musuf Original',price:8000,category:'Parfums',note:'Une option accessible pour compléter sa collection.',tag:'Essentiel',tone:'blue'},
{id:9,name:'Eaux de Milk',price:7000,category:'Parfums',note:'Une référence douce et originale.',tag:'Doux',tone:'milk'},
{id:10,name:'Bint Horaran',price:10000,category:'Parfums',note:'Une fragrance élégante pour tous les jours.',tag:'Élégant',tone:'peach'},
{id:11,name:'Oud Pour Klassik',price:28000,category:'Parfums',note:'Une référence premium au caractère marqué.',tag:'Premium',tone:'blackgold'},
{id:12,name:'Oud Al Layli',price:10000,category:'Parfums',note:'Une fragrance inspirée d’un univers nocturne.',tag:'Nocturne',tone:'night'},
{id:13,name:'Khamra Lattafa',price:20000,category:'Parfums',note:'Une fragrance chaleureuse et gourmande.',tag:'Gourmand',tone:'amber'}
];
function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}}
let cart=readJSON('kyra_cart',[]),favorites=readJSON('kyra_favs',[]);let activeFilter='Tous',favoritesOnly=false,sortMode='default';
const $=id=>document.getElementById(id),grid=$('productGrid'),search=$('search');const money=n=>new Intl.NumberFormat('fr-FR').format(n)+' '+SHOP.currency;
function orderId(){return 'KYS-'+new Date().toISOString().slice(0,10).replaceAll('-','')+'-'+Math.random().toString(36).slice(2,6).toUpperCase()}
function cleanCart(){cart=cart.filter(i=>products.some(p=>p.id===i.id)&&Number.isFinite(i.qty)&&i.qty>0).map(i=>({id:i.id,qty:Math.floor(i.qty)}));}
function save(){localStorage.setItem('kyra_cart',JSON.stringify(cart));localStorage.setItem('kyra_favs',JSON.stringify(favorites));updateCounts()}
function updateCounts(){let c=cart.reduce((s,x)=>s+x.qty,0);$('cartCount').textContent=c;$('favCount').textContent=favorites.length;$('mobileCartCount').textContent=c;$('mobileFavCount').textContent=favorites.length}
function visibleProducts(){let q=search.value.trim().toLowerCase();let list=products.filter(p=>(favoritesOnly?favorites.includes(p.id):true)&&(activeFilter==='Tous'||p.category===activeFilter)&&(`${p.name} ${p.tag} ${p.note}`.toLowerCase().includes(q)));if(sortMode==='priceAsc')list.sort((a,b)=>a.price-b.price);if(sortMode==='priceDesc')list.sort((a,b)=>b.price-a.price);if(sortMode==='name')list.sort((a,b)=>a.name.localeCompare(b.name));return list}
function art(p,large=false){let src=`assets/products/${p.id}.jpg`;return `<div class="product-art ${large?'large':''} tone-${p.tone}"><img class="product-photo" src="${src}" alt="${p.name}" loading="lazy" onerror="this.remove()"><div class="art-fallback"><small>KYRASHOP</small><b>Photo</b><span>À VENIR</span></div></div>`}
function card(p){return `<article class="card"><div class="thumb">${art(p)}<span class="tag">${p.tag}</span><button class="heart ${favorites.includes(p.id)?'liked':''}" onclick="toggleFav(${p.id})" aria-label="${favorites.includes(p.id)?'Retirer des favoris':'Ajouter aux favoris'}">${favorites.includes(p.id)?'♥':'♡'}</button></div><div class="card-body"><span class="card-cat">${p.category}</span><h3>${p.name}</h3><p class="card-note">${p.note}</p><div class="price">${money(p.price)}</div><div class="card-actions"><button class="add" onclick="addToCart(${p.id})">Ajouter</button><button class="view" onclick="openProduct(${p.id})">Détails</button></div></div></article>`}
function render(){let list=visibleProducts();grid.innerHTML=list.map(card).join('')||'<p class="empty">Aucun produit ne correspond à votre recherche.</p>';$('resultCount').textContent=`${list.length} produit${list.length>1?'s':''}${favoritesOnly?' favori':''}`;$('clearSearch').hidden=!search.value&&!favoritesOnly}
function toast(msg){let t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window._toast);window._toast=setTimeout(()=>t.classList.remove('show'),1900)}
function toggleFav(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];save();render();toast(favorites.includes(id)?'Ajouté aux favoris':'Retiré des favoris')}
function addToCart(id,qty=1){let item=cart.find(x=>x.id===id);if(item)item.qty+=qty;else cart.push({id,qty});save();toast('Produit ajouté au panier');openCart()}
function changeQty(id,delta){let item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);save();openCart()}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();openCart()}
function totalCart(){return cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0)}
function orderText(name,phone,place,note,id=orderId()){let lines=cart.map(i=>{let p=products.find(x=>x.id===i.id);return `- ${p.name} x${i.qty}: ${money(p.price*i.qty)}`}).join('\n');return `Bonjour ${SHOP.name},\n\nRéférence commande : ${id}\nDate : ${new Date().toLocaleString('fr-FR')}\n\nJe souhaite commander :\n${lines}\n\nTotal : ${money(totalCart())}\n\nNom : ${name}\nTéléphone : ${phone}\nVille / zone : ${place}${note?`\nNote : ${note}`:''}`}
function whatsappLink(name='',phone='',place='',note='',id){return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(orderText(name,phone,place,note,id))}`}
function openCart(){let content=$('drawerContent');let rows=cart.map(i=>{let p=products.find(x=>x.id===i.id);return `<div class="cart-row">${art(p)}<div class="cart-info"><strong>${p.name}</strong><small>${money(p.price)} l'unité</small><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${i.qty}</b><button onclick="changeQty(${p.id},1)">+</button><button class="remove" onclick="removeItem(${p.id})">Supprimer</button></div></div><strong>${money(p.price*i.qty)}</strong></div>`}).join('');content.innerHTML=`<h2>Votre panier</h2>${rows||'<div class="empty">Votre panier est encore vide.<br>Ajoutez un parfum pour commencer.</div>'}${rows?`<div class="total"><span>Total</span><span>${money(totalCart())}</span></div><button class="primary full" onclick="openCheckout()">Finaliser la commande →</button><p class="cart-note">Les modalités de paiement et de livraison sont à confirmer avec KyraShop.</p>`:''}`;openDrawer()}
function openDrawer(){$('drawer').classList.add('open');$('backdrop').classList.add('open');$('drawer').setAttribute('aria-hidden','false');document.body.classList.add('no-scroll')}
function closeDrawer(){$('drawer').classList.remove('open');$('backdrop').classList.remove('open');$('drawer').setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll')}
function shareProduct(id){let p=products.find(x=>x.id===id);let text=`KyraShop — ${p.name} — ${money(p.price)}`;if(navigator.share){navigator.share({title:p.name,text}).catch(()=>{})}else{navigator.clipboard?.writeText(text);toast('Informations du produit copiées')}}
function openProduct(id){let p=products.find(x=>x.id===id);$('modalContent').innerHTML=`<div class="modal-image">${art(p,true)}</div><div class="modal-meta"><p class="eyebrow">${p.category} · ${p.tag}</p><h2>${p.name}</h2><div class="modal-price">${money(p.price)}</div><p class="modal-desc">${p.note}</p><div class="detail-row"><span>Référence</span><b>KYRA-${String(p.id).padStart(3,'0')}</b></div><div class="detail-row"><span>Disponibilité</span><b>À confirmer</b></div><button class="share-product" onclick="shareProduct(${p.id})">↗ Partager ce produit</button><div class="modal-buy"><div class="qty big"><button onclick="modalQty(-1)">−</button><b id="modalQty">1</b><button onclick="modalQty(1)">+</button></div><button class="add" onclick="addModalToCart(${p.id})">Ajouter au panier</button></div></div>`;$('productModal').dataset.product=id;$('productModal').classList.add('open');$('productModal').setAttribute('aria-hidden','false')}
function modalQty(delta){let n=Math.max(1,(parseInt($('modalQty').textContent)||1)+delta);$('modalQty').textContent=n}
function addModalToCart(id){addToCart(id,parseInt($('modalQty').textContent)||1);closeModal()}
function closeModal(){$('productModal').classList.remove('open');$('productModal').setAttribute('aria-hidden','true')}
function openCheckout(){if(!cart.length){toast('Votre panier est vide');return}closeDrawer();$('checkoutSummary').innerHTML=`<strong>${cart.reduce((s,x)=>s+x.qty,0)} article(s)</strong><span>${money(totalCart())}</span>`;let saved=JSON.parse(localStorage.getItem('kyra_customer')||'{}');if(saved.name)$('customerName').value=saved.name;if(saved.phone)$('customerPhone').value=saved.phone;if(saved.place)$('customerPlace').value=saved.place;$('checkout').classList.add('open');$('checkout').setAttribute('aria-hidden','false');setTimeout(()=>$('customerName').focus(),100)}
function closeCheckout(){$('checkout').classList.remove('open');$('checkout').setAttribute('aria-hidden','true')}
$('checkoutForm').addEventListener('submit',e=>{e.preventDefault();let customer={name:$('customerName').value.trim(),phone:$('customerPhone').value.trim(),place:$('customerPlace').value.trim()};localStorage.setItem('kyra_customer',JSON.stringify(customer));const id=orderId();localStorage.setItem('kyra_last_order',JSON.stringify({id,customer,items:cart,total:totalCart(),createdAt:new Date().toISOString()}));const url=whatsappLink(customer.name,customer.phone,customer.place,$('customerNote').value.trim(),id);const w=window.open(url,'_blank','noopener');if(!w)location.href=url;closeCheckout();toast('Commande préparée pour WhatsApp')});
cleanCart();
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeFilter=btn.dataset.filter;favoritesOnly=false;render();document.querySelector('#boutique').scrollIntoView({behavior:'smooth',block:'start'})}));
search.addEventListener('input',()=>{favoritesOnly=false;render()});$('sort').addEventListener('change',e=>{sortMode=e.target.value;render()});$('clearSearch').addEventListener('click',()=>{search.value='';favoritesOnly=false;render()});$('cartBtn').addEventListener('click',openCart);$('mobileCart').addEventListener('click',openCart);function showFav(){favoritesOnly=true;search.value='';$('boutique').scrollIntoView({behavior:'smooth'});render()}$('favBtn').addEventListener('click',showFav);$('mobileFav').addEventListener('click',showFav);$('closeDrawer').addEventListener('click',closeDrawer);$('backdrop').addEventListener('click',closeDrawer);$('closeModal').addEventListener('click',closeModal);$('closeCheckout').addEventListener('click',closeCheckout);$('productModal').addEventListener('click',e=>{if(e.target.id==='productModal')closeModal()});$('checkout').addEventListener('click',e=>{if(e.target.id==='checkout')closeCheckout()});
document.querySelectorAll('.collection-card').forEach(btn=>btn.addEventListener('click',()=>{let f=btn.dataset.jump||'Tous';activeFilter=f;favoritesOnly=false;search.value='';document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===f));render();$('boutique').scrollIntoView({behavior:'smooth'})}));$('allCollection').addEventListener('click',()=>{activeFilter='Tous';favoritesOnly=false;search.value='';document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter==='Tous'));render();$('boutique').scrollIntoView({behavior:'smooth'})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeDrawer();closeCheckout();closeAccount()}});
// Espace compte — authentification réelle via Supabase (après configuration du projet).
const accountModal = $('accountModal');
let kyraSupabase = null;
const kyraConfig = window.KYRA_SUPABASE_CONFIG || {};
const kyraAuthReady = Boolean(window.supabase && kyraConfig.url && kyraConfig.publishableKey && !kyraConfig.url.includes('TON-PROJET') && !kyraConfig.publishableKey.includes('TA_CLE'));
if (kyraAuthReady) kyraSupabase = window.supabase.createClient(kyraConfig.url, kyraConfig.publishableKey);
function openAccount(){accountModal.classList.add('open');accountModal.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');refreshAuthState()}
function closeAccount(){accountModal.classList.remove('open');accountModal.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll')}
function switchAccountTab(tab){document.querySelectorAll('.account-tab').forEach(b=>b.classList.toggle('active',b.dataset.accountTab===tab));$('accountLoginForm').hidden=tab!=='login';$('accountRegisterForm').hidden=tab!=='register'}
function accountMessage(message){const el=document.querySelector('.account-status');if(el)el.innerHTML='<span class="status-dot"></span> '+message}
async function refreshAuthState(){
  if(!kyraAuthReady){accountMessage('Configuration Supabase à compléter');return;}
  const {data:{session}}=await kyraSupabase.auth.getSession();
  if(session?.user){showLoggedIn(session);}
  else {accountMessage('Prêt — connexion sécurisée disponible');$('accountLoginForm').hidden=false;$('accountRegisterForm').hidden=true;const logout=$('accountLogout');if(logout)logout.hidden=true;}
}
$('accountBtn')?.addEventListener('click',openAccount);$('accountNav')?.addEventListener('click',e=>{e.preventDefault();openAccount()});$('mobileAccount')?.addEventListener('click',openAccount);$('closeAccount')?.addEventListener('click',closeAccount);accountModal?.addEventListener('click',e=>{if(e.target===accountModal)closeAccount()});document.querySelectorAll('.account-tab').forEach(b=>b.addEventListener('click',()=>switchAccountTab(b.dataset.accountTab)));
$('accountLoginForm')?.addEventListener('submit',async e=>{e.preventDefault();if(!kyraAuthReady){toast('Ajoute les clés Supabase dans supabase-config.js');return;}const identifier=$('accountLoginId').value.trim();const password=$('accountLoginPassword').value;const payload={email:identifier,password};const {error}=await kyraSupabase.auth.signInWithPassword(payload);if(error){toast(error.message);return;}toast('Connexion réussie');refreshAuthState();});
$('accountRegisterForm')?.addEventListener('submit',async e=>{e.preventDefault();if(!kyraAuthReady){toast('Ajoute les clés Supabase dans supabase-config.js');return;}const email=$('accountRegisterEmail').value.trim();const password=$('accountRegisterPassword').value;const metadata={full_name:$('accountRegisterName').value.trim(),phone:$('accountRegisterPhone').value.trim()};const {data,error}=await kyraSupabase.auth.signUp({email,password,options:{data:metadata,emailRedirectTo:window.location.href}});if(error){toast(error.message);return;}toast(data.session?'Compte créé':'Vérifie ton email pour confirmer le compte');switchAccountTab('login');});
$('forgotPassword')?.addEventListener('click',async()=>{
  if(!kyraAuthReady){toast('Configuration Supabase manquante');return;}
  const email=$('accountLoginId').value.trim();
  if(!email || !email.includes('@')){toast('Saisis ton email dans le champ de connexion');return;}
  const {error}=await kyraSupabase.auth.resetPasswordForEmail(email,{redirectTo:window.location.href});
  if(error){toast(error.message);return;}
  toast('Lien de réinitialisation envoyé si le compte existe');
});

function showLoggedIn(session){
  const email=session?.user?.email||'client KyraShop';
  accountMessage('Connecté : '+email);
  $('accountLoginForm').hidden=true;
  $('accountRegisterForm').hidden=true;
  let existing=$('accountLogout');
  if(!existing){existing=document.createElement('button');existing.id='accountLogout';existing.className='primary full';existing.textContent='Se déconnecter';accountModal.querySelector('.account-card').appendChild(existing);existing.addEventListener('click',async()=>{await kyraSupabase.auth.signOut();toast('Déconnexion réussie');switchAccountTab('login');refreshAuthState();});}
  existing.hidden=false;
}
if(kyraAuthReady)kyraSupabase.auth.onAuthStateChange(()=>refreshAuthState());
$('year').textContent=new Date().getFullYear();updateCounts();render();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
