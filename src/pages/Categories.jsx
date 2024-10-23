import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFakeCategories, fetchProductsByCategory } from "../services/api";
import ProductCard from "../components/ProductCard";
import FakeCard from "../components/FakeCard";
import { products } from "../constants/products";
import Loader from "../components/Loader"; // Import your Loader component

function Categories() {
  const { category } = useParams();
  const [product, setProduct] = useState([]);
  const [fake, setFake] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true); // Start loading

        // Fetch products by category
        const fetchedProducts = await fetchProductsByCategory(category);

        // Filter local products based on the category
        const filteredLocalProducts = products.filter((product) =>
          product.category.toLowerCase().includes(category.toLowerCase())
        );

        // Combine local filtered products with fetched products
        setProduct([...filteredLocalProducts, ...fetchedProducts]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    // Fetch fake products only for electronics category
    if (category === "electronics") {
      const getFakeProducts = async () => {
        try {
          setLoading(true); // Start loading
          const fetchedFakeProducts = await fetchFakeCategories(category);
          setFake(fetchedFakeProducts);
        } catch (error) {
          console.error("Error fetching fake products:", error);
        } finally {
          setLoading(false); // End loading
        }
      };
      getFakeProducts();
    } else {
      setFake([]); // Clear the fake products when not in "electronics"
      setLoading(false); // Stop loading if not fetching fake products
    }

    getProducts();
  }, [category]);

  return (
    <main>
      <div className="p-4">
        {loading ? (
          <Loader /> // Display loader while fetching data
        ) : category !== "electronics" ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {product.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
            {console.log("Rendering real products")}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {fake.map((product) => (
              <FakeCard key={product.id} product={product} />
            ))}
            {console.log("Rendering fake products")}
          </div>
        )}
      </div>
    </main>
  );
}

export default Categories;
