import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { FaStar, FaTruck, FaHeart, FaCartPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AddToCart from '../components/AddToCart';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Loader from '../components/Loader';

const deliveryFeesByContinent = {
  Africa: 10,
  Europe: 40,
  Americas: 50,
  Asia: 30,
  Oceania: 35,
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(50); // Default delivery fee

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

  // Update delivery fee when country changes
  useEffect(() => {
    if (country) {
      fetchContinentByCountry(country);
    }
  }, [country]);

  const fetchContinentByCountry = async (countryName) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      const data = await response.json();
      const continent = data[0]?.continents[0]; // Get the continent name
      const fee = deliveryFeesByContinent[continent] || 50; // Fallback to default fee
      setDeliveryFee(fee);
    } catch (error) {
      console.error('Error fetching continent:', error);
    }
  };

  if (!product) return <div className="p-4"><Loader /></div>;

  const handleImageClick = (e) => {
    const imageLink = e.target.src;
    setImage(imageLink);
  };

  // Function to calculate a random delivery day between 3 to 10 days from now
  const calculateDeliveryDate = () => {
    const currentDate = new Date();
    const minDeliveryDays = 3;
    const maxDeliveryDays = 10;
    const deliveryDays = Math.floor(Math.random() * (maxDeliveryDays - minDeliveryDays + 1)) + minDeliveryDays;
    currentDate.setDate(currentDate.getDate() + deliveryDays);
    return currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
  };

  // Handle region change
  const handleRegionChange = (val) => {
    setRegion(val);
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
          <AnimatePresence mode="wait">
            <motion.img
              key={image}
              src={image || product.thumbnail}
              onClick={handleImageClick}
              alt={product.title}
              width={250}
              className="object-cover mb-4 cursor-pointer"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className="flex gap-5">
            {product.images?.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={img}
                width={70}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover border p-1 border-gray-300 cursor-pointer"
                onClick={handleImageClick}
              />
            ))}
          </div>
        </div>
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
        <div>
          <p>{product.description}</p>
        </div>

        <div className="mt-4">
          <span className="text-2xl font-semibold text-orange-600">
            {(Math.round(product.price) * 0.15).toLocaleString()} Pi
          </span>
          <span className="line-through text-gray-400 text-sm ml-2">
            {(product.price * 0.5).toLocaleString()} Pi
          </span>
          <span className="text-sm text-green-600 ml-2">-23%</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">+ shipping from {deliveryFee} Pi to {region}</p>

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

        <AddToCart product={product} />

        <div className="mt-6">
          <p className="text-sm font-semibold">PROMOTIONS</p>
          <ul className="text-sm text-gray-700 mt-2 space-y-1">
            <li> Email pistore.net To Place Your Order</li>
            <li>🚚 Enjoy cheaper shipping fees when you select a Pickup Station at checkout.</li>
          </ul>
        </div>
      </div>

      <div className="bg-white shadow-md p-4 lg:col-span-1">
        <h2 className="text-lg font-semibold">Delivery & Returns</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Choose your location</p>

          <CountryDropdown
            value={country}
            onChange={(val) => setCountry(val)}
            classes="w-full border p-2 mt-2"
          />
          <RegionDropdown
            country={country}
            value={region}
            onChange={handleRegionChange}
            classes="w-full border p-2 mt-2"
          />
        </div>

        <div className="mt-6">
          <FaTruck className="inline-block text-orange-500" />
          <span className="ml-2 text-sm text-gray-700">
            Delivery Fees {deliveryFee} Pi | Arriving between {calculateDeliveryDate()} and {calculateDeliveryDate()}.
          </span>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold">Return Policy</h3>
          <p className="text-sm text-gray-600">Free return within 7 days for all eligible items</p>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold">Warranty</h3>
          <p className="text-sm text-gray-600">One year</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
``
