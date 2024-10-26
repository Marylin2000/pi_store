import React, { useState, useEffect } from 'react';
import { fetchProductsByCategory } from '../services/api';
import { Link, useParams } from 'react-router-dom';

const CategoryProductsPage = () => {
  const { category } = useParams();  // Get category from URL params
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
      <h2 className="text-2xl font-semibold mb-4">All Products in {category}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="border p-4 rounded-lg shadow-md">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-48 object-cover mb-4 rounded-lg" 
            />
            <h3 className="text-lg font-medium">{product.title}</h3>
        <p className="text-gray-600">
        {Math.round((product.price * 0.09 ))} &pi;


        </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
