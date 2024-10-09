import { useContext } from "react";
import CartContext from "../context/CartContext"; // Correct import
import { FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";

function AddToCart({ product }) {
  const { cart, addToCart } = useContext(CartContext);
  const { user } = useUser();
  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.", {
        style: {
          background: "#ffa505",
          color: "black",
        },
      });
      return;
    }

    const productExists = cart.some((item) => item.id === product.id);
    if (productExists) {
      toast.error(`"${product.title}" is already in the cart`, {
        style: {
          background: "#ffa505",
          color: "black",
        },
      });
      return;
    }

    // Add product to cart
    addToCart(product);

    // Success toast notification
    toast.success(`Added "${product.title}" to cart`, {
      style: {
        background: "green",
        color: "#fff",
      },
    });
    console.log(`Added "${product.title}" to cart`);
  };

  return (
    <button
      onClick={() => handleAddToCart(product)} // Wrap in arrow function
      className="mt-3 bg-indigo-500 text-white text-xs py-2 px-4 rounded-md hover:bg-indigo-600 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Add to Cart
    </button>
  );
}

export default AddToCart;
