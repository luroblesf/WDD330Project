document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    renderCart(cart);
    updateCartCounter(cart);
    updateCartTotal(cart);
});

function updateCartCounter(cart) {
    const counter = document.getElementById("cart-count");
    if (counter) {
        const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);
        counter.textContent = totalItems;
    }
}

function updateCartTotal(cart) {
    const totalElement = document.getElementById("cart-total");
    if (totalElement) {
        const totalPrice = cart.reduce((sum, p) => sum + (p.price * p.quantity), 0);
        totalElement.textContent = totalPrice.toFixed(2); // dos decimales
    }
}

function renderCart(cart) {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" width="50"/>
      <span>${item.name}</span>
      <span>Cantidad: ${item.quantity}</span>
      <span>Precio: $${item.price}</span>
      <button onclick="removeFromCart(${index})">Eliminar</button>
    </div>
  `).join("");
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(cart);
    updateCartCounter(cart);
    updateCartTotal(cart);
}
