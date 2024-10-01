import React from 'react';

const PaymentPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select Payment Method</h1>
      <div className="space-y-4">
        <div className="border p-4 rounded-lg">
          <h2 className="font-semibold">Scan QR code</h2>
          <p>scan wallet QR code to make Payment</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Select
          </button>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="font-semibold">Manual Payment </h2>
          <p>Manually send Payment to Store address</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Select
          </button>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="font-semibold">Wallet Connect</h2>
          <p>Link your wallet to make auto payments</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
