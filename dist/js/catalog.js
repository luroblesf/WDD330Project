document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {
  const container = document.querySelector(".products");
  container.innerHTML = "";

  const response = await fetch("/products.json");
  const products = await response.json();

  const uniqueProductsMap = new Map();
  products.forEach(product => {
    if (!uniqueProductsMap.has(product.id)) {
      uniqueProductsMap.set(product.id, product);
    }
  });

  const uniqueProducts = Array.from(uniqueProductsMap.values());

  uniqueProducts.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("product");

    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <a href="product.html?id=${product.id}" class="btn">See Details</a>
    `;
    container.appendChild(item);
  });
}

