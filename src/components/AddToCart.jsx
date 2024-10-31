import { useContext } from "react";
import CartContext from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";

function AddToCart({ product, price }) {
  const { cart, addToCart } = useContext(CartContext);
  const { user } = useUser();

  const handleAddToCart = (product, price) => {
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

    // Add product to cart with custom price
    addToCart(product, price);

    // Success toast notification
    toast.success(`Added "${product.title}" to cart`, {
      style: {
        background: "green",
        color: "#fff",
      },
    });
    console.log(`Added "${product.title}" with price ${price} to cart`);
  };

  return (
    <button
      onClick={() => handleAddToCart(product, price)} // Pass price
      className="mt-3 bg-[#f39c12] text-white text-xs py-2 px-4 rounded-md hover:bg-indigo-600 w-fit focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Add to cart
    </button>
  );
}

export default AddToCart;
