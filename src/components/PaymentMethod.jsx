import React, { useState } from 'react'
import Phrase from './Phrase'
import QrCode from "../assets/images/Qrcode.jpg"

function PaymentMethod({selectedMethod, modal,setmodal}) {

  return (
    <main  className={`absolute h-screen w-screen top-0 left-0 right-0 ${modal?"flex":"hidden"} items-center justify-center bg-white/20 backdrop-blur-sm`}>

    <div className='bg-slate-100 p-5 h-fit w-fit rounded-lg'> { /* Display the selected payment method details */}
    {selectedMethod === "QR" && (
        <div className="mt-6">
        <h3 className="text-lg font-semibold">QR Code Payment</h3>
        <img
          src={QrCode} // Replace with your QR code image path
          alt="QR Code"
          className="mt-2"
          />
        <p className="mt-2">Payment Address: your-wallet-address-here</p>
      </div>
    )}

    {selectedMethod === "Manual" && (
        <div className="mt-6">
        <h3 className="text-lg font-semibold">Manual Payment Details</h3>
        <p>Payment Address: your-store-address-here</p>
      </div>
    )}

    {selectedMethod === "Wallet" && (
        <div className="mt-6">
        <h3 className="text-lg font-semibold">Connect Your Wallet</h3>
      <Phrase />
      </div>
    )}
    <div className="flex justify-end">
      <button onClick={()=>setmodal(!modal)} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        Close
      </button>
    </div></div>
    
    </main>
  )
}

export default PaymentMethod