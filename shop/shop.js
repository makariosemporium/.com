// shop.js
import { db, collection, getDocs } from "../firebase.js";

const productsGrid = document.getElementById("productsGrid");
const productsRef = collection(db, "products");

getDocs(productsRef).then(snapshot => {
  snapshot.forEach(doc => {
    const p = doc.data();
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${p.imageUrl}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">₵${p.price}</p>
      <a href="product.html?id=${doc.id}" class="buy-btn">View / Add to Cart</a>
    `;
    productsGrid.appendChild(div);
  });
});
