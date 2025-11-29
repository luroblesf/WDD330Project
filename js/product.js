
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("../products.json");
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
    `;
    } else {
        container.innerHTML = "<p>Product not found</p>";
    }
});
