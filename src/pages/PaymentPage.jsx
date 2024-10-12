import React, { useState } from "react";
import PaymentMethod from "../components/PaymentMethod";
import image1 from "../assets/images/1.png";
import image2 from "../assets/images/2.png";
import image3 from "../assets/images/3.png";

import {
  MdOutlineAccountBalanceWallet,
  MdOutlineQrCode,
  MdOutlineQrCode2,
} from "react-icons/md";
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [passphrase, setPassphrase] = useState("");
  const [modal, setmodal] = useState(false);
  const { user } = useUser();
  const { totalPrice } = useParams();
  console.log(totalPrice);
  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setmodal(true);
  };

  const handleInputChange = (e) => {
    setPassphrase(e.target.value);
  };

  return (
    <main>
      {user ? (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Select Payment Method</h1>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Scan QR code</h2>
                <p>Scan wallet QR code to pay</p>
                <button
                  onClick={() => handleSelectMethod("QR")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Select
                </button>
              </div>
              <img src={image3} width={70} />
            </div>
            <div className="border flex items-center justify-between  py-4 px-2 rounded-lg">
              <div>
                <h2 className="font-semibold">Manual Payment</h2>
                <p>Manually send payment to address</p>
                <button
                  onClick={() => handleSelectMethod("Manual")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Select
                </button>
              </div>
              <img src={image2} width={70} />
            </div>

            <div className="border py-4 px-2 rounded-lg flex items-center justify-between ">
              <div>
                <h2 className="font-semibold">Wallet Connect</h2>
                <p>Link wallet to make auto payments</p>
                <button
                  onClick={() => handleSelectMethod("Wallet")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Select
                </button>
              </div>
              <img src={image1} width={70} />
            </div>
          </div>

          <PaymentMethod
            selectedMethod={selectedMethod}
            modal={modal}
            setmodal={setmodal}
            totalPrice={totalPrice}
          />
        </div>
      ) : (
        <div className="w-screen h-screen items-center justify-center  ">
          <p>Please Login to place your order</p>
          <button onClick={() => {}}>Login</button>
        </div>
      )}
    </main>
  );
};

export default PaymentPage;
