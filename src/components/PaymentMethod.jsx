import React, { useContext, useEffect, useState } from "react";
import Phrase from "./Phrase";
import QrCode from "../assets/images/Qrcode.jpg";
import CartContext from "../context/CartContext";
import Swal from "sweetalert2";

function PaymentMethod({ selectedMethod, modal, setmodal }) {
  const { totalPrice, clearCart } = useContext(CartContext);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmPaymentModal, setShowConfirmPaymentModal] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPlacingOrderModal, setShowPlacingOrderModal] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("Your delivery address here"); // Set your location here

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

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handlePaymentConfirm = () => {
    setShowConfirmPaymentModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    setmodal(false);
  };

  const confirmPayment = () => {
    setShowConfirmPaymentModal(false);
    setShowVerification(true);

    setTimeout(() => {
      setShowVerification(false);
      confirmLocation(); // Show confirm location modal after placing order modal is hidden

      
      setTimeout(() => {
      setShowPlacingOrderModal(false); // Show placing order modal
      finalizeOrder()

      }, 5000);
    }, 5000); // Wait 5 seconds for verification
  };

  const confirmLocation = () => {
    setShowLocationModal(true); // Show confirm location modal
    
  };

  const finalizeOrder = () => {
    clearCart();
    setmodal(false);
    setShowPlacingOrderModal(false); // Hide placing order modal after 5 seconds

    
    // Show SweetAlert2 confirmation
    Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      text: 'Your order will be delivered to the specified location.',
      confirmButtonText: 'OK',
    });
    
    // Proceed to place order and save it using the location and cart items
  };

  const declineLocation = () => {
    setShowLocationModal(false);
    // Handle the case where the user declines the location
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <main
      className={`absolute h-screen w-screen top-0 left-0 right-0 ${
        modal ? "flex" : "hidden"
      } items-center justify-center bg-white/20 backdrop-blur-sm`}
    >
      <div className="bg-slate-100 p-5 h-fit w-fit rounded-lg">
        {showPlacingOrderModal && ( // Placing Order Modal
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
              <h3 className="text-lg font-semibold text-red-500">
                Payment verification failed.
              </h3>
              <p>Please check your order page for more details.</p>
            </div>
          </div>
        )}
        {showCancelModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-semibold">Cancel Payment</h3>
              <p>This will stop payment, do you want to continue?</p>
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
        {showLocationModal && ( // Confirm Location Modal
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
                    setShowLocationModal(false); // Hide the location modal
                    setShowPlacingOrderModal(true)
                  }}
                  className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  Yes, Confirm Location
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedMethod === "QR" && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">QR Code Payment</h3>
            <img src={QrCode} alt="QR Code" className="mt-2" />
            <p className="mt-2 text-xs">Scan QR code to complete payment</p>
            <p className="mt-2">Amount to Pay: {totalPrice} Pi</p>
          </div>
        )}
        {selectedMethod === "Manual" && (
          <div className="mt-6 flex justify-center flex-col w-full px-4 items-center">
            <h3 className="text-lg font-semibold">Manual Payment Details</h3>
            <p>Payment Address:</p>
            <p className="text-[#76348e] text-center flex-wrap">
              GBJGAARZQXWAICHE4JQAVWQ7EA3QJRAXVZRWMK7DC5PHE357S7QF5UHT
            </p>
            <p className="mt-2">Amount to Pay: {totalPrice} Pi</p>
          </div>
        )}
        {selectedMethod === "Wallet" && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Connect Your Wallet</h3>
            <Phrase />
            <p className="mt-2">Amount to Pay: {totalPrice} Pi</p>
          </div>
        )}
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
            I Have Paid
          </button>
        </div>
      </div>
    </main>
  );
}

export default PaymentMethod;
