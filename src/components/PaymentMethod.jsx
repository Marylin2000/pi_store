import React, { useContext } from "react";
import Phrase from "./Phrase";
import QrCode from "../assets/images/Qrcode.jpg";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";

function PaymentMethod({ selectedMethod, modal, setmodal }) {
  const { totalPrice } = useContext(CartContext); // Get total price from URL params
  return (
    <main
      className={`absolute h-screen w-screen top-0 left-0 right-0 ${
        modal ? "flex" : "hidden"
      } items-center justify-center bg-white/20 backdrop-blur-sm`}
    >
      <div className="bg-slate-100 p-5 h-fit w-fit rounded-lg">
        {" "}
        {/* Display the selected payment method details */}
        {selectedMethod === "QR" && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">QR Code Payment</h3>
            <img
              src={QrCode} // Replace with your QR code image path
              alt="QR Code"
              className="mt-2"
            />
            <p className="mt-2 text-xs">scan Qr code to complete payment</p>
            <p className="mt-2">Amount to Pay: {totalPrice} Pi</p> {/* Display amount */}
          </div>
        )}
        {selectedMethod === "Manual" && (
          <div className="mt-6 flex justify-center flex-col w-full px-4 items-center">
            <h3 className="text-lg font-semibold">Manual Payment Details</h3>
            <p>Payment Address: </p>
            <p className="text-[#76348e] text-center flex-wrap">
              GBJGAARZQXWAICHE4JQAVWQ7EA3QJRAXVZRW
              MK7DC5PHE357S7QF5UHT
            </p>
            <p className="mt-2">Amount to Pay: {totalPrice} Pi</p> {/* Display amount */}
          </div>
        )}
        {selectedMethod === "Wallet" && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Connect Your Wallet</h3>
            <Phrase />
            <p className="mt-2">Amount to Pay: {totalPrice} Pi</p> {/* Display amount */}
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={() => setmodal(!modal)}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </main>
  );
}

export default PaymentMethod;
