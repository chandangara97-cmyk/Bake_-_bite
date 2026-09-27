/* Bake & Bite — Efficient storefront logic (localStorage only) */
const products = [
  // Bakery
  { id: 1, name: "Brown Bread", cat: "bakery", sub: ["bread"], price: 40, rating: 4.5, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85" },
  { id: 2, name: "Garlic Bread", cat: "bakery", sub: ["bread", "snacks"], price: 80, rating: 4.6, img: "https://images.unsplash.com/photo-1619535860434-cf9b902a6c8f?auto=format&fit=crop&w=800&q=85" },
  { id: 3, name: "Dinner Rolls", cat: "bakery", sub: ["buns"], price: 60, rating: 4.4, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85" },
  { id: 4, name: "Biscuits (Pack)", cat: "bakery", sub: ["cookies"], price: 45, rating: 4.3, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85" },
  { id: 5, name: "Croissant", cat: "bakery", sub: ["pastries"], price: 70, rating: 4.7, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85" },
  { id: 6, name: "Chocolate Muffin", cat: "bakery", sub: ["muffins"], price: 60, rating: 4.6, img: "https://images.unsplash.com/photo-1558303053-7c2b6e6d1b57?auto=format&fit=crop&w=800&q=85" },
  { id: 7, name: "Veg Puff", cat: "bakery", sub: ["snacks"], price: 50, rating: 4.4, img: "https://images.unsplash.com/photo-1619535860434-cf9b902a6c8f?auto=format&fit=crop&w=800&q=85" },
  // Cakes
  { id: 11, name: "Chocolate Cake", cat: "cakes", sub: ["chocolate"], price: 650, rating: 4.8, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85" },
  { id: 12, name: "Red Velvet Cake", cat: "cakes", sub: ["anniversary"], price: 750, rating: 4.7, img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=85" },
  { id: 13, name: "Butterscotch Cake", cat: "cakes", sub: ["freshcream"], price: 700, rating: 4.6, img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=85" },
  { id: 14, name: "Pineapple Cake", cat: "cakes", sub: ["freshcream", "birthday"], price: 600, rating: 4.5, img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=85" },
  { id: 15, name: "Black Forest Cake", cat: "cakes", sub: ["chocolate"], price: 700, rating: 4.8, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85" },
  { id: 16, name: "Photo Cake", cat: "cakes", sub: ["birthday"], price: 900, rating: 4.9, img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=85" },
  // Pizza
  { id: 21, name: "Margherita Pizza", cat: "pizza", sub: ["veg"], price: 220, rating: 4.5, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85" },
  { id: 22, name: "Farm House Pizza", cat: "pizza", sub: ["veg", "special"], price: 280, rating: 4.6, img: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=85" },
  { id: 23, name: "Spicy Paneer Pizza", cat: "pizza", sub: ["veg"], price: 260, rating: 4.4, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85" },
  { id: 24, name: "Chicken Supreme", cat: "pizza", sub: ["nonveg"], price: 320, rating: 4.7, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=85" },
  { id: 25, name: "Tandoori Chicken Pizza", cat: "pizza", sub: ["nonveg"], price: 300, rating: 4.6, img: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=85" },
  { id: 26, name: "BBQ Chicken Pizza", cat: "pizza", sub: ["nonveg", "special"], price: 320, rating: 4.8, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=85" }
];

const SUB_LABELS = {
  bread: "Bread", buns: "Bun & Rolls", cookies: "Cookies", pastries: "Pastries",
  muffins: "Muffins", snacks: "Snacks", birthday: "Birthday", anniversary: "Anniversary",
  chocolate: "Chocolate", freshcream: "Fresh Cream", veg: "Veg", nonveg: "Non-Veg", special: "Special"
};

const money = n => "₹" + Math.round(n).toLocaleString("en-IN");
const stars = r => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

/* ---------- Cart ---------- */
const cart = () => JSON.parse(localStorage.bb_cart || "[]");
function save(c) { localStorage.bb_cart = JSON.stringify(c); count(); }
function count() {
  const n = cart().reduce((a, x) => a + x.qty, 0);
  document.querySelectorAll(".cartcount").forEach(e => e.textContent = n);
}
function addToCart(id, qty = 1) {
  let c = cart(), x = c.find(i => i.id == id);
  if (x) x.qty += qty;
  else c.push({ id: +id, qty });
  save(c);
  toast("Added to cart ✓");
}
function qty(id, d) {
  let c = cart(), x = c.find(i => i.id == id);
  if (x) x.qty += d;
  save(c.filter(x => x.qty > 0));
  renderCart();
}

/* ---------- Product cards ---------- */
function card(p) {
  return `<article class="card">
    <a href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy" width="400" height="190"></a>
    <div class="cardbody">
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="rating">${stars(p.rating)} <span class="muted">(${p.rating})</span></div>
      <div class="row">
        <span class="price">${money(p.price)}</span>
        <button class="btn" onclick="addToCart(${p.id})">Add</button>
      </div>
    </div>
  </article>`;
}
function grid(id, cat, sub) {
  const e = document.getElementById(id);
  if (!e) return;
  const list = products.filter(p => (!cat || p.cat === cat) && (!sub || p.sub.includes(sub)));
  e.innerHTML = list.length
    ? list.map(card).join("")
    : '<p class="empty-state muted">No items in this category yet.</p>';
}
function wireFilters(containerId, gridId, cat) {
  const box = document.getElementById(containerId);
  if (!box) return;
  box.querySelectorAll("[data-sub]").forEach(btn => {
    btn.addEventListener("click", () => {
      box.querySelectorAll("[data-sub]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      grid(gridId, cat, btn.dataset.sub || null);
    });
  });
}

/* ---------- Product detail ---------- */
function loadProduct() {
  const e = document.getElementById("productView");
  if (!e) return;
  const id = +(new URLSearchParams(location.search).get("id") || products[0].id);
  const p = products.find(x => x.id == id) || products[0];
  document.title = p.name + " | Bake & Bite";

  const bc = document.getElementById("breadcrumb");
  if (bc) {
    const catLabel = p.cat === "cakes" ? "Cakes" : p.cat === "pizza" ? "Pizza" : "Bakery";
    bc.innerHTML = `<a href="index.html">Home</a> / <a href="${p.cat}.html">${catLabel}</a> / ${p.name}`;
  }

  const opts = p.cat === "cakes"
    ? ["Half Kg", "1 Kg", "1.5 Kg", "2 Kg"]
    : p.cat === "pizza"
      ? ["Regular", "Medium", "Large"]
      : ["Regular", "Family Pack"];

  e.innerHTML = `
    <div><img src="${p.img}" alt="${p.name}" loading="eager"></div>
    <div>
      <div class="muted" style="font-size:12px;letter-spacing:1px;font-weight:600">${(SUB_LABELS[p.sub[0]] || p.cat).toUpperCase()}</div>
      <h1>${p.name}</h1>
      <div class="rating" style="font-size:16px">${stars(p.rating)} <span class="muted">(${p.rating})</span></div>
      <div class="price" style="font-size:28px;margin:12px 0">${money(p.price)}</div>
      <p class="muted" style="line-height:1.7;margin-bottom:8px">Freshly prepared by Bake &amp; Bite using quality ingredients. Choose your preferred option and add it to your order.</p>
      <div>
        <label class="muted" style="font-size:12px;letter-spacing:0.5px">SIZE</label>
        <div class="options">${opts.map((o, i) => `<button class="option${i === 0 ? " active" : ""}" type="button" onclick="selectOption(this)">${o}</button>`).join("")}</div>
      </div>
      <div class="qty" style="margin:18px 0">
        <button type="button" onclick="stepQty(-1)">−</button>
        <span id="pQty">1</span>
        <button type="button" onclick="stepQty(1)">+</button>
      </div>
      <button class="btn orange" style="padding:14px 28px;font-size:15px" onclick="addFromDetail(${p.id})">Add to Cart</button>
    </div>`;
}
function selectOption(btn) {
  btn.parentElement.querySelectorAll(".option").forEach(o => o.classList.remove("active"));
  btn.classList.add("active");
}
function stepQty(d) {
  const e = document.getElementById("pQty");
  e.textContent = Math.max(1, (+e.textContent) + d);
}
function addFromDetail(id) {
  const q = +(document.getElementById("pQty")?.textContent || 1);
  addToCart(id, q);
}

/* ---------- Cart page ---------- */
function renderCart() {
  const e = document.getElementById("cartItems");
  if (!e) return;
  const c = cart();
  let sub = 0;
  if (!c.length) {
    e.innerHTML = '<div class="empty-state"><p>Your cart is empty.</p><a href="bakery.html">Start shopping →</a></div>';
  } else {
    e.innerHTML = c.map(x => {
      const p = products.find(q => q.id == x.id);
      sub += p.price * x.qty;
      return `<div class="cartitem">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div>
          <b>${p.name}</b>
          <div class="muted">${money(p.price)}</div>
          <div class="qty" style="margin-top:8px">
            <button type="button" onclick="qty(${p.id},-1)">−</button>
            <span>${x.qty}</span>
            <button type="button" onclick="qty(${p.id},1)">+</button>
          </div>
        </div>
        <span class="price">${money(p.price * x.qty)}</span>
      </div>`;
    }).join("");
  }
  const total = sub ? sub + 50 : 0;
  document.querySelectorAll("[data-sub]").forEach(el => el.textContent = money(sub));
  document.querySelectorAll("[data-total]").forEach(el => el.textContent = money(total));
}

/* ---------- Checkout → Payment → Order ---------- */
function goToPayment() {
  if (!cart().length) return toast("Your cart is empty");
  const pm = document.querySelector('input[name="pm"]:checked');
  localStorage.bb_checkout = JSON.stringify({
    name: document.getElementById("ckName")?.value || "",
    phone: document.getElementById("ckPhone")?.value || "",
    address: document.getElementById("ckAddress")?.value || "",
    method: pm ? pm.value : "UPI / Wallet"
  });
  location.href = "payment.html";
}
function orderTotal() {
  return cart().reduce((a, x) => a + products.find(p => p.id == x.id).price * x.qty, 0) + (cart().length ? 50 : 0);
}
function placeOrder() {
  if (!cart().length) return toast("Your cart is empty");
  const total = orderTotal();
  const order = {
    id: "BB" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + Math.floor(Math.random() * 90 + 10),
    items: cart().reduce((a, x) => a + x.qty, 0),
    total,
    status: "Preparing",
    date: new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
  };
  const hist = JSON.parse(localStorage.bb_orders || "[]");
  hist.unshift(order);
  localStorage.bb_orders = JSON.stringify(hist);
  localStorage.bb_order = JSON.stringify(order);
  localStorage.removeItem("bb_cart");
  location.href = "confirmation.html";
}

/* ---------- Orders ---------- */
function seedOrders() {
  if (localStorage.bb_orders) return;
  localStorage.bb_orders = JSON.stringify([
    { id: "BB20250924", items: 3, total: 820, status: "Preparing", date: "24 Sep, 11:20 AM" },
    { id: "BB20250923", items: 2, total: 450, status: "Out for Delivery", date: "23 Sep, 04:15 PM" },
    { id: "BB20250922", items: 1, total: 320, status: "Delivered", date: "22 Sep, 07:30 PM" }
  ]);
}
function orderCard(o) {
  return `<div class="panel orderitem">
    <div class="row">
      <div>
        <b>Order #${o.id}</b>
        <div class="muted">${o.items} item${o.items > 1 ? "s" : ""} • ${o.date}</div>
      </div>
      <span class="status status-${o.status.replace(/\s+/g, "")}">${o.status}</span>
    </div>
    <p class="total" style="margin:10px 0 0">${money(o.total)}</p>
  </div>`;
}
function renderOrders(filterStatus) {
  const e = document.getElementById("ordersList");
  if (!e) return;
  seedOrders();
  let list = JSON.parse(localStorage.bb_orders || "[]");
  if (filterStatus) list = list.filter(o => o.status === filterStatus);
  e.innerHTML = list.length
    ? list.map(orderCard).join("")
    : '<p class="empty-state muted">No orders in this category.</p>';
}
function wireOrderFilters() {
  const box = document.getElementById("orderFilters");
  if (!box) return;
  box.querySelectorAll("[data-status]").forEach(btn => {
    btn.addEventListener("click", () => {
      box.querySelectorAll("[data-status]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderOrders(btn.dataset.status || null);
    });
  });
}

/* ---------- Admin ---------- */
function seedAdmin() {
  if (localStorage.bb_admin_orders) return;
  localStorage.bb_admin_orders = JSON.stringify([
    { id: "BB0501050401", customer: "Rohit Sharma", items: 3, total: 820, status: "Preparing" },
    { id: "BB0501050309", customer: "Priya Verma", items: 2, total: 450, status: "Out for Delivery" },
    { id: "BB0501050207", customer: "Amit Kumar", items: 1, total: 320, status: "Delivered" }
  ]);
}
function renderAdmin() {
  const t = document.getElementById("adminTable");
  if (!t) return;
  seedAdmin();
  const rows = JSON.parse(localStorage.bb_admin_orders || "[]");
  t.innerHTML = "<tr><th>#</th><th>Customer</th><th>Items</th><th>Amount</th><th>Status</th><th>Action</th></tr>" +
    rows.map(o => `<tr>
      <td>#${o.id}</td>
      <td>${o.customer}</td>
      <td>${o.items}</td>
      <td>${money(o.total)}</td>
      <td><span class="status status-${o.status.replace(/\s+/g, "")}">${o.status}</span></td>
      <td><a href="#" class="viewlink" onclick="toast('Order #${o.id} — ${o.customer}');return false;">View</a></td>
    </tr>`).join("");
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  count();
  initMobileMenu();
  grid("allGrid");
  grid("bakeryGrid", "bakery");
  grid("cakeGrid", "cakes");
  grid("pizzaGrid", "pizza");
  wireFilters("bakeryCats", "bakeryGrid", "bakery");
  wireFilters("cakeFilters", "cakeGrid", "cakes");
  wireFilters("pizzaFilters", "pizzaGrid", "pizza");
  renderCart();
  loadProduct();
  renderOrders();
  wireOrderFilters();
  renderAdmin();

  const o = JSON.parse(localStorage.bb_order || "null");
  document.querySelectorAll("[data-order-id]").forEach(e => e.textContent = o ? "#" + o.id : "—");
  document.querySelectorAll("[data-order-total]").forEach(e => e.textContent = o ? money(o.total) : "—");
  if (document.querySelector(".payment-layout")) {
    document.querySelectorAll(".payment-layout [data-total]").forEach(e => e.textContent = money(orderTotal()));
  }
});
