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
    <div className="p-1">
      <div className="border-2 w-full border-indigo-600 flex items-center justify-center rounded-full">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for products..."
          className="w-full p-2 rounded-full"
        />
        <button
          onClick={handleSearchClick}
          className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-l-sm rounded-r-full"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
