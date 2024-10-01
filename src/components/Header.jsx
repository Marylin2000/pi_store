import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaQuestionCircle, FaBars } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center p-4">
        {/* Left Section (Menu and Logo) */}
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4">
            <FaBars size={24} />
          </button>
          <Link to={"/"} className='flex items-center flex-col'>
          <img src={logo} alt="Pi Store" width={40} />
          <p className='font-semibold text-[#61298b]'>Pi Sore</p>
          </Link>
        </div>

        {/* Right Section (User, Help, Cart) */}
        <div className="flex items-center space-x-6">
          <Link to="/user">
            <div className="flex items-center space-x-2">
              <FaRegUser className="text-xl" />
              <span className="hidden lg:block">Hi, Barry</span>
            </div>
          </Link>
          <div className="flex items-center space-x-1 cursor-pointer">
            <FaQuestionCircle className="text-xl" />
            <span className="hidden lg:block">Help</span>
          </div>
          <Link to="/cart" className="relative">
            <MdOutlineShoppingCart size={25} />
            <span className="absolute top-[-4px] right-[-4px] bg-orange-500 text-white text-xs rounded-full px-1">1</span>
          </Link>
        </div>
      </div>

      {/* Search Bar (below logo) */}
      <div className="p-2 bg-gray-100">
        <div className="flex items-center bg-white rounded-md px-3 py-2 max-w-2xl mx-auto">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products, brands and categories"
            className="w-full outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-[#562a77] text-white px-4 py-2 rounded-md ml-2 hover:bg-orange-600">
            SEARCH
          </button>
        </div>
      </div>

      {/* Sidebar (Menu) */}
      <div onClick={toggleSidebar} className={`fixed top-0 left-0 h-full w-full bg-transparent shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-50`}>

      <div className='bg-white h-full w-[60%]'
      
        >
        <button
          onClick={toggleSidebar}
          className="text-black text-lg p-4 focus:outline-none"
          >
          Close
        </button>
        
        {/* Add sidebar items here */}
        <nav >
          <ul>
            <li className="p-4 border-b">Home</li>
            <li className="p-4 border-b">
      <Link to="/categories">Categories</Link>
    </li>
            <li className="p-4 border-b">Deals</li>
            <li className="p-4 border-b">Contact Us</li>
          </ul>
        </nav>
      </div>
          </div>
    </header>
  );
};

export default Header;
