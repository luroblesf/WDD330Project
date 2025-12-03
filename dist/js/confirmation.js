(async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("token");

    if (orderId) {
        const response = await fetch(`http://localhost:3000/api/capture-order/${orderId}`);
        const data = await response.json();

        document.getElementById("paymentDetails").innerText =
            `Transaction ID: ${data.id}, Status: ${data.status}`;
    } else {
        document.getElementById("paymentDetails").innerText =
            "Order ID not found.";
    }
})();
