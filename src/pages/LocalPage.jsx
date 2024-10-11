import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaTruck, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AddToCart from '../components/AddToCart';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Loader from '../components/Loader';
import { products } from '../constants/products';
const LocalPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(50);

  // Coordinates of a central location in Africa (e.g., Nigeria)
  const africaCoords = { lat: 9.082, lon: 8.6753 };

  useEffect(() => {
    // Filter the product based on the ID from the products array
    const foundProduct = products.find((product) => product.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setImage(foundProduct.thumbnail);
    }
  }, [id]);

  if (!product) return <div className="p-4"><Loader /></div>;

  const handleImageClick = (e) => {
    const imageLink = e.target.src;
    setImage(imageLink);
  };

  const calculateDeliveryFee = (lat, lon) => {
    const distance = getDistanceFromLatLonInKm(africaCoords.lat, africaCoords.lon, lat, lon);
    const fee = Math.round((distance / 100) * 100);
    setDeliveryFee(fee);
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  const handleRegionChange = (val) => {
    setRegion(val);
    const regionCoords = { lat: 6.5244, lon: 3.3792 }; // Placeholder coordinates
    calculateDeliveryFee(regionCoords.lat, regionCoords.lon);
  };

  const variants = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="bg-white shadow-md p-4">
          <AnimatePresence mode='wait'>
            <motion.img
              key={image}
              src={image}
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

      <div className="lg:col-span-1 bg-white shadow-md p-4">
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
            <span className="ml-2 text-sm text-gray-500">(13 verified ratings)</span>
          </div>
        </div>
        <div className="bg-orange-500 my-4 py-1 flex items-center justify-center text-white font-bold rounded-md">
        <Link
          to={`/payment/${Math.round((product.price*0.15)+deliveryFee)}`}
         // Wrap in arrow function
        >
          Check Out
        </Link>
        </div>
          <AddToCart product={product} />
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
            Delivery Fees {deliveryFee} Pi | Arriving between 08 and 10 October. Order within 6hrs 25mins
          </span>
        </div>
      </div>
    </div>
  );
};

export default LocalPage;
