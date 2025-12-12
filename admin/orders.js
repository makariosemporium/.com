// orders.js
import { db, collection, getDocs, updateDoc, doc } from "../firebase.js";

const ordersTableBody = document.querySelector("#ordersTable tbody");

async function loadOrders() {
  const snapshot = await getDocs(collection(db, "orders"));
  ordersTableBody.innerHTML = '';

  snapshot.forEach(docSnap => {
    const o = docSnap.data();
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td data-label="Order ID">${docSnap.id}</td>
      <td data-label="Customer">${o.customerName}</td>
      <td data-label="Items">${o.items.map(i => i.name).join(", ")}</td>
      <td data-label="Quantity">${o.items.map(i => i.qty).join(", ")}</td>
      <td data-label="Total">₵${o.items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}</td>
      <td data-label="Status">
        <select class="status-select" data-id="${docSnap.id}">
          <option value="pending" ${o.status === "pending" ? "selected" : ""}>Pending</option>
          <option value="processing" ${o.status === "processing" ? "selected" : ""}>Processing</option>
          <option value="delivered" ${o.status === "delivered" ? "selected" : ""}>Delivered</option>
        </select>
      </td>
      <td data-label="Action">
        <button class="btn update-btn" data-id="${docSnap.id}">Update</button>
      </td>
    `;

    ordersTableBody.appendChild(tr);
  });

  // Attach update button events
  document.querySelectorAll(".update-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      const select = document.querySelector(`.status-select[data-id="${id}"]`);
      const newStatus = select.value;
      await updateDoc(doc(db, "orders", id), { status: newStatus });
      alert("Order status updated!");
      loadOrders();
    });
  });
}

// Initial load
loadOrders();
