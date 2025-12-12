import { auth, db, onAuthStateChanged, collection, getDocs, doc, getDoc, updateDoc } from "../firebase.js";

// Redirect non-logged-in users
onAuthStateChanged(auth, async user => {
  if (!user) {
    window.location.href = "../auth/login.html";
    return;
  }

  // Load dashboard user info
  const userNameEl = document.getElementById("userName");
  if (userNameEl) userNameEl.textContent = user.displayName || "User";

  // Load orders summary
  const ordersSnap = await getDocs(collection(db, "orders"));
  let totalOrders = 0;
  let totalSpent = 0;
  ordersSnap.forEach(docSnap => {
    const o = docSnap.data();
    if (o.userId === user.uid) {
      totalOrders++;
      totalSpent += o.total;
    }
  });
  const totalOrdersEl = document.getElementById("totalOrders");
  const totalSpentEl = document.getElementById("totalSpent");
  if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
  if (totalSpentEl) totalSpentEl.textContent = `₵${totalSpent}`;

  // Load orders table
  const ordersTableBody = document.querySelector("#ordersTable tbody");
  if (ordersTableBody) {
    ordersTableBody.innerHTML = "";
    ordersSnap.forEach(docSnap => {
      const o = docSnap.data();
      if (o.userId === user.uid) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${docSnap.id}</td>
          <td>${o.products.map(p => p.name + " x" + p.qty).join(", ")}</td>
          <td>₵${o.total}</td>
          <td>${o.status}</td>
          <td>${new Date(o.date.seconds * 1000).toLocaleDateString()}</td>
        `;
        ordersTableBody.appendChild(tr);
      }
    });
  }

  // Load profile settings
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");

    // Pre-fill
    profileName.value = user.displayName || "";
    profileEmail.value = user.email;

    // Update profile
    profileForm.addEventListener("submit", async e => {
      e.preventDefault();
      await updateDoc(doc(db, "users", user.uid), { name: profileName.value });
      alert("Profile updated!");
    });
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", () => auth.signOut().then(() => window.location.href = "../auth/login.html"));
});
