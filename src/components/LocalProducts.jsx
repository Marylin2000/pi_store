import React, { useEffect, useState } from "react";
import LocalCard from "./LocalCard";
import { fetchFireProducts } from "../services/productServices"; // Import the fetch function

function LocalProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from Realtime Database once on component mount
    fetchFireProducts().then((fetchedProducts) => {
      setProducts(fetchedProducts); // Update state with fetched data
    });
  }, []);

  return (
    <main>
      <div className="grid grid-cols-2 ld:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <LocalCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default LocalProducts;
