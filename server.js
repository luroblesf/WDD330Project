import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/create-order", async (req, res) => {
    const { amount } = req.body;

    try {
        const response = await axios.post(
            "https://api-m.sandbox.paypal.com/v2/checkout/create-orders",
            {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: amount
                        }
                    }
                ]
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
        console.error("PayPal order error:", error);
        res.status(500).json({ error: "Order creation failed" });
    }
});

export default router;