import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import PaystackPayment from "../components/PaystackPayment";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Cart Data
  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();

      if (responseData.success && Array.isArray(responseData.data)) {
        setCart(responseData.data); // ✅ Ensure cart is set properly
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch cart items when page loads
  }, []);

  // ✅ Calculate Total Price
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.productId.sellingPrice * item.quantity,
    0
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto">
      {/* Left Side: Cart Items */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : cart.length === 0 ? (
          <p className="text-red-500 font-semibold">Your cart is empty.</p>
        ) : (
          <ul className="divide-y">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-4"
              >
                <img
                  src={item.productId.productImage[0]}
                  alt={item.productId.productName}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <span className="text-lg font-medium">
                  {item.productId.productName}
                </span>
                <span className="text-gray-600">Qty: {item.quantity}</span>
                <span className="font-semibold text-green-600">
                  GHS{item.productId.sellingPrice * item.quantity}
                </span>
              </li>
            ))}
          </ul>
        )}
        <h3 className="text-xl font-bold mt-6">Total: GHS{totalAmount}</h3>
      </div>

      {/* Right Side: Payment Section */}

      <PaystackPayment totalAmount={totalAmount} cartItems={cart} />
    </div>
  );
};

export default Checkout;
