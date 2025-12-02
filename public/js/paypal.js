paypal.Buttons({
    createOrder: function (data, actions) {
        return fetch("/api/orders", {
            method: "post"
        }).then(res => res.json())
            .then(order => order.id);
    },
    onApprove: function (data, actions) {
        return fetch(`/api/orders/${data.orderID}/capture`, {
            method: "post"
        }).then(res => res.json())
            .then(details => {
                alert("Pago completado por " + details.payer.name.given_name);
                window.location.href = "confirmacion-payment.html";
            });
    }
}).render("#paypal-button-container");
