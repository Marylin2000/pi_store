import React, { useState, useEffect } from "react";
import jbl from "../assets/images/newArrival/jbl.png";

function SpecialDeal() {
  // Set the initial countdown target (e.g., 1 day from now)
  const targetDate = new Date().getTime() + 24 * 60 * 60 * 1000;

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-20 px-[5%] relative best_selling bg-[#000000] flex items-center justify-between bg-grad_1 h-[30vh]">
      <div>
        <span className="text-[5.75px] lg:text-[16px] text-[#fff] font-semibold mb-5">
          Best Selling
        </span>
        <h1 className="text-[17.28px] lg:text-[48px] text-[#FAFAFA] font-semibold w-[160px] lg:w-[443px] leading-5 lg:leading-10">
          Enhance Your Music Experience
        </h1>
        <div className="time_wrapper flex items-center gap-4 mt-3 lg:mt-6">
          <div className="flex flex-col bg-white w-[27px] h-[27px] lg:w-[64px] lg:h-[64px] justify-center items-center rounded-full">
            <span className="text-[7.2px] lg:text-[16px] text-[#000000] font-semibold">
              {timeLeft.days || 0}
            </span>
            <span className="text-[7px] lg:text-[11px] text-[#000000]">Days</span>
          </div>
          <div className="flex flex-col bg-white w-[27px] h-[27px] lg:w-[64px] lg:h-[64px] justify-center items-center rounded-full">
            <span className="text-[7.2px] lg:text-[16px] text-[#000000] font-semibold">
              {timeLeft.hours || 0}
            </span>
            <span className="text-[7px] lg:text-[11px] text-[#000000]">Hours</span>
          </div>
          <div className="flex flex-col bg-white w-[27px] h-[27px] lg:w-[64px] lg:h-[64px] justify-center items-center rounded-full">
            <span className="text-[7.2px] lg:text-[16px] text-[#000000] font-semibold">
              {timeLeft.minutes || 0}
            </span>
            <span className="text-[7px] lg:text-[11px] text-[#000000]">Minutes</span>
          </div>
          <div className="flex flex-col bg-white w-[27px] h-[27px] lg:w-[64px] lg:h-[64px] justify-center items-center rounded-full">
            <span className="text-[7.2px] lg:text-[16px] text-[#000000] font-semibold">
              {timeLeft.seconds || 0}
            </span>
            <span className="text-[7px] lg:text-[11px] text-[#000000]">Seconds</span>
          </div>
        </div>
        <button className="mt-4 lg:mt-8 bg-[#4B3D88] py-1 px-5 lg:py-4 lg:px-12 text-[5.76px] lg:text-[16px] text-[#FAFAFA] font-medium">
          Buy Now!
        </button>
      </div>
      <div>
        <img
          className="w-[205px] lg:w-[568px] lg:h-[330px] h-[119px] z-20 relative"
          src={jbl}
          alt=""
        />
      </div>
    </div>
  );
}

export default SpecialDeal;
