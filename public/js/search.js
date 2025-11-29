document.getElementById("search-form").addEventListener("submit", e => {
  e.preventDefault();
  const query = document.getElementById("search-input").value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const name = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = name.includes(query) ? "block" : "none";
  });
});

