import React, { useEffect, useState } from "react";
import { products } from "../constants/products";
import LocalCard from "./LocalCard";
import { fetchFireProducts } from "../services/productServices";

function LocalProducts() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    // Start listening to Firestore updates
    const unsubscribe = fetchFireProducts((fetchedProducts) => {
      setProduct([...products]);
    });

    // Cleanup listener on unmount
    return () => unsubscribe && unsubscribe();
  }, []);

  return (
    <main>
      <div className="grid grid-cols-2 ld:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {product.map((product) => (
          <LocalCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default LocalProducts;
