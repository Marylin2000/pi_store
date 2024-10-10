import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa'  // Importing React Icons
import { Link } from 'react-router-dom';

const Footer = () => {

  // Scroll Back to Top Functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gray-100 py-10 border-t">
      <div className="container mx-auto">

        {/* Grid Layout for Footer Sections */}
        <div className="md:grid flex px-4  flex-wrap items-center justify-center gap-x-10 gap-y-10  lg:grid-cols-auto md:grid-cols-4 md:gap-8 text-gray-700">

          {/* Customer Service Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Returns & Refunds</a></li>
              <li><a href="#" className="hover:underline">Shipping Info</a></li>
              <li><a href="#" className="hover:underline">Track Order</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              
              <li><Link to={`categories/${"electronics"}`}  className="hover:underline">Electronics</Link></li>
              <li><Link to={`categories/${"womens-clothing"}`}  className="hover:underline">Fashion</Link></li>
              <li><Link to={`categories/${"smartphones"}`}  className="hover:underline">Smart Phones</Link></li>
              <li><Link to={`categories/${"vehicle"}`}  className="hover:underline">Vehicles</Link></li>
            </ul>
          </div>

          {/* Company Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg mt-[-70px] font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* React Icons for Social Media */}
              <a href="#" aria-label="Facebook" className="hover:text-blue-600">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400">
                <FaWhatsapp className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-pink-600">
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="mt-10 text-center">
          <button
            onClick={scrollToTop}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Top
          </button>
        </div>

        {/* Footer Bottom Text */}
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Pi Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
