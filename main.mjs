import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
});


const response = await fetch("/products.json");
;

const container = document.querySelector(".products");

products.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("product");

    item.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>Price: $${product.price}</p>
  `;

    container.appendChild(item);
});
