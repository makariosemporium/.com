// Load products into shop page
const shopContainer = document.getElementById("shopContainer");

PRODUCTS.forEach(product => {
  const card = `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" onclick="viewProduct(${product.id})">
      <h3>${product.name}</h3>
      <p class="price">₵${product.price}</p>
      <button class="buy-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;

  shopContainer.innerHTML += card;
});

function viewProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "product.html";
}

// CART LOGIC
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty += 1;
  } else {
    const product = PRODUCTS.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}
