import React, { useState, useEffect } from 'react';
import { fetchProductsByCategory } from '../services/api';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const CategoryProducts = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProductsByCategory(category);
      setProducts(fetchedProducts);
      setVisibleProducts(fetchedProducts.slice(0, 3)); // Initially show 3 products
    };

    getProducts();
  }, [category]);

  const handleSeeMore = () => {
    setSeeMore(true);
    setVisibleProducts(products); // Show all products when "See More" is clicked
  };

  return (
    <div className="mb-6">
      {/* Category Header */}
      <div className='flex items-center p-2 my-2 bg-yellow-500 w-full justify-between rounded-md'>
        <h2 className="text-xl font-semibold text-white capitalize">
          {category} Deals
        </h2>
        {!seeMore && products.length > 3 && (
          <Link to={`/category/${category}/products`} className="text-sm font-medium text-white hover:text-gray-100 transition">
            See More
          </Link>
        )}
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto space-x-4 no-scrollbar py-4">
        {visibleProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="min-w-[250px] flex-shrink-0 border bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              width={150}
              className="object-cover mb-4 rounded-lg h-[120px]" 
            />
            <h3 className="text-sm font-medium mb-2">{product.title.slice(0, 20)}...</h3>
            <p className="text-gray-500">
              {(Math.round(product.price) * 0.15).toLocaleString()} Pi
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
