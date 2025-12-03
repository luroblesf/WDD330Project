import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));


app.post("/api/paypal/create-order", async (req, res) => {
    const { amount } = req.body;

    try {
        const response = await axios.post(
            "https://api-m.sandbox.paypal.com/v2/checkout/orders",
            {
                intent: "CAPTURE",
                purchase_units: [{ amount: { currency_code: "USD", value: amount } }]
            },
            {
                auth: {
                    username: process.env.PAYPAL_CLIENT_ID,
                    password: process.env.PAYPAL_SECRET
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("PayPal order error:", error.response?.data || error.message);
        res.status(500).json({ error: "Order creation failed" });
    }
});

app.get("/api/paypal/capture-order/:orderId", async (req, res) => {
    const { orderId } = req.params;

    try {
        const response = await axios.post(
            `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
            {},
            {
                auth: {
                    username: process.env.PAYPAL_CLIENT_ID,
                    password: process.env.PAYPAL_SECRET
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("PayPal capture error:", error.response?.data || error.message);
        res.status(500).json({ error: "Order capture failed" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
