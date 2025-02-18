"use client";

import { useState, useEffect, useCallback } from "react";
import Config from "@/core/config";
import { useAuth } from "@/core/useAuth";
import { formatCurrency } from "@/core/helpers";
import { FaCheck } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const [selectedCart, setSelectedCart] = useState([]);

  // Fetch cart data
  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${Config.baseApiUrl()}cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setCartData(result.data);
    } catch (error) {
      toast.error("Failed to load cart!");
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Delete item from cart
  const deleteCart = async (cartId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${Config.baseApiUrl()}cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartId }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(result.message);
      setCartData((prev) => prev.filter((item) => item.cart_id !== cartId));
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Toggle item selection
  const toggleCart = (cartId, productId, variant, quantity, price) => {
    setSelectedCart((prev) =>
      prev.some((cart) => cart.cartId === cartId)
        ? prev.filter((cart) => cart.cartId !== cartId)
        : [...prev, { cartId, productId, variant, quantity, price }]
    );
  };

  const user = useAuth();
  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Your Cart</h1>

      <div className="bg-white rounded-lg shadow p-6">
        {cartData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty 🛒</p>
        ) : (
          cartData.map((item) => (
            <div key={item.cart_id} className="flex items-center gap-4 p-4 border-b last:border-none">
              {/* Checkbox */}
              <div
                onClick={() => toggleCart(item.cart_id, item.id, item.variant, item.quantity, item.price)}
                className={`w-6 h-6 flex items-center justify-center rounded border cursor-pointer transition ${
                  selectedCart.some((cart) => cart.cartId === item.cart_id)
                    ? "bg-blue-500 border-blue-500"
                    : "bg-white border-gray-400"
                }`}
              >
                {selectedCart.some((cart) => cart.cartId === item.cart_id) && <FaCheck className="text-white text-lg" />}
              </div>

              {/* Product Info */}
              <Link href={`/product/${item.slug}`} className="flex items-center gap-4 flex-1 p-4 border rounded-md hover:bg-gray-100 transition">
                <Image
                  src={Config.baseUrl() + item.img_urls[0]}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="bg-white p-2 border border-gray-300 rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  {item.variant && <p className="text-sm text-gray-600">Variant: {item.variant}</p>}
                  <p className="text-sm font-medium">{formatCurrency(item.price)}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm font-bold">Total: {formatCurrency(item.price * item.quantity)}</p>
                </div>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => deleteCart(item.cart_id)}
                className="w-8 h-8 flex items-center justify-center rounded bg-red-500 hover:bg-red-700 transition"
              >
                <BsTrash3 className="text-white text-lg" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Checkout Section */}
      <div className="bg-white p-6 fixed bottom-0 left-0 w-full shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div>
          <p className="text-lg font-medium text-gray-600">Total:</p>
          <p className="text-3xl font-bold">
            {formatCurrency(selectedCart.reduce((total, item) => total + item.price * item.quantity, 0))}
          </p>
        </div>
        <button className="bg-dark text-white py-3 px-6 text-lg font-medium rounded-lg hover:bg-black transition">
          Checkout
        </button>
      </div>
    </div>
  );
}
