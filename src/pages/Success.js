import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
      >
        <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been confirmed.</p>
        <button
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </button>
      </motion.div>
    </div>
  );
};

export default Success;
