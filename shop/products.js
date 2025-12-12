// product.js
import { getAllProducts } from "./products.js";

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const productDetail = document.getElementById("productDetail");

async function loadProduct() {
  const products = await getAllProducts();
  const p = products.find(prod => prod.id === productId);

  if (!p) {
    productDetail.innerHTML = "<p>Product not found</p>";
    return;
  }

  productDetail.innerHTML = `
    <img src="${p.imageUrl}" alt="${p.name}" class="product-image">
    <div class="product-info">
      <h2>${p.name}</h2>
      <p class="price">₵${p.price}</p>
      <p>${p.description || ""}</p>
      <button id="addToCartBtn">Add to Cart</button>
    </div>
  `;

  document.getElementById("addToCartBtn").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === productId);

    if (existing) existing.qty++;
    else cart.push({ id: productId, name: p.name, price: p.price, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  });
}

loadProduct();
