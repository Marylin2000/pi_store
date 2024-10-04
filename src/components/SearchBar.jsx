import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 0) {
        setLoading(true);
        try {
          const response = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`);
          setSearchResults(response.data.products);
          setLoading(false);
        } catch (error) {
          console.error("An error occurred", error);
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 300); // Delay to avoid excessive API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-1">
      <div className="border-2 w-full  border-indigo-600 flex item-center justify-center rounded-full" >

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for products..."
        className="w-full p-2  rounded-full"
        />
        </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex lg:grid flex-wrap md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : ""}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
