import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const FakeCard = ({ product }) => {
  const price = Math.round(product.price * 0.15);

    return (
      <div className="py-2 bg-[#e3ecf5] cursor-pointer h-fit lg:h-[250px]  relative rounded-md flex flex-col items-center  hover:shadow-lg ">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-[86px] h-[76px] lg:h-[172px] lg:w-[152px] object-contain rounded-lg"
          />
        </Link>
  
        {/* Product Title (Smaller and not bold) */}
        <h2 className="mt-2 text-xs ">{product.title.slice(0, 15)}...</h2>
  
        {/* Product Price */}
        <p className="mt-1 text-green-600 top-0 font-bold right-4 absolute text-xs">

          {price} Pi

        </p>
  
        {/* Stock Left Information */}
        <AddToCart product={product} price={price} />
       
      </div>
  );
};

export default FakeCard;
