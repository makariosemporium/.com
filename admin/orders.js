// TEMPORARY LOCAL STORAGE ORDERS
let orders = JSON.parse(localStorage.getItem("orders")) || [
  {
    id: 1,
    customer: "Emmanuel Kwame",
    email: "emmanuel@example.com",
    items: "Classic Men's Jacket x1, Hoodie x2",
    total: 959,
    status: "Pending"
  },
  {
    id: 2,
    customer: "Abena Mensah",
    email: "abena@example.com",
    items: "Elegant Women's Dress x1",
    total: 520,
    status: "Shipped"
  }
];

function renderOrders() {
  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  orders.forEach(order => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.email}</td>
      <td>${order.items}</td>
      <td>${order.total}</td>
      <td>
        <button class="status-btn status-${order.status.toLowerCase()}" onclick="changeStatus(${order.id})">
          ${order.status}
        </button>
      </td>
      <td>
        <button class="action-btn" onclick="deleteOrder(${order.id})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });

  localStorage.setItem("orders", JSON.stringify(orders));
}

// CHANGE STATUS FUNCTION
function changeStatus(id) {
  const order = orders.find(o => o.id === id);

  if(order.status === "Pending") order.status = "Shipped";
  else if(order.status === "Shipped") order.status = "Delivered";
  else if(order.status === "Delivered") order.status = "Pending";

  renderOrders();
}

// DELETE ORDER FUNCTION
function deleteOrder(id) {
  orders = orders.filter(o => o.id !== id);
  renderOrders();
}

// INITIAL RENDER
renderOrders();
