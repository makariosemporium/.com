console.log("Makarios Emporium loaded.");


// ==========================
// CART COUNT UPDATE
// ==========================
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((acc, item) => acc + item.quantity, 0);

    const btn = document.querySelector('.cart-btn');
    if (btn) btn.textContent = `Cart (${count})`;
}

// Run on load
updateCartCount();


// ==========================
// ADD TO CART FUNCTIONALITY
// ==========================
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseFloat(btn.dataset.price),
            img: btn.dataset.img,
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if already in cart
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();

        alert(`${product.name} added to cart!`);
    });
});
