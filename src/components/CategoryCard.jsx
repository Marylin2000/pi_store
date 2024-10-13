import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white min-w-[150px] w-[15vw] h-[25vh] relative shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform">
      <Link to={category.link} className="h-full">
        {/* Image section */}
        <img
          src={category.image}
          alt={category.title}
          className="h-[65%] w-full object-cover rounded-t-lg"
        />
        {/* Text section */}
        <div className="p-3 h-[35%] flex justify-center items-center bg-white">
          <h3 className="text-sm font-semibold text-gray-800 text-center">
            {category.title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
