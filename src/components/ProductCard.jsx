import React from 'react';
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import AddToCart from './AddToCart';

const ProductCard = ({ product }) => {
  return (
    <div className="p-4 border rounded-lg flex flex-col items-center shadow hover:shadow-lg transition-shadow">
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
          className="w h-24 object-contain rounded-lg"
        />
      </Link>

      {/* Product Title (Smaller and not bold) */}
      <h2 className="mt-2 text-xs ">{product.title}</h2>

      {/* Product Price */}
      <p className="mt-1 text-gray-600 text-">{Math.round(product.price*0.2)} Pi</p>

      {/* Stock Left Information */}
      <div className="flex items-center mt-1">
        {product.itemsLeft && (
          <p className="text-xs text-gray-400">
            Only {product.itemsLeft} left in stock!
          </p>
        )}
      </div>
      <AddToCart product={product} />
    </div>
  );
};

export default ProductCard;
