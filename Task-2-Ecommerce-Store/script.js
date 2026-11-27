const API_URL = "https://fakestoreapi.com/products";
const DEMO_PRODUCTS = [
  {id:101,title:"Everyday Cotton T-Shirt",price:499,category:"Fashion",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",rating:{rate:4.5,count:120},badge:"BESTSELLER"},
  {id:102,title:"Classic Canvas Sneakers",price:1299,category:"Fashion",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",rating:{rate:4.6,count:85},badge:"TRENDING"},
  {id:103,title:"Wireless Bluetooth Headphones",price:1899,category:"Electronics",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",rating:{rate:4.7,count:210},badge:"TOP PICK"},
  {id:104,title:"Smart Mobile Phone",price:14999,category:"Mobiles",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",rating:{rate:4.4,count:160},badge:"DEAL ZONE"},
  {id:105,title:"Yoga Mat for Daily Practice",price:799,category:"Sports",image:"https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500",rating:{rate:4.5,count:64},badge:"ACTIVE"},
  {id:106,title:"The Art of Simple Living",price:399,category:"Books",image:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",rating:{rate:4.3,count:72},badge:"EDITOR'S PICK"},
  {id:107,title:"Wooden Building Blocks",price:649,category:"Toys",image:"https://images.unsplash.com/photo-1599623560574-39d485900c95?w=500",rating:{rate:4.8,count:91},badge:"KIDS FAVOURITE"},
  {id:108,title:"Organic Grocery Essentials Box",price:899,category:"Grocery",image:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=500",rating:{rate:4.4,count:48},badge:"FRESH PICK"},
  {id:109,title:"Daily Glow Skincare Set",price:999,category:"Beauty",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500",rating:{rate:4.6,count:130},badge:"GLOW UP"},
  {id:110,title:"Minimal Ceramic Vase",price:549,category:"Home",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500",rating:{rate:4.5,count:58},badge:"HOME EDIT"},
  {id:111,title:"Kids Printed Backpack",price:699,category:"Kids",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",rating:{rate:4.4,count:44},badge:"LITTLE JOYS"},
  {id:112,title:"Personalised Gift Box",price:799,category:"Gifting",image:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500",rating:{rate:4.7,count:80},badge:"GIFT READY"},
  {id:113,title:"Home Deep Cleaning Service",price:499,category:"Services",image:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500",rating:{rate:4.5,count:36},badge:"SERVICE"},
  {id:114,title:"Stainless Steel Water Bottle",price:349,category:"Sports",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",rating:{rate:4.2,count:55},badge:"VALUE DEAL"},
  {id:115,title:"Decorative Table Lamp",price:1199,category:"Home",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",rating:{rate:4.6,count:69},badge:"NEW"},
  {id:116,title:"Soft Plush Teddy Bear",price:599,category:"Toys",image:"https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500",rating:{rate:4.8,count:102},badge:"GIFT PICK"}
];

const state = {products:[],category:"All",search:"",cart:JSON.parse(localStorage.getItem("rw_cart")||"[]"),orders:JSON.parse(localStorage.getItem("rw_orders")||"[]"),customer:JSON.parse(localStorage.getItem("rw_customer")||"null")};
const $ = id => document.getElementById(id);
const money = n => "₹"+Number(n).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2});
const categoryMap = {"men's clothing":"Fashion","women's clothing":"Fashion","jewelery":"Gifting","electronics":"Electronics"};
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function persistCart(){localStorage.setItem("rw_cart",JSON.stringify(state.cart));updateCartUI()}
function normalizeApiProduct(p){return {...p,category:categoryMap[p.category]||"Fashion",source:"FakeStoreAPI"}}
async function loadProducts(){
  try{
    const response=await fetch(API_URL);
    if(!response.ok) throw new Error("API unavailable");
    const apiProducts=(await response.json()).map(normalizeApiProduct);
    state.products=[...apiProducts,...DEMO_PRODUCTS];
    $("resultSummary").textContent=`${state.products.length} products to explore`;
  }catch(error){
    state.products=[...DEMO_PRODUCTS];
    $("resultSummary").textContent="Showing demo collection — live product API could not be reached";
    showToast("Live catalog unavailable. Showing sample products.");
  }
  renderProducts();
}
function renderProducts(){
  let items=state.products.filter(p=>(state.category==="All"|| (state.category==="Deals"?(p.badge==="DEAL ZONE" || p.price<500):p.category===state.category)) && (p.title+" "+p.category).toLowerCase().includes(state.search.toLowerCase()));
  const sort=$("sortSelect").value;
  if(sort==="low")items.sort((a,b)=>a.price-b.price);
  if(sort==="high")items.sort((a,b)=>b.price-a.price);
  if(sort==="rating")items.sort((a,b)=>(b.rating?.rate||0)-(a.rating?.rate||0));
  $("resultSummary").textContent=`Showing ${items.length} of ${state.products.length} products`;
  $("productGrid").innerHTML=items.length?items.map(p=>`
    <article class="product-card">
      <div class="product-image-wrap"><span class="product-badge">${escapeHTML(p.badge||"CURATED")}</span><img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.title)}" loading="lazy" onerror="this.src='https://placehold.co/300x300/f7eeee/c92d37?text=Product'"></div>
      <div class="product-info"><span class="product-category">${escapeHTML(p.category)}</span><h3 class="product-title">${escapeHTML(p.title)}</h3>
      <div class="rating">★ ${Number(p.rating?.rate||4.2).toFixed(1)} <span>(${p.rating?.count||24} reviews)</span></div>
      <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}">＋ ADD</button></div></div>
    </article>`).join(""):`<div class="empty-state">No products found. Try another search or category.</div>`;
  document.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>addToCart(Number(btn.dataset.add))));
}
function escapeHTML(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function escapeAttr(s=""){return escapeHTML(s)}
function addToCart(id){const p=state.products.find(x=>x.id===id);if(!p)return;const existing=state.cart.find(x=>x.id===id);if(existing)existing.quantity++;else state.cart.push({...p,quantity:1});persistCart();showToast("Added to your bag")}
function updateQuantity(id,delta){const item=state.cart.find(x=>x.id===id);if(!item)return;item.quantity+=delta;if(item.quantity<=0)removeFromCart(id);else persistCart()}
function removeFromCart(id){state.cart=state.cart.filter(x=>x.id!==id);persistCart();showToast("Item removed")}
function calculateTotal(){const subtotal=state.cart.reduce((sum,p)=>sum+p.price*p.quantity,0);const tax=subtotal*.05;const shipping=subtotal===0||subtotal>=2000?0:79;return{subtotal,tax,shipping,total:subtotal+tax+shipping}}
function updateCartUI(){
  const count=state.cart.reduce((n,p)=>n+p.quantity,0);$("cartCount").textContent=count;$("drawerCount").textContent=`(${count})`;
  $("cartItems").innerHTML=state.cart.length?state.cart.map(p=>`<div class="cart-item"><img src="${escapeAttr(p.image)}" alt=""><div><h4>${escapeHTML(p.title)}</h4><div class="item-price">${money(p.price*p.quantity)}</div><div class="quantity-control"><button data-qty="${p.id}" data-delta="-1">−</button><span>${p.quantity}</span><button data-qty="${p.id}" data-delta="1">＋</button></div></div><button class="remove-item" data-remove="${p.id}">Remove</button></div>`).join(""):`<div class="empty-state">Your bag is waiting for something lovely.</div>`;
  const totals=calculateTotal();$("subtotal").textContent=money(totals.subtotal);$("tax").textContent=money(totals.tax);$("shipping").textContent=totals.shipping?money(totals.shipping):"FREE";$("grandTotal").textContent=money(totals.total);$("checkoutTotal").textContent=money(totals.total);$("checkoutButton").disabled=!state.cart.length;
  document.querySelectorAll("[data-qty]").forEach(b=>b.addEventListener("click",()=>updateQuantity(Number(b.dataset.qty),Number(b.dataset.delta))));
  document.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>removeFromCart(Number(b.dataset.remove))));
}
function openCart(){$("cartDrawer").classList.add("open");$("overlay").classList.add("show");$("cartDrawer").setAttribute("aria-hidden","false")}
function closeCart(){$("cartDrawer").classList.remove("open");$("overlay").classList.remove("show");$("cartDrawer").setAttribute("aria-hidden","true")}
function openModal(id){$(id).classList.add("show");$(id).setAttribute("aria-hidden","false")}
function closeModals(){document.querySelectorAll(".modal.show").forEach(m=>{m.classList.remove("show");m.setAttribute("aria-hidden","true")})}
function setCategory(category){state.category=category;document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("active",b.dataset.category===category));renderProducts();$("catalog").scrollIntoView({behavior:"smooth",block:"start"})}
function showOrders(){const area=$("orderHistory");area.innerHTML=state.orders.length?state.orders.slice().reverse().map(o=>`<div class="order-entry"><strong>Order ${o.id} · ${money(o.total)}</strong><small>${o.date} · ${escapeHTML(o.name)} · ${o.items.length} item(s)</small><p>${o.items.map(i=>`${escapeHTML(i.title)} × ${i.quantity}`).join("<br>")}</p></div>`).join(""):`<p class="muted">No orders yet. Your placed demo orders will appear here.</p>`;openModal("ordersModal")}
document.querySelectorAll("[data-category]").forEach(b=>b.addEventListener("click",()=>setCategory(b.dataset.category)));
$("searchForm").addEventListener("submit",e=>{e.preventDefault();state.search=$("searchInput").value.trim();renderProducts();$("catalog").scrollIntoView({behavior:"smooth"})});
$("searchInput").addEventListener("input",e=>{state.search=e.target.value.trim();renderProducts()});
$("sortSelect").addEventListener("change",renderProducts);
$("cartButton").addEventListener("click",openCart);$("overlay").addEventListener("click",closeCart);
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>{closeCart();closeModals()}));
$("shopNowButton").addEventListener("click",()=>$("catalog").scrollIntoView({behavior:"smooth"}));
$("themeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("rw_theme",document.body.classList.contains("dark")?"dark":"light");$("themeToggle").textContent=document.body.classList.contains("dark")?"☀":"☾"});
if(localStorage.getItem("rw_theme")==="dark"){document.body.classList.add("dark");$("themeToggle").textContent="☀"}
$("loginButton").addEventListener("click",()=>{if(state.customer){showToast(`Welcome, ${state.customer.name}`);return}openModal("loginModal")});
$("loginForm").addEventListener("submit",e=>{e.preventDefault();state.customer={name:$("customerName").value.trim(),email:$("customerEmail").value.trim()};localStorage.setItem("rw_customer",JSON.stringify(state.customer));closeModals();showToast(`Welcome, ${state.customer.name}!`)});
$("ordersButton").addEventListener("click",showOrders);
$("checkoutButton").addEventListener("click",()=>{if(!state.cart.length)return;if(state.customer){$("addressName").value=state.customer.name}closeCart();openModal("checkoutModal")});
$("checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();if(!state.cart.length)return;
  const totals=calculateTotal();const order={id:"RW"+Date.now().toString().slice(-7),date:new Date().toLocaleString(),name:$("addressName").value.trim(),phone:$("addressPhone").value.trim(),address:$("addressLine").value.trim(),city:$("addressCity").value.trim(),pin:$("addressPin").value.trim(),items:state.cart.map(({id,title,price,quantity})=>({id,title,price,quantity})),subtotal:totals.subtotal,tax:totals.tax,shipping:totals.shipping,total:totals.total};
  state.orders.push(order);localStorage.setItem("rw_orders",JSON.stringify(state.orders));state.cart=[];persistCart();closeModals();
  $("confirmationText").textContent=`Order ${order.id} has been saved in this browser as a demo order. No payment was taken.`;
  $("receipt").innerHTML=`<b>Delivery to:</b><br>${escapeHTML(order.name)}<br>${escapeHTML(order.address)}, ${escapeHTML(order.city)} – ${escapeHTML(order.pin)}<br><br><b>Bill summary</b><br>Subtotal: ${money(order.subtotal)}<br>Tax (5%): ${money(order.tax)}<br>Shipping: ${order.shipping?money(order.shipping):"FREE"}<br><b>Total: ${money(order.total)}</b>`;
  openModal("confirmationModal");
});
$("confirmationDone").addEventListener("click",()=>{closeModals();$("checkoutForm").reset();showToast("Happy shopping!")});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();closeModals()}});
updateCartUI();loadProducts();
