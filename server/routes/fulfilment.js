const express = require("express");
const router = express.Router();
const pool = require("../db/index");

// GET /api/fulfilment-items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fulfilment_items");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching fulfilment items:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
