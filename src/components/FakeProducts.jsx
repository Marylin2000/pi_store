import React, { useEffect, useState } from "react";
import FakeCard from "./FakeCard";
import { fetchFakeProducts } from "../services/api";

function FakeProducts() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Set loading to true
      setError(null); // Reset error

      try {
        const products = await fetchFakeProducts();
        setProduct(products);
        console.log(fake);
      } catch (error) {
        setError(
          "Failed to load products. Please check your network connection."
        ); // Set error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    getProducts();
  }, []);
  return (
    <main>
      <div className="grid grid-cols-2 ld:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {product.map((product) => (
          <FakeCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default FakeProducts;
