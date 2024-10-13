import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "../constants/products";

// Example local products array (you can replace this with your actual data)
const localProducts = [
  { id: 101, title: "Local Product 1", description: "Description for local product 1", image: "https://via.placeholder.com/300x200" },
  { id: 102, title: "Local Product 2", description: "Description for local product 2", image: "https://via.placeholder.com/300x200" },
  { id: 103, title: "Local Product 3", description: "Description for local product 3", image: "https://via.placeholder.com/300x200" },
  // Add more products as needed
];

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        setLoading(true);

        try {
          // Fetch results from the API
          const apiResponse = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
          const apiResults = apiResponse.data.products;

          // Filter local products based on the query
        const filteredLocalProducts = products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );

          // Combine API results and local results
          const combinedResults = [...filteredLocalProducts, ...apiResults];

          setSearchResults(combinedResults);
          setLoading(false);
        } catch (error) {
          console.error("An error occurred", error);
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex lg:grid flex-wrap md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="text-center">No products found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
