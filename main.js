import products from "./products.json" assert { type: "json" };

const container = document.querySelector(".products");

products.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("product");

    item.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>Precio: $${product.price}</p>
  `;

    container.appendChild(item);
});
