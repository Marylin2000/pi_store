import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../utils/categories';

const CategoriesPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(category => (
           <Link to={`/category/${category}/products`} key={category.id}>
            <div className="p-4 border rounded shadow hover:bg-gray-100 transition-all">
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
