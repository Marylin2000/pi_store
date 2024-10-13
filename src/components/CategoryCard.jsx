import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white w-[25vw] h-[20vh] relative shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={category.link} >
        <img
          src={category.image}
          alt={category.title}
          className="  w-full object-cover"
        />
        <div className="p-4">
          <h3 className=" font-semibold text-sm text-gray-800">
            {category.title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
