import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import Header from '../components/Header'; // Import the Header component
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Pass searchTerm and setSearchTerm as props to Header */}
      {/* <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}

      {/* Product Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
