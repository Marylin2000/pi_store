import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";
import CartContext from "../context/CartContext";
import Phrase from "../components/Phrase";
import PaymentMethod from "../components/PaymentMethod";

const PaymentPage = () => {
  const { user } = useUser();
  const { clearCart } = useContext(CartContext);
  const { totalPrice } = useParams();
  
  const [modal, setModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmPaymentModal, setShowConfirmPaymentModal] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPlacingOrderModal, setShowPlacingOrderModal] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState(user?.address || "Your delivery address here");

  useEffect(() => {
    if (modal) {
      setTimeLeft(300); // Reset timer when modal opens
    }
  }, [modal]);

  useEffect(() => {
    if (modal && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [modal, timeLeft]);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setModal(true);
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    setModal(false);
  };

  const handlePaymentConfirm = () => {
    setShowConfirmPaymentModal(true);
  };

  const confirmPayment = () => {
    setShowConfirmPaymentModal(false);
    setShowVerification(true);

    // Validate the totalPrice
    if (parseFloat(totalPrice) <= 0) {
      setVerificationFailed(true);
      setShowVerification(false);
      return;
    }

    setTimeout(() => {
      setShowVerification(false);
      confirmLocation();
    }, 5000);
  };

  const confirmLocation = () => {
    setShowLocationModal(true);
  };

  const finalizeOrder = () => {
    clearCart();

    setModal(false);

    Swal.fire({
      icon: "success",
      title: "Order Placed Successfully",
      text: "Your order has been placed.",
      confirmButtonText: "OK",
    });
  };

  const declineLocation = () => {
    setShowLocationModal(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const renderModals = () => (
    <>
      {showPlacingOrderModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold">Placing Order...</h3>
            <p>Please wait while we process your order.</p>
          </div>
        </div>
      )}
      {showVerification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold">Verifying Payment...</h3>
          </div>
        </div>
      )}
      {verificationFailed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg text-red-600 font-semibold">Payment Verification Failed</h3>
            <p>Price must be greater than 0 Pi.</p>
            <button
              onClick={() => setVerificationFailed(false)}
              className="px-4 py-2 mt-4 text-white bg-blue-700 rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold">Cancel Payment</h3>
            <p>This will stop the payment. Do you want to continue?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold">Confirm Payment</h3>
            <p>Proceed with payment verification?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowConfirmPaymentModal(false)}
                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
              >
                No
              </button>
              <button
                onClick={confirmPayment}
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {showLocationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-semibold">Confirm Delivery Location</h3>
            <p>Are you ordering to this location?</p>
            <p className="text-blue-500 mt-2">{deliveryLocation}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={declineLocation}
                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
              >
                No, Change Location
              </button>
              <button
                onClick={() => {
                  setShowLocationModal(false);
                  setShowPlacingOrderModal(true);
                }}
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Yes, Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please login to place your order.</p>
        <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => {/* Implement login */}}>
          Login
        </button>
      </div>
    );
  }

  return (
    <main className="relative h-screen  ">
      
        <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm">
          <div className="bg-slate-100 p-5 rounded-lg">
            {renderModals()}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Connect Your Wallet</h3>
              <Phrase />
              <p className="mt-2">Amount to Pay: {totalPrice} Pi</p>
            </div>
            <div className="mt-4">
              <p>Time left: {formatTime(timeLeft)}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentConfirm}
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      
      <section className="p-6">
        <h1 className="text-2xl font-bold mb-4">Choose a Payment Method</h1>
        <PaymentMethod onSelectMethod={handleSelectMethod} />
      </section>
    </main>
  );
};

export default PaymentPage;
