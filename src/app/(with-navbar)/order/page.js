"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/core/useAuth";
import Config from "@/core/config";
import { formatCurrency } from "@/core/helpers";
import Link from "next/link";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const user = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(Config.baseApiUrl() + "orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message);
        }
        setOrders(result.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Silakan login untuk melihat pesanan Anda.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="bg-white p-6 shadow-md rounded-lg">
        {orders.length === 0 ? (
          <p className="text-gray-500">You don't have any orders yet 🤨</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.order_id}
                className="p-4 border rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    Order #{order.order_id} - {order.status}
                  </p>
                  <p className="text-gray-600">
                    Total: {formatCurrency(order.total_price)}
                  </p>
                </div>
                <Link
                  href={`/order/${order.order_id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
