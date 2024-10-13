import React, { useState, useEffect } from 'react';
import { fetchProductsByCategory } from '../services/api';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import ProductCard from './ProductCard';

const MoreProducts = ({ category }) => {
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProductsByCategory(category);
      setProducts(fetchedProducts);
    };

    getProducts();
  }, [category]);


  return (
    <div className="p-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </div>
  );
};

export default MoreProducts;
