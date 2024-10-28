import React, { useEffect, useState } from "react";
import LocalCard from "./LocalCard";
import { fetchFireProducts } from "../services/productServices"; // Import the fetch function
import { products as localProducts } from "../constants/products";

function LocalProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    // Fetch products from Realtime Database once on component mount
    fetchFireProducts()
      .then((fetchedProducts) => {
        setProducts([...fetchedProducts, ...localProducts]); // Update state with fetched data
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false)); // Stop loading after data is fetched
  }, []);

  if (loading) return <div>Loading products...</div>; // Loader indication

  return (
    <main>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product, index) => (
          <LocalCard key={index} product={product} />
        ))}
      </div>
    </main>
  );
}

export default LocalProducts;
