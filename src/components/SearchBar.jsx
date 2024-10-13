import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim().length > 0) {
      navigate(`/search?query=${searchQuery}`);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for products..."
          className="w-full p-3 pl-4 pr-16 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-0 top-0 bottom-0 bg-indigo-600 text-white py-2 px-4 m-1 rounded-lg hover:bg-indigo-700 focus:bg-indigo-500 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
