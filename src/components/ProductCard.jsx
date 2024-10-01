import React from 'react';
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
        {/* Discount Badge */}
        {/* {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg z-10">
            -{product.discount}%
          </span>
        )} */}

        {/* Product Image */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-24 object-cover rounded-lg"
        />
      </Link>

      {/* Product Title (Smaller and not bold) */}
      <h2 className="mt-2 text-xs ">{product.title}</h2>

      {/* Product Price */}
      <p className="mt-1 text-gray-600 text-">{Math.round(product.price)} Pi</p>

      {/* Stock Left Information */}
      <div className="flex items-center mt-1">
        {product.itemsLeft && (
          <p className="text-xs text-gray-400">
            Only {product.itemsLeft} left in stock!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;