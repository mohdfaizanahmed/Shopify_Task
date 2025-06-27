const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require("../db/index");

// 🔐 Replace with your store and token
const SHOP = "faizanahmed-store.myshopify.com";
const ACCESS_TOKEN = "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";
const API_VERSION = "2024-04";

// 📦 Sync orders from Shopify to PostgreSQL
router.get("/sync-orders", async (req, res) => {
  try {
    const response = await axios.post(
      `https://${SHOP}/admin/api/${API_VERSION}/graphql.json`,
      {
        query: `
          {
            orders(first: 20, reverse: true, sortKey: CREATED_AT) {
              edges {
                node {
                  id
                  name
                  createdAt
                  displayFulfillmentStatus
                }
              }
            }
          }
        `
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": ACCESS_TOKEN,
        },
      }
    );

    console.log("Shopify Response:", JSON.stringify(response.data, null, 2));

    const orders = response.data?.data?.orders?.edges || [];

    if (orders.length === 0) {
      return res.json({ message: "No orders found in the last 60 days." });
    }

    for (let order of orders) {
      const { id, createdAt, name, displayFulfillmentStatus } = order.node;
 
      // 🛠️ Extract numeric order ID
      const numericOrderId = id.split("/").pop(); // "4488521875585"

      // 💾 Save to PostgreSQL
      await pool.query(
        `INSERT INTO orders (shop, orderId, status, createdAt)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (orderId) DO NOTHING`,
        [SHOP, numericOrderId, displayFulfillmentStatus, createdAt]
      );
    }

    res.json({ message: `${orders.length} orders synced successfully ✅` });

  } catch (err) {
    console.error("❌ Sync error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🚀 Fetch all orders from DB
router.get("/orders", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY createdAt DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});


router.post("/add-return-item", async (req, res) => {
  const { lineItemId, qty, reason, imageURL } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO fulfilment_items (lineItemId, qty, reason, imageURL)
       VALUES ($1, $2, $3, $4) RETURNING returnId`,
      [lineItemId, qty, reason, imageURL]
    );

    const returnId = result.rows[0].returnid;

    await pool.query(
      `INSERT INTO images (imageURL, returnItemId) VALUES ($1, $2)`,
      [imageURL, returnId]
    );

    res.json({ message: "Return item with image added ✅" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to add return item" });
  }
});


module.exports = router;
