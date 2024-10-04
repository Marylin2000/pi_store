import React, { useContext, useState } from 'react';
import { FaSearch, FaShoppingCart, FaQuestionCircle, FaBars } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import SearchBar from './SearchBar';
import CartContext from '../context/CartContext';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Add navigate for page navigation
  const {cart} = useContext(CartContext)
  console.log(cart)
  const user = false

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="bg-white shadow-md w-screen">
      <div className="flex justify-between items-center p-4">
        {/* Left Section (Menu and Logo) */}
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4">
            <FaBars size={24} />
          </button>
          <Link to={"/"} className='flex items-center flex-col'>
            <img src={logo} alt="Pi Store" width={40} />
            <p className='font-semibold text-[#61298b]'>Pi Store</p>
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
            <span className="absolute top-[-4px] right-[-4px] bg-orange-500 text-white text-xs rounded-full px-1">{ user?cart.length:""}</span>
          </Link>
        </div>
      </div>

      {/* Search Bar (below logo) */}
      <div className="p-2 bg-gray-100">
        <div className="flex items-center bg-white rounded-md px-3 py-2 w-full mx-auto">
         
          <SearchBar />
        </div>
      </div>

      {/* Sidebar (Menu) */}
      <div onClick={toggleSidebar} className={`fixed top-0 left-0 h-full w-full bg-white/40 shadow-lg  backdrop-blur-[1px] transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-50`}>
        <div className='bg-white h-full w-[60%]'>
          <button
            onClick={toggleSidebar}
            className="text-black text-lg p-4 focus:outline-none"
          >
            Close
          </button>
          {/* Add sidebar items here */}
          <nav>
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
    </main>
  );
};

export default Header;
