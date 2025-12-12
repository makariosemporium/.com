// products.js
import { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "../firebase.js";

const productsTableBody = document.querySelector("#productsTable tbody");
const addProductForm = document.getElementById("addProductForm");

async function loadProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  productsTableBody.innerHTML = '';

  snapshot.forEach(docSnap => {
    const p = docSnap.data();
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td data-label="Name">${p.name}</td>
      <td data-label="Price">₵${p.price}</td>
      <td data-label="Image URL">${p.imageUrl}</td>
      <td data-label="Actions">
        <button class="btn edit-btn" data-id="${docSnap.id}">Edit</button>
        <button class="btn delete-btn" data-id="${docSnap.id}">Delete</button>
      </td>
    `;

    productsTableBody.appendChild(tr);
  });

  // Delete product
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      if (confirm("Delete this product?")) {
        await deleteDoc(doc(db, "products", id));
        loadProducts();
      }
    });
  });

  // Edit product
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      const p = await getDoc(doc(db, "products", id));
      const data = p.data();
      const name = prompt("Edit Name", data.name);
      const price = prompt("Edit Price", data.price);
      const imageUrl = prompt("Edit Image URL", data.imageUrl);
      if (name && price && imageUrl) {
        await updateDoc(doc(db, "products", id), { name, price: parseFloat(price), imageUrl });
        loadProducts();
      }
    });
  });
}

// Add new product
addProductForm.addEventListener("submit", async e => {
  e.preventDefault();
  const name = addProductForm.name.value;
  const price = parseFloat(addProductForm.price.value);
  const imageUrl = addProductForm.imageUrl.value;

  if (!name || !price || !imageUrl) return alert("All fields are required.");

  await addDoc(collection(db, "products"), { name, price, imageUrl });
  addProductForm.reset();
  loadProducts();
});

// Initial load
loadProducts();
