import React from "react";

function PromoCard() {
  return (
    <div>
      <div class="w-[47%] relative h-[100%] grad_1 flex flex-col justify-end">
        <img
          class="absolute top-5 left-0 right-0 m-auto z-10 w-[75px] h-[78px] lg:w-[109px] lg:h-[113px]"
          src="/assets/frankie-VghbBAYqUJ0-unsplash-removebg-preview.png"
          alt=""
        />
        <div class="relative z-20 px-4 py-3">
          <h4 class="text-[#FAFAFA] text-[22px] lg:text-[32px] font-bold leading-4">
            Mouse
          </h4>
          <p class="mt-4 opacity-70 text-[#FAFAFA] text-[12px] lg:text-[16px] w-[178px] font-bold leading-5">
            Logitech Mouse.
          </p>
          <button class="mt-2 lg:mt-8 bg-[#FCB349] rounded-sm py-2 px-5 lg:py-4 lg:px-12 text-[11px] lg:text-[16px] text-[#000000] font-medium">
            Buy Now!
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromoCard;
