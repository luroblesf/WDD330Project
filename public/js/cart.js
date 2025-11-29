const cartCount = document.getElementById("cart-count");
let count = 0;

const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(button => {
    button.addEventListener("click", () => {
        count++;
        cartCount.textContent = count; 
    });
});
