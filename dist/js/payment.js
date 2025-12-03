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
    } else {
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
    }

    const checkoutBtn = document.getElementById("checkoutSubmit");

    checkoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const total = totalEl.textContent.replace("$", "");

        try {
            const res = await fetch("http://localhost:3000/api/paypal/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: total })
            });

            const order = await res.json();
            console.log("Order created:", order);

            const approveLink = order.links.find(l => l.rel === "approve").href;
            window.location.href = approveLink;
        } catch (err) {
            console.error("Payment process error:", err);
            alert("Payment process error: please try again.");
        }
    });
});
