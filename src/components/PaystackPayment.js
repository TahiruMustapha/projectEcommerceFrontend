import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { Navigate } from "react-router-dom";

const PaystackPayment = ({ totalAmount, cartItems }) => {
  const publicKey = `${process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}`;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  const clearUserCart = async () => {
    try {
      const response = await fetch(SummaryApi.clearUserCart.url, {
        method: SummaryApi.clearUserCart.method,
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to clear cart: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error clearing cart:", error.message);
      toast.error(error.message || "An error occurred while clearing the cart");
    }
  };
  const handleSendEmail = async () => {
    try {
      const response = await fetch(SummaryApi.sendReceiptEmail.url,{
        method:SummaryApi.sendReceiptEmail.method,
        credentials: "include",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          email,
          name,
          cartItems,
          totalAmount,
        })

      })
      const data = await response.json();
      if(!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to send email: ${errorMessage}`);
      }
      toast.success(data.message);
    }catch (error){
      console.error("Error sending receipt email:", error.message);
      toast.error(error.message || "An error occurred while sending the receipt email");
    }
  }
  // const handleSendSms = async () => {
  //   try {
  //     const response = await fetch(SummaryApi.sendSmsUrl.url,{
  //       method:SummaryApi.sendSmsUrl.method,
  //       credentials: "include",
  //       headers:{
  //         "Content-Type": "application/json"
  //       },
  //       body:JSON.stringify({phone, name, cartItems, totalAmount})
  //     })
  //
  //
  //     if(!response.ok) {
  //       const errorMessage = await response.text();
  //       throw new Error(`Failed to send email: ${errorMessage}`);
  //     }
  //     const data = await response.json();
  //     toast.success(data.message);
  //   }catch (error){
  //     console.error("Failed to send SMS:", error);
  //     alert("Failed to send SMS. Please try again.");
  //   }
  // }

  const onSuccess = async () => {
    await handleSendEmail();
    // await handleSendSms()
    await clearUserCart();
    window.location.href = "/cart/checkout/success";


    // await handleSendSms()
  };

  const componentProps = {
    reference: uuidv4(),
    email: email,
    amount: totalAmount * 100,
    publicKey,
    currency: "GHS",
    metadata: { cartItems, name, phone },
    text: "Pay with Paystack",
    onSuccess: onSuccess,
    onClose: () => alert("Wait! Don't leave :("),
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-center items-center gap-2">
        <img
        src="/paystack.png"
          alt="Paystack Logo"
          className="w-5"
        />
        <h2 className="text-xl font-bold text-center ">Pay with Paystack</h2>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold">Phone</label>
          <input
            type="tel"
            className="w-full p-2 border rounded outline-none"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm">I agree to the terms and conditions</label>
        </div>
      </form>

      <PaystackButton
        {...componentProps}
        className={`w-full mt-4 py-2 px-4 rounded text-white font-semibold ${
          agree ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!agree}
      />
    </div>
  );
};

export default PaystackPayment;
