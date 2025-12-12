import { getAllProducts } from "../shop/products.js";
import { auth, db, collection, addDoc, onAuthStateChanged } from "../firebase.js";

const cartTable = document.querySelector("#cartTable tbody");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render cart table
async function renderCart() {
  cartTable.innerHTML = "";
  let total = 0;

  const products = await getAllProducts();

  cart.forEach((item, i) => {
    const productData = products.find(p => p.id === item.id) || {};
    const price = productData.price || item.price || 0;
    const itemTotal = price * item.qty;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>₵${price}</td>
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

// Checkout & Paystack
checkoutBtn.addEventListener("click", async () => {
  if (cart.length === 0) return alert("Cart is empty!");

  const user = auth.currentUser;
  if (!user) return alert("Please log in to place an order.");

  // Calculate total
  const totalAmount = cart.reduce((a, b) => a + (b.price * b.qty || 0), 0);

  // Paystack Checkout
  const handler = PaystackPop.setup({
    key: "YOUR_PUBLIC_KEY", // Replace with your Paystack public key
    email: user.email,
    amount: totalAmount * 100, // amount in kobo
    currency: "GHS",
    onClose: function() {
      alert("Payment cancelled.");
    },
    callback: async function(response) {
      // Save order to Firestore
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        products: cart,
        total: totalAmount,
        status: "Pending",
        date: new Date(),
        paymentReference: response.reference
      });

      alert("Payment successful! Order placed.");
      cart = [];
      renderCart();
    }
  });

  handler.openIframe();
});
