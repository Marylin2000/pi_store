import React, { useState, useEffect } from 'react';
import { fetchProductsByCategory } from '../services/api';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import ProductCard from './ProductCard';

const MoreProducts = ({ category }) => {
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
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* "See More" button */}
      {!seeMore && products.length > 3 && (
        <Link to={`/category/${category}/products`} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          See More
        </Link>
      )}
    </div>
  );
};

export default MoreProducts;
