// cart.js
import { getAllProducts } from "../shop/products.js";
import { auth, db, collection, addDoc, onAuthStateChanged } from "../firebase.js";

const cartTable = document.querySelector("#cartTable tbody");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function renderCart() {
  cartTable.innerHTML = "";
  let total = 0;

  // Fetch all product data once
  const products = await getAllProducts();

  cart.forEach((item, i) => {
    const productData = products.find(p => p.id === item.id) || {};
    const itemTotal = (productData.price || item.price) * item.qty;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>₵${productData.price || item.price}</td>
      <td>${item.qty}</td>
      <td>₵${itemTotal}</td>
      <td><button class="removeBtn" data-index="${i}">X</button></td>
    `;
    cartTable.appendChild(row);
  });

  cartTotalEl.textContent = `Total: ₵${total}`;
  localStorage.setItem("cart", JSON.stringify(cart));

  document.querySelectorAll(".removeBtn").forEach(btn =>
    btn.addEventListener("click", e => {
      cart.splice(e.target.dataset.index, 1);
      renderCart();
    })
  );
}

renderCart();

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return alert("Cart is empty!");

  onAuthStateChanged(auth, user => {
    if (!user) return alert("Please log in to place an order.");

    const ordersRef = collection(db, "orders");
    addDoc(ordersRef, {
      userId: user.uid,
      products: cart,
      total: cart.reduce((a, b) => a + (b.price * b.qty), 0),
      status: "Pending",
      date: new Date()
    }).then(() => {
      alert("Order placed successfully!");
      cart = [];
      renderCart();
    });
  });
});
