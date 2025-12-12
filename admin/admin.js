// admin.js
import { auth, onAuthStateChanged } from "../firebase.js";

const ADMIN_UID = "0lRoMun3CXTwhfUp5W0PmC0j7Cz2";

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "../auth/login.html";
    return;
  }
  if (user.uid !== ADMIN_UID) {
    alert("Access denied. Admins only.");
    auth.signOut();
    window.location.href = "../auth/login.html";
  }
});


import { auth, db, onAuthStateChanged, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "../firebase.js";

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) logoutBtn.addEventListener("click", () => auth.signOut().then(() => window.location.href = "../index.html"));

// Dashboard summary
const totalProductsEl = document.getElementById("totalProducts");
const totalOrdersEl = document.getElementById("totalOrders");
const totalUsersEl = document.getElementById("totalUsers");

async function loadDashboard() {
  if (!totalProductsEl) return;
  const productsSnap = await getDocs(collection(db, "products"));
  const ordersSnap = await getDocs(collection(db, "orders"));
  const usersSnap = await getDocs(collection(db, "users"));

  totalProductsEl.textContent = productsSnap.size;
  totalOrdersEl.textContent = ordersSnap.size;
  totalUsersEl.textContent = usersSnap.size;
}

loadDashboard();

// Products Management
const addProductForm = document.getElementById("addProductForm");
const productsTableBody = document.querySelector("#productsTable tbody");

async function loadProducts() {
  if (!productsTableBody) return;
  productsTableBody.innerHTML = "";
  const productsSnap = await getDocs(collection(db, "products"));
  productsSnap.forEach(docSnap => {
    const p = docSnap.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>₵${p.price}</td>
      <td><img src="${p.imageUrl}" width="50"/></td>
      <td>${p.description || ""}</td>
      <td>
        <button class="editBtn" data-id="${docSnap.id}">Edit</button>
        <button class="deleteBtn" data-id="${docSnap.id}">Delete</button>
      </td>
    `;
    productsTableBody.appendChild(tr);
  });

  // Delete functionality
  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", async e => {
      await deleteDoc(doc(db, "products", e.target.dataset.id));
      loadProducts();
    });
  });
}

if (addProductForm) {
  addProductForm.addEventListener("submit", async e => {
    e.preventDefault();
    await addDoc(collection(db, "products"), {
      name: document.getElementById("productName").value,
      price: Number(document.getElementById("productPrice").value),
      imageUrl: document.getElementById("productImage").value,
      description: document.getElementById("productDesc").value
    });
    addProductForm.reset();
    loadProducts();
  });
}

loadProducts();

// Orders Management
const ordersTableBody = document.querySelector("#ordersTable tbody");
async function loadOrders() {
  if (!ordersTableBody) return;
  ordersTableBody.innerHTML = "";
  const ordersSnap = await getDocs(collection(db, "orders"));
  ordersSnap.forEach(docSnap => {
    const o = docSnap.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${docSnap.id}</td>
      <td>${o.userId}</td>
      <td>${o.products.map(p => p.name + " x" + p.qty).join(", ")}</td>
      <td>₵${o.total}</td>
      <td>${o.status}</td>
      <td>${new Date(o.date.seconds * 1000).toLocaleDateString()}</td>
      <td>
        <button class="updateStatusBtn" data-id="${docSnap.id}">Mark Completed</button>
        <button class="deleteOrderBtn" data-id="${docSnap.id}">Delete</button>
      </td>
    `;
    ordersTableBody.appendChild(tr);
  });

  document.querySelectorAll(".updateStatusBtn").forEach(btn => {
    btn.addEventListener("click", async e => {
      const orderRef = doc(db, "orders", e.target.dataset.id);
      await updateDoc(orderRef, { status: "Completed" });
      loadOrders();
    });
  });

  document.querySelectorAll(".deleteOrderBtn").forEach(btn => {
    btn.addEventListener("click", async e => {
      await deleteDoc(doc(db, "orders", e.target.dataset.id));
      loadOrders();
    });
  });
}

loadOrders();

// Users Management
const usersTableBody = document.querySelector("#usersTable tbody");
async function loadUsers() {
  if (!usersTableBody) return;
  usersTableBody.innerHTML = "";
  const usersSnap = await getDocs(collection(db, "users"));
  usersSnap.forEach(docSnap => {
    const u = docSnap.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.name || ""}</td>
      <td>${u.email || ""}</td>
      <td>
        <button class="deleteUserBtn" data-id="${docSnap.id}">Delete</button>
      </td>
    `;
    usersTableBody.appendChild(tr);
  });

  document.querySelectorAll(".deleteUserBtn").forEach(btn => {
    btn.addEventListener("click", async e => {
      await deleteDoc(doc(db, "users", e.target.dataset.id));
      loadUsers();
    });
  });
}

loadUsers();
