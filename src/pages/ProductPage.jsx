import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { FaStar, FaTruck, FaHeart, FaCartPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion components
import AddToCart from '../components/AddToCart';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(50); // Initial delivery fee for Nigeria

  // Coordinates of a central location in Africa (e.g., Nigeria)
  const africaCoords = { lat: 9.082, lon: 8.6753 };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setImage(data.thumbnail); // Set the initial main image
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    getProduct();
  }, [id]);

  if (!product) return <div className="p-4">Loading...</div>;

  const handleImageClick = (e) => {
    const imageLink = e.target.src;
    setImage(imageLink);
    console.log('Clicked Image URL:', imageLink);
    console.log('Product Data:', product);
  };

  // Function to calculate the delivery fee based on distance
  const calculateDeliveryFee = (lat, lon) => {
    const distance = getDistanceFromLatLonInKm(africaCoords.lat, africaCoords.lon, lat, lon);
    // Calculate delivery fee based on distance, e.g., 1 Pi per 100 km
    const fee = Math.round(distance / 100 * 100); // Adjust to your preferred pricing model
    setDeliveryFee(fee);
  };

  // Function to calculate distance between two points
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  // Handle region change and update delivery fee based on region's approximate coordinates
  const handleRegionChange = (val) => {
    setRegion(val);
    // Assuming the region's coordinates are known, e.g., based on a lookup table.
    const regionCoords = { lat: 6.5244, lon: 3.3792 }; // Placeholder coordinates (Lagos, Nigeria)
    calculateDeliveryFee(regionCoords.lat, regionCoords.lon);
  };

  // Define animation variants for sliding in
  const variants = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Product Image and Gallery */}
      <div className="lg:col-span-1">
        <div className="bg-white shadow-md p-4">
          <AnimatePresence mode='wait' >
            <motion.img
              key={image} // Key changes when image changes, triggering animation
              src={image || product.thumbnail} // Fallback to product.thumbnail
              onClick={handleImageClick} // Handle image click
              alt={product.title}
              width={250}
              className="object-cover mb-4 cursor-pointer"
              variants={variants} // Apply animation variants
              initial="initial" // Initial state
              animate="animate" // Animate to this state
              exit="exit" // Exit animation
              transition={{ duration: 0.5 }} // Animation duration
            />
          </AnimatePresence>
          <div className="flex gap-5">
            {/* Additional product images (gallery) */}
            {product.images?.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={img}
                width={70}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover border p-1 border-gray-300 cursor-pointer"
                onClick={handleImageClick} // Handle thumbnail click
              />
            ))}
          </div>
        </div>
        {/* Share Section */}
        <div className="flex items-center mt-4">
          <button className="text-gray-600 flex items-center mr-4">
            <FaHeart className="mr-2" /> Add to Wishlist
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Share:</span>
            <button className="text-blue-500">Facebook</button>
            <button className="text-blue-400">Twitter</button>
          </div>
        </div>
      </div>

      {/* Right Column - Product Details */}
      <div className="lg:col-span-1 bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <div className="text-sm bg-green-500 text-white px-2 py-1 rounded-md">Official Store</div>
        </div>

        <h1 className="text-xl font-bold mt-4">{product.title}</h1>
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>

        {/* Price Section */}
        <div className="mt-4">
          <span className="text-2xl font-semibold text-orange-600">
            {(product.price * 0.5).toLocaleString()} Pi
          </span>
          <span className="line-through text-gray-400 text-sm ml-2">
            {(product.price * 0.5).toLocaleString()} Pi
          </span>
          <span className="text-sm text-green-600 ml-2">-23%</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">+ shipping from {deliveryFee} Pi to {region}</p>

        {/* Rating Section */}
        <div className="mt-4">
          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-gray-300" />
            <span className="ml-2 text-sm text-gray-500">
              (13 verified ratings)
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full text-white text-lg font-semibold py-2 mt-4 rounded-md flex items-center justify-center">
          <AddToCart product={product} />
        </button>

        {/* Promotions */}
        <div className="mt-6">
          <p className="text-sm font-semibold">PROMOTIONS</p>
          <ul className="text-sm text-gray-700 mt-2 space-y-1">
            <li> Email pistore.net To Place Your Order</li>
            <li>🚚 Enjoy cheaper shipping fees when you select a Pickup Station at checkout.</li>
          </ul>
        </div>
      </div>

      {/* Sidebar - Delivery & Returns */}
      <div className="bg-white shadow-md p-4 lg:col-span-1">
        <h2 className="text-lg font-semibold">Delivery & Returns</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Choose your location</p>

          {/* Replace the select dropdowns with CountryDropdown and RegionDropdown */}
          <CountryDropdown
            value={country}
            onChange={(val) => setCountry(val)}
            classes="w-full border p-2 mt-2" // Style it
          />
          <RegionDropdown
            country={country}
            value={region}
            onChange={handleRegionChange}
            classes="w-full border p-2 mt-2" // Style it
          />
        </div>

        {/* Delivery Info */}
        <div className="mt-6">
          <FaTruck className="inline-block text-orange-500" />
          <span className="ml-2 text-sm text-gray-700">
            Delivery Fees {deliveryFee} Pi | Arriving between 08 and 10 October. Order within 6hrs 25mins
          </span>
        </div>

        {/* Return Policy */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold">Return Policy</h3>
          <p className="text-sm text-gray-600">Free return within 7 days for all eligible items</p>
        </div>

        {/* Warranty */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold">Warranty</h3>
          <p className="text-sm text-gray-600">One year</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
