import React, { useEffect, useState } from "react";
import { fetchFakeProducts, fetchProducts } from "../services/api";
import CategoryProducts from "../components/CategoriesProduct";
import MoreProducts from "../components/MoreProducts";
import Loader from "../components/Loader";
import FakeProducts from "../components/FakeProducts";
import FakeCategories from "../components/FakeCategories";
import LocalProducts from "../components/LocalProducts";
import { Phoneimages } from "../constants/products";
import Carousel from "../components/Carousel";
import { categories } from "../constants/categories";
import CategoryCard from "../components/CategoryCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Set loading to true
      setError(null); // Reset error

      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError(
          "Failed to load products. Please check your network connection."
        ); // Set error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    getProducts();
  }, []);

  // Retry fetching products if network is back
  const retryFetch = () => {
    setProducts([]); // Clear previous products
    setError(null); // Clear error
    getProducts(); // Retry fetching
  };

  // Render error message if there's a network issue
  if (error) {
    return (
      <div className="container mx-auto p-4 h-screen w-screen absolute bg-white text-center">
        <h2 className="text-red-500 font-bold">{error}</h2>
        <button
          onClick={retryFetch}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render loader while products are loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container  mx-auto p-4">
      <Carousel images={Phoneimages} interval={2000} />

      <div className="flex flex-wrap  gap-5">
        {categories.map((category, index) => {
          return (
            <div key={index} className="my-4">
              <h2 className="text-2xl font-bold">{category.name}</h2>
              <CategoryCard category={category} />
            </div>
          );
        })}
      </div>
      {/* Product Grid Layout */}
      <CategoryProducts category="vehicle" />
      <CategoryProducts category="laptops" />
      <CategoryProducts category="motorcycle" />
      <CategoryProducts category="tablets" />
      <CategoryProducts category="mens-watches" />
      <CategoryProducts category="vehicle" />
      <p>Decorations for your Home</p>
      <MoreProducts category={"home-decoration"} />
      <p>Skin care</p>
      <MoreProducts category={"skin-care"} />
      <p>Women Jeweleries</p>
      <MoreProducts category={"womens-jewellery"} />
      <p>For men</p>
      <MoreProducts category={"mens-shoes"} />
      <p>Furnitures</p>
      <MoreProducts category={"furniture"} />
      <p>More</p>
      <FakeProducts />
      <FakeCategories category={"electronics"} />
      <LocalProducts />
    </div>
  );
};

export default Home;
