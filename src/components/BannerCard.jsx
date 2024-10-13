import React from "react";



function BannerCard({image, product,color}) {
  return (
    <div class="flex flex-row items-start h-[196px]  lg:h-[284px] rounded-sm">
      <div class={`bg-grad_${color} h-[100%] w-[50%] px-4 py-3 flex flex-col justify-end`}>
        <div class="">
          <h4 class="text-[#FAFAFA] text-[12px] lg:text-[32px] font-bold leading-4">
           {product}
          </h4>
          <p class="mt-4 opacity-70 text-[#FAFAFA] text-[12px] lg:text-[16px] w-[178px] font-bold leading-5">
            This is a placeholder for product description.
          </p>
          <button class="mt-2 lg:mt-8 bg-[#FCB349] rounded-sm py-2 px-5 lg:py-4 lg:px-12 text-[11px] lg:text-[16px] text-[#000000] font-medium">
            Shop Now!
          </button>
        </div>
      </div>
      <div class="bg-grad_7 h-[100%] w-[50%] flex justify-center">
        <img
          src={image}
          alt=""
          class="lg:w-223px lg:h-279px"
        />
      </div>
    </div>
  );
}

export default BannerCard;
