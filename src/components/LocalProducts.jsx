import React, { useEffect, useState } from "react";
import { products } from "../constants/products";
import LocalCard from "./LocalCard";

function LocalProducts() {
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
