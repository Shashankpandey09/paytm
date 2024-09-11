import React, { useState, useEffect } from "react";

const PaymentLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a payment process with a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulates a 2-second delay

    // Cleanup function to clear timeout if component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        {loading ? (
          <div className=" flex flex-col items-center">
            <div className="border-4 border-gray-300 border-t-blue-600 rounded-full w-20 h-20 animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Processing your payment...</p>
          </div>
        ) : (
          <div>
            <div className="text-6xl text-green-500 mb-4 mx-auto">&#10003;</div>
            <h3 className="text-2xl font-semibold text-gray-800">Payment Successful!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentLoader;
