import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryProducts from '../components/CategoriesProduct';
import MoreProducts from '../components/MoreProducts';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Product Grid Layout */}
      <CategoryProducts category="vehicle" />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <CategoryProducts category="laptops" />
      <CategoryProducts category="motorcycle" />
      <CategoryProducts category="tablets" />
      <CategoryProducts category="mens-watches" />
      <CategoryProducts category="vehicle" />
    <p>
      Decorations for your Home
    </p>
      <MoreProducts category={"home-decoration"} />
        <p>Skin care</p>
        <MoreProducts category={"skin-care"} />
        <p>Women Jeweleries</p>
        <MoreProducts category={"womens-jewellery"} />
        <p>For men</p>
        <MoreProducts category={"mens-shoes"} />
        <p>Furnitures</p>
        <MoreProducts category={"furniture"} />
        <p>Grocery</p>

    </div>
  );
};

export default Home;
