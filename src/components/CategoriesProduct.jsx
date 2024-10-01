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
    <div className="">
        <div className='flex items-center p-2 my-2  bg-indigo-600 w-full  justify-between'>

      <h2 className="text-xl font-semibold text-slate-100 "> {category.split("")} Deals</h2>
      {!seeMore && products.length > 3 && (
        <Link to={`/category/${category}/products`} className="flex items-center text-white ">
          See More
        </Link>
      )}
        </div>
      
      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto space-x-4 no-scrollbar">
        {visibleProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="min-w-[250px] flex-shrink-0 border p-4 rounded-lg shadow-md">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              width={150}
              className=" object-cover mb-4 rounded-lg" 
            />
            <h3 className="text-xs  font-medium">{product.title}</h3>
            <p className="text-gray-600">{Math.round(product.price * 0.2)} Pi</p>
          </Link>
        ))}
      </div>
      
      {/* "See More" button */}
      
    </div>
  );
};

export default CategoryProducts;
