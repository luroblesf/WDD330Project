document.addEventListener("DOMContentLoaded", async () => {
    const cartInit = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCounter(cartInit);

    if (document.getElementById("cart-items")) {
        renderCart(cartInit);
        return; 
    }

    const response = await fetch("/products.json");
    const products = await response.json();

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const product = products.find(p => p.id == productId);

    const container = document.querySelector(".product-detail");

    if (product) {
        container.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h2>${product.name}</h2>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button id="add-to-cart">Add to Cart</button>
        `;

        const btn = document.getElementById("add-to-cart");
        btn.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(p => p.id == product.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCounter(cart);
        });
    } else {
        container.innerHTML = "<p>Product not found</p>";
    }
});

function updateCartCounter(cart) {
    const counter = document.getElementById("cart-count");
    if (counter) {
        const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);
        counter.textContent = totalItems;
    }
}

function renderCart(cart) {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Empty Cart</p>";
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="50"/>
            <span>${item.name}</span>
            <span>Quantity: ${item.quantity}</span>
            <span>Price: $${item.price}</span>
        </div>
    `).join("");
}