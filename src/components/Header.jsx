import React, { useContext, useState } from 'react';
import { FaSearch, FaQuestionCircle, FaBars, FaUserAlt } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import SearchBar from './SearchBar';
import CartContext from '../context/CartContext';
import defaultPhoto from '../assets/images/user.png';
import { useUser } from '../context/UserContext';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-white shadow-lg w-full sticky top-0 z-50">
      <div className="flex justify-between items-center p-4 bg-indigo-600 text-white">
        {/* Left Section (Menu and Logo) */}
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 text-white hover:text-indigo-200">
            <FaBars size={24} />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Pi Store" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-bold text-lg">Pi Store</span>
          </Link>
        </div>

        {/* Right Section (User, Help, Cart) */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <Link to="/user" className="flex items-center space-x-2">
            {user ? (
              <img src={user.photoURL || defaultPhoto} alt="User Avatar" className="rounded-full h-8 w-8" />
            ) : (
              <FaUserAlt className="text-white text-xl" />
            )}
            <p className="text-sm hidden sm:block">{user?.displayName || 'Profile'}</p>
          </Link>

          {/* Help Section */}
          <Link to="/help" className="flex items-center space-x-1 hover:text-indigo-200">
            <FaQuestionCircle className="text-xl" />
            <span className="hidden lg:block">Help</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center">
            <MdShoppingCart size={28} />
            {cart.length > 0 && (
              <span className="absolute top-[-8px] right-[-10px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search Bar (below logo) */}
      <div className="p-2 bg-gray-100">
        <SearchBar />
      </div>

      {/* Sidebar (Menu) */}
      <div
        onClick={toggleSidebar}
        className={`fixed top-0 left-0 h-full w-full bg-black/30 backdrop-blur-sm transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="bg-white h-full w-64 p-6 shadow-lg">
          <button
            onClick={toggleSidebar}
            className="text-black text-lg p-4 focus:outline-none"
          >
            Close
          </button>
          <nav className="mt-8">
            <ul className="space-y-4">
              <li>
                <Link to="/" onClick={toggleSidebar} className="text-lg font-semibold">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" onClick={toggleSidebar} className="text-lg font-semibold">
                  Categories
                </Link>
              </li>
              {/* Add more sidebar links here */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
