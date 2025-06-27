# Shopify_Task
A full-stack Shopify public app that syncs and displays the last 60 days’ orders using the Shopify GraphQL Admin API. Built with Node.js, Express, PostgreSQL, React, and Tailwind CSS, the app features a beautiful dashboard to view order details, fulfillment items, and return images — making order tracking simple, visual, and efficient.
# 🛍️ Shopify Order Dashboard App

A full-stack Shopify public app that allows merchants to view their recent orders, fulfillment items, and associated return images — built using **Node.js**, **React**, **PostgreSQL**, and the **Shopify GraphQL Admin API**.

---

## 🚀 Features

- 🔐 OAuth-ready Shopify public app structure
- 📦 Sync orders from Shopify Admin API (last 60 days)
- 🗃️ Store data in PostgreSQL (orders + fulfillment items + images)
- 🖼️ View orders and return items with status and images
- 💅 Beautiful responsive frontend using React + Tailwind CSS
- ⚙️ Modular codebase (easy to scale and customize)

---

## 🧱 Tech Stack

| Layer        | Tech                                 |
|--------------|--------------------------------------|
| Frontend     | React, Tailwind CSS                  |
| Backend      | Node.js, Express.js                  |
| API          | Shopify GraphQL Admin API            |
| Database     | PostgreSQL                           |
| Deployment   | Localhost / Render / Railway-ready   |

---

## 📸 Screenshots

> Will show order cards with return items and image thumbnails here.

---

## 🔧 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/shopify-order-dashboard.git
cd shopify-order-dashboard
2. Backend Setup
bash
Copy
Edit
cd server
npm install
# Set up PostgreSQL and update db/index.js
node server.js
3. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
4. Tailwind Setup (if needed)
If Tailwind doesn't load:

bash
Copy
Edit
npx tailwindcss init -p
Make sure tailwind.config.js and index.css are properly configured.

🔐 Shopify API Setup
Go to Shopify Partners Dashboard

Create a public app → Add development store

Add required scopes:

read_orders

read_products (optional for future use)

Generate Admin API token

Add token and store URL to the backend code

🔄 API Routes
Route	Description
/sync-orders	Sync orders from Shopify (GraphQL)
/api/orders	Fetch all orders from DB
/api/fulfilment-items	Fetch return items & images

📹 Demo
https://screenrec.com/share/itCIENpq6T

🤝 Author
Faizan Ahmed
LinkedIn • GitHub

🪪 License
MIT — Feel free to fork and enhance!
