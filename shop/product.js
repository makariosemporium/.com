const id = localStorage.getItem("selectedProduct");
const product = PRODUCTS.find(p => p.id == id);

document.getElementById("productImage").src = product.image;
document.getElementById("productName").textContent = product.name;
document.getElementById("productPrice").textContent = "₵" + product.price;
document.getElementById("productDesc").textContent = product.description;

document.getElementById("addToCartBtn").addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(p => p.id == id);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart!");
});
