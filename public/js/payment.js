import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Configura tus credenciales de PayPal (usa variables de entorno)
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // Usa sandbox para pruebas

// Función para obtener el access token de PayPal
async function getAccessToken() {
    const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            "Authorization": "Basic " + Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    });
    const data = await res.json();
    return data.access_token;
}

// Ruta para crear orden
app.post("/api/paypal/orders", async (req, res) => {
    try {
        const { cart } = req.body; // el cliente manda el carrito completo

        // 🔒 Recalcular totales en el servidor
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = subtotal * 0.15;
        const shipping = subtotal >= 50 ? 0 : 6.99;
        const total = (subtotal + tax + shipping).toFixed(2);

        const accessToken = await getAccessToken();

        // Crear orden en PayPal
        const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: total
                        }
                    }
                ],
                application_context: {
                    brand_name: "Mi Tienda",
                    landing_page: "LOGIN",
                    user_action: "PAY_NOW",
                    return_url: "http://localhost:3000/success",
                    cancel_url: "http://localhost:3000/cancel"
                }
            })
        });

        const orderData = await orderRes.json();
        res.json(orderData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creando la orden de PayPal" });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000/confirmationPayment.html");
});
