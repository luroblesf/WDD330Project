(async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("token"); 

    if (orderId) {
        try {
            const response = await fetch(`http://localhost:5000/api/paypal/capture-order/${orderId}`);
            if (!response.ok) throw new Error("Failed to capture order");

            const data = await response.json();

            document.getElementById("paymentDetails").innerText =
                `Transaction ID: ${data.id}, Status: ${data.status}`;
        } catch (err) {
            console.error("Capture order error:", err);
            document.getElementById("paymentDetails").innerText =
                "Error capturing the order.";
        }
    } else {
        document.getElementById("paymentDetails").innerText =
            "Order ID not found.";
    }
})();
