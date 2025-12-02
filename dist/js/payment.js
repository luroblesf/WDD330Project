document.addEventListener("DOMContentLoaded", () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const numItemsEl = document.getElementById("num-items");
    const subtotalEl = document.getElementById("cartTotal");
    const taxEl = document.getElementById("tax");
    const shippingEl = document.getElementById("shipping");
    const totalEl = document.getElementById("orderTotal");

    if (cart.length === 0) {
        numItemsEl.textContent = "0";
        subtotalEl.textContent = "$0.00";
        taxEl.textContent = "$0.00";
        shippingEl.textContent = "$0.00";
        totalEl.textContent = "$0.00";
        return;
    }

    const numItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.15;           
    const shipping = subtotal >= 50 ? 0 : 6.99;  
    const total = subtotal + tax + shipping;

    numItemsEl.textContent = numItems;
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    shippingEl.textContent = `$${shipping.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
});

