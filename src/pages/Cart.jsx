import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    // Logic to handle checkout
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div className=" flex gap-2 ">
                  <img src={product.thumbnail} alt="image" width={50} />
                  <div>
                    <h1 className="font-semibold ">{product.title}</h1>
                    <p>{Math.round(product.price *0.2)} Pi</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Clear Cart
            </button>
            <Link to="/payment">
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
