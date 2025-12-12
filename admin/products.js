let products = [];

document.getElementById("productForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("productName").value;
  let price = document.getElementById("productPrice").value;
  let category = document.getElementById("productCategory").value;
  let image = document.getElementById("productImage").files[0];

  let imageURL = image ? URL.createObjectURL(image) : "";

  let product = {
    id: Date.now(),
    name,
    price,
    category,
    imageURL
  };

  products.push(product);
  updateTable();

  // Reset form
  this.reset();
});

function updateTable() {
  let table = document.getElementById("productsTable");
  table.innerHTML = "";

  products.forEach(product => {
    let row = `
      <tr>
        <td><img src="${product.imageURL}" class="product-img"></td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>GHS ${product.price}</td>
        <td><button class="action-btn" onclick="deleteProduct(${product.id})">Delete</button></td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  updateTable();
}
