import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // Calculate total price of the cart

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    // Logic to handle checkout
  };
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="h-[70vh] flex flex-col items-center justify-center  ">
          <h2>Your cart is Empty</h2>
        
             <Link className="px-2 py-1 bg-green-500 text-white rounded-lg my-10 " to="/">Continue Shopping</Link>
          
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div className="flex gap-2">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.thumbnail} alt="image" width={50} />
                  </Link>
                  <div>
                    <h1 className="font-semibold">{product.title}</h1>
                    <p>{product.price} Pi</p>
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
          <h2 className="font-semibold my-2 text-lg">Total: {totalPrice} Pi</h2>

          <div className="flex justify-between mt-2">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Clear Cart
            </button>
            <Link to={`/payment/:${totalPrice}`}>
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
