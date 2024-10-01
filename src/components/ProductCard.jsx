import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart"; // Import AddToCart component

const ProductCard = ({ product }) => {
  return (
    <main className="p-4">
      <div className="relative overflow-hidden border rounded-lg p-2 shadow transition-transform transform hover:scale-105">
        {/* Product Link */}
        <Link to={`/product/${product.id}`}>
          {/* Discount Badge */}
          {product.discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg z-10">
              -{product.discount}%
            </span>
          )}

          {/* Product Image */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover rounded-lg block"
          />
        </Link>
      </div>

      {/* Product Title */}
      <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>

      {/* Product Price */}
      <p className="mt-1 text-gray-600 text-xl">{product.price} Pi</p>

      {/* Stock Left Information */}
      <div className="flex items-center mt-1">
        <MdShoppingCart className="text-gray-500 mr-1" />
        {product.itemsLeft && (
          <p className="text-xs text-gray-400">
            Only {product.itemsLeft} left in stock!
          </p>
        )}
      </div>

      {/* Add to Cart Button */}
      <AddToCart product={product} />
    </main>
  );
};

export default ProductCard;
