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

  // Utility Functions
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handlers
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
    console.log("completing order")
    setShowPlacingOrderModal(false)

    Swal.fire({
      icon: "error",
      title: "An Error occured ",
      text: "Please Check and try again.",
      confirmButtonText: "OK",
    });
  };

  const declineLocation = () => {
    setShowLocationModal(false);
  };

  // Effects
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

  // Render Modals
  const renderModals = () => (
    <>
      {showPlacingOrderModal && (
        <Modal title="Placing Order..." message="Please wait while we process your order." />
      )}
      {showVerification && (
        <Modal title="Verifying Payment..." />
      )}
      {verificationFailed && (
        <Modal
          title="Payment Verification Failed"
          message="Price must be greater than 0 Pi."
          isError
          onClose={() => setVerificationFailed(false)}
        />
      )}
      {showCancelModal && (
        <ConfirmModal
          title="Cancel Payment"
          message="This will stop the payment. Do you want to continue?"
          onConfirm={confirmCancel}
          onCancel={() => setShowCancelModal(false)}
        />
      )}
      {showConfirmPaymentModal && (
        <ConfirmModal
          title="Confirm Payment"
          message="Proceed with payment verification?"
          onConfirm={confirmPayment}
          onCancel={() => setShowConfirmPaymentModal(false)}
        />
      )}
      {showLocationModal && (
        <ConfirmModal
          title="Confirm Delivery Location"
          message={`Are you ordering to this location? ${deliveryLocation}`}
          onConfirm={() => {
            setShowLocationModal(false);
            setShowPlacingOrderModal(true);
            setTimeout(() => {
              finalizeOrder();
          
            }, 5000); // 5-second delay
          }}
          onCancel={declineLocation}
        />
      )}
    </>
  );

  // Components for Modals
  const Modal = ({ title, message, isError, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-md">
        <h3 className={`text-lg font-semibold ${isError ? "text-red-600" : ""}`}>{title}</h3>
        {message && <p>{message}</p>}
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 mt-4 text-white bg-blue-700 rounded-md"
          >
            OK
          </button>
        )}
      </div>
    </div>
  );

  const ConfirmModal = ({ title, message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-md">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{message}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please login to place your order.</p>
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {/* Implement login */}}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <main className="relative h-screen">
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
