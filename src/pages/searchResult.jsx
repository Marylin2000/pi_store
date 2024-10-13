import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

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
          const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
          setSearchResults(response.data.products);
          setLoading(false);
        } catch (error) {
          console.error("An error occurred", error);
          setLoading(false);
        }
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
