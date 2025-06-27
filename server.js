const express = require("express");
const cors = require("cors");
const ordersRoute = require("./server/routes/orders");
const dotenv = require("dotenv");
const pool = require("./server/db/index");  // DB connection
dotenv.config();
const fulfilmentRoutes = require("./server/routes/fulfilment");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", ordersRoute);
app.use("/api/fulfilment-items", fulfilmentRoutes);


app.get("/", (req, res) => {
  res.send("Shopify Order Dashboard Backend Running ✅");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`✅ Database time: ${result.rows[0].now}`);
  } catch (err) {
    console.error("❌ DB Error:", err.message);
    res.status(500).send("❌ DB error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
