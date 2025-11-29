
document.addEventListener("DOMContentLoaded", async () => {
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
      <p>Price: $${product.price}</p>
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

            });
    } else {
        container.innerHTML = "<p>Product not found</p>";
    }
});

