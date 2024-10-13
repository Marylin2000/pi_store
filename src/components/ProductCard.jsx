import React from 'react';
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import AddToCart from './AddToCart';

const ProductCard = ({ product }) => {
  return (
    <div className="p-1 border relative rounded-lg flex flex-col items-center shadow hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-[20vw] h-24 object-contain rounded-lg"
        />
      </Link>

      {/* Product Title (Smaller and not bold) */}
      <h2 className="mt-2 text-xs ">{product.title.slice(0,15)}...</h2>

      {/* Product Price */}
      <p className="mt-1 text-green-600 top-0 font-bold right-4 absolute text-xs">
      {(Math.round(product.price) * 0.15).toLocaleString()} &pi;

      </p>

      {/* Stock Left Information */}
      <AddToCart product={product} />
    </div>
  );
};

export default ProductCard;
