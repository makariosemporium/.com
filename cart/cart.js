let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartContainer");

if (cart.length === 0) {
  cartContainer.innerHTML = "<h3>Your cart is empty.</h3>";
} else {
  let html = "";

  cart.forEach((item, index) => {
    html += `
      <div style="
        display:flex;
        justify-content:space-between;
        background:white;
        padding:20px;
        margin-bottom:15px;
        border-radius:8px;
        box-shadow:0 2px 10px rgba(0,0,0,0.1)
      ">
        <div>
          <h3>${item.name}</h3>
          <p>₵${item.price}</p>
          <p>Quantity: ${item.qty}</p>
        </div>

        <button onclick="removeItem(${index})" style="
          background:#111;
          color:white;
          border:none;
          padding:10px 15px;
          border-radius:5px;
        ">Remove</button>
      </div>
    `;
  });

  cartContainer.innerHTML = html;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
