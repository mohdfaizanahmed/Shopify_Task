import React, { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
  FULFILLED: "bg-green-200 text-green-800",
  UNFULFILLED: "bg-yellow-200 text-yellow-800",
  CANCELLED: "bg-red-200 text-red-800",
  PARTIALLY_FULFILLED: "bg-blue-200 text-blue-800",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState({}); // Stores fulfilment items keyed by orderid

  useEffect(() => {
    // Fetch orders
    axios
      .get("http://localhost:3000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));

    // Fetch fulfillment items
    axios
      .get("http://localhost:3000/api/fulfilment-items")
      .then((res) => {
        const grouped = {};
        res.data.forEach((item) => {
          if (!grouped[item.orderid]) grouped[item.orderid] = [];
          grouped[item.orderid].push(item);
        });
        setItems(grouped);
      })
      .catch((err) => console.error("Error fetching fulfilment items:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-lime-300 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        🛍️ Your Shopify Orders
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {orders.map((order) => {
          const statusClass =
            statusColors[order.status?.toUpperCase()] ||
            "bg-black text-white";

          return (
            <div
              key={order.orderid}
              className="bg-white shadow-2xl rounded-2xl p-6 border border-gray-200 transition-transform transform hover:scale-105"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  #{order.orderid}
                </h2>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${statusClass}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-gray-700 mb-2">
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(order.createdat).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p>
                  <strong>Shop:</strong> {order.shop}
                </p>
              </div>

              {/* Fulfilment Items with images */}
              {items[order.orderid] && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    Fulfilment Items:
                  </p>
                  {items[order.orderid].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-2 mb-2 rounded-lg shadow-sm border border-gray-100"
                    >
                      <p className="text-xs mb-1">
                        <strong>Qty:</strong> {item.qty} | <strong>Reason:</strong>{" "}
                        {item.reason}
                      </p>
                      {item.imageurl && (
                        <img
                          src={item.imageurl}
                          alt="Return item"
                          className="w-full max-h-40 object-contain rounded"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {orders.length === 0 && (
        <p className="text-center mt-10 text-gray-700 text-lg">
          No orders found 🛒
        </p>
      )}
    </div>
  );
};

export default Orders;
