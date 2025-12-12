// account.js
import { auth, db, onAuthStateChanged, collection, query, where, getDocs, doc, updateDoc } from "../firebase.js";

const userNameEl = document.getElementById("userName");
const totalOrdersEl = document.getElementById("totalOrders");
const pendingOrdersEl = document.getElementById("pendingOrders");
const completedOrdersEl = document.getElementById("completedOrders");
const logoutBtn = document.getElementById("logoutBtn");

const ordersTableBody = document.querySelector("#ordersTable tbody");
const settingsForm = document.getElementById("settingsForm");
const userNameInput = document.getElementById("userNameInput");
const userEmailInput = document.getElementById("userEmailInput");

let currentUserId = null;

// Handle Auth State
onAuthStateChanged(auth, async user => {
  if (!user) {
    window.location.href = "../auth/login.html";
    return;
  }
  currentUserId = user.uid;

  // Load user info
  userNameEl.textContent = user.displayName || "User";
  if (userNameInput) userNameInput.value = user.displayName || "";
  if (userEmailInput) userEmailInput.value = user.email;

  // Load orders if on orders page
  if (ordersTableBody) await loadOrders();
  // Load dashboard summary if on index.html
  if (totalOrdersEl) await loadDashboardSummary();
});

// Logout
if (logoutBtn) logoutBtn.addEventListener("click", () => auth.signOut().then(() => window.location.href = "../index.html"));

// Load orders
async function loadOrders() {
  ordersTableBody.innerHTML = "";
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", currentUserId));
  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const order = docSnap.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${docSnap.id}</td>
      <td>${order.products.map(p => p.name + " x" + p.qty).join(", ")}</td>
      <td>₵${order.total}</td>
      <td>${order.status}</td>
      <td>${new Date(order.date.seconds * 1000).toLocaleDateString()}</td>
    `;
    ordersTableBody.appendChild(tr);
  });
}

// Dashboard summary
async function loadDashboardSummary() {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", currentUserId));
  const snapshot = await getDocs(q);

  let total = 0, pending = 0, completed = 0;
  snapshot.forEach(docSnap => {
    total++;
    const order = docSnap.data();
    if (order.status === "Pending") pending++;
    else if (order.status === "Completed") completed++;
  });

  totalOrdersEl.textContent = total;
  pendingOrdersEl.textContent = pending;
  completedOrdersEl.textContent = completed;
}

// Settings form
if (settingsForm) {
  settingsForm.addEventListener("submit", async e => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", currentUserId);
      await updateDoc(userRef, { name: userNameInput.value });
      alert("Profile updated!");
      userNameEl.textContent = userNameInput.value;
    } catch (err) {
      alert("Error updating profile: " + err.message);
    }
  });
}
