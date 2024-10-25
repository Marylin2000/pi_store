import React from "react";
import ps5 from "../assets/images/newArrival/ps5.png";
import { Link } from "react-router-dom";

function NewArrival({image , description, link, title}) {
  return (
    <div className="bg-grad_1 my-10 h-[414px] lg:h-[600px] lg:w-[570px] rounded-md relative flex justify-end flex-col ">
      <Link to={link}>
      <img
        className="absolute bottom-0 z-10 lg:w-511px lg:h-[511px]"
        src={image}
        alt=""
        />
      <div className="relative z-20 px-8 py-8">
        <h4 className="text-[#FAFAFA] text-[23px] lg:text-[32px] font-bold leading-4">
          {
            title
          }
        </h4>
        <p className=" mt-4 opacity-70 text-[#FAFAFA] text-[12px] lg:text-[16px] w-[178px] lg:w-[242px] font-bold leading-5">
          {
            description
          }
        </p>
        <button className="mt-2 lg:mt-8 bg-[#FCB349] rounded-sm py-3 px-9 lg:py-4 lg:px-12 text-[11px] lg:text-[16px] text-[#000000] font-medium">
          Buy Now!
        </button>
      </div>
        </Link>
    </div>
  );
}

export default NewArrival;
