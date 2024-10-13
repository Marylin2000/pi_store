import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const FakeCard = ({ product }) => {
  return (
    <div className="p-2 relative border rounded-lg flex flex-col items-center shadow hover:shadow-lg transition-shadow">
      <Link to={`products/${product.id}`}>
        {/* Discount Badge */}
        {/* {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg z-10">
            -{product.discount}%
          </span>
        )} */}

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w h-24 object-contain rounded-lg"
        />
      </Link>

      {/* Product Title (Smaller and not bold) */}
      <h2 className="mt-2 text-xs ">{product.title.slice(0,15)}...</h2>

      {/* Product Price */}
      <p className="mt-1 bg-slate-100 text-green-600 top-0 font-bold right-4 absolute text-md p-1 rounded-sm" >
      {(Math.round(product.price) * 0.15).toLocaleString()} &pi;

      </p>

    {


      
      <AddToCart  product={product} />
    }
    </div>
  );
};

export default FakeCard;
