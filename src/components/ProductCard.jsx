import React from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }) => {
  return (
    <div className="p-4 bg-[#e3ecf5] cursor-pointer h-fit relative rounded-lg shadow-sm flex flex-col items-center hover:shadow-lg transition-all duration-300 ease-in-out">
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-[86px] h-[86px] lg:h-[172px] lg:w-[152px] object-contain rounded-lg"
        />
      </Link>

      {/* Product Title */}
      <h2 className="mt-3 text-sm font-semibold text-center text-gray-800">
        {product.title.length > 20
          ? `${product.title.slice(0, 20)}...`
          : product.title}
      </h2>

      {/* Product Price */}
      <p className="mt-1 text-green-600 font-bold text-xs absolute top-2 right-2">
        {Math.round((product.price * 0.02 ))} &pi;
      </p>

      {/* Add to Cart Button */}
      <div className="mt-4">
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
