import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFakeCategories, fetchProductsByCategory } from "../services/api";
import ProductCard from "../components/ProductCard";
import FakeCard from "../components/FakeCard";
import { products } from "../constants/products";
import Loader from "../components/Loader"; 
import LocalCard from "../components/LocalCard";

function Categories() {
  const { category } = useParams();
  const [product, setProduct] = useState([]);
  const [fake, setFake] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      
      try {
        // Fetch real products and filter local ones
        const fetchedProducts = await fetchProductsByCategory(category);
        const filteredLocalProducts = products.filter((item) =>
          item.category.toLowerCase().includes(category.toLowerCase())
        );

        // Combine fetched and local products
        setProduct([...filteredLocalProducts, ...fetchedProducts]);

        // Fetch fake products if category is "electronics"
        if (category === "electronics") {
          const fetchedFakeProducts = await fetchFakeCategories(category);
          setFake(fetchedFakeProducts);
        } else {
          setFake([]); // Clear fake products when not in electronics
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [category]);

  // Render function for real/local products
  const renderProductGrid = (products, Component) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {products.map((item, index) => (
        <Component key={index} product={item} />
      ))}
    </div>
  );

  return (
    <main>
      <div className="p-4">
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Show fake products only for "electronics" */}
            {category === "electronics" && renderProductGrid(fake, FakeCard)}

            {/* Render real products for specific categories */}
            {(category === "vehicle" || category === "mobile-accessories") &&
              renderProductGrid(product, ProductCard)}

            {/* Render local products for "Gaming" or "Computer" categories */}
            {(category === "Gaming" || category === "Computer") &&
              renderProductGrid(product, LocalCard)}
          </>
        )}
      </div>
    </main>
  );
}

export default Categories;
