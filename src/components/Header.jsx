import React, { useEffect, useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaQuestionCircle } from 'react-icons/fa';
import { MdOutlineShoppingCart, MdOutlineVerifiedUser } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa6';
import logo from '../assets/images/logo.jpg'
import { fetchProducts } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
    const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <header className="flex justify-between items-center p-2 px-5  bg-white shadow-md">
      {/* Left Section (Logo) */}
      <div className="flex items-center space-x-2">
        <img src={logo}  alt="Pi Store" width={80}  />
      </div>

      {/* Middle Section (Search Bar) */}
      <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 w-full max-w-lg lg:max-w-xl">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search products, brands and categories"
          className="bg-transparent outline-none w-full text-sm md:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-[#562a77] text-white px-4 py-2 rounded-md ml-2 hover:bg-orange-600">
          SEARCH
        </button>
      </div>

      {/* Right Section (User, Help, Cart) */}
      <div className="flex items-center space-x-6">
      <Link to={"/user"} >
        {/* User Icon */}
        <div className="flex items-center space-x-2">
          <FaRegUser className="text-xl" />
          <span className="hidden lg:block">Hi, Barry</span>
          <span className="text-sm hidden lg:block cursor-pointer">▼</span>
        </div>
      </Link>

        {/* Help Section */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <FaQuestionCircle className="text-xl" />
          <span className="hidden lg:block">Help</span>
          <span className="text-sm hidden lg:block cursor-pointer">▼</span>
        </div>

        {/* Cart Icon */}
        <Link to={"/cart"} className="relative cursor-pointer">
          <MdOutlineShoppingCart size={25} className="text-2xl" />
          <span className="absolute top-[-4px] right-[-4px] bg-orange-500 text-white text-xs rounded-full px-1">1</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
