import React, { useEffect, useState } from "react";
import { fetchFakeProducts, fetchProducts } from "../services/api";
import CategoryProducts from "../components/CategoriesProduct";
import MoreProducts from "../components/MoreProducts";
import Loader from "../components/Loader";
import FakeProducts from "../components/FakeProducts";
import FakeCategories from "../components/FakeCategories";
import LocalProducts from "../components/LocalProducts";
import { Phoneimages } from "../constants/products";
import Carousel from "../components/Carousel";
import { categories } from "../constants/categories";
import CategoryCard from "../components/CategoryCard";
import NewArrival from "../components/NewArrival";
import SpecialDeal from "../components/SpeciaDeal";
import BannerCard from "../components/BannerCard";
import smartWatch from "../assets/images/newArrival/smartWatch.png";
import lotion from "../assets/images/newArrival/lotion.png";
import ps5 from "../assets/images/newArrival/image1.png";
import asusGaming from "../assets/images/newArrival/image2.png";
import samsung from "../assets/images/newArrival/image3.png";

import { image } from "framer-motion/client";

const ps5Product = {
  id: 30,
  title: "PlayStation 5",
  description: "/categories/Gaming",
  link:"/categories/Gaming",

  image: ps5,
};

const asusRog = {
  id: 30,
  title: "Asus Gaming pc",
  description: "",
  image: asusGaming,
  link:"/categories/Computer",
};

const samsungUltra = {
  id: 30,
  title: "Samsung ultra smartphone",
  description: "",
  image: samsung,
  link:"/categories/smartphones",
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Set loading to true
      setError(null); // Reset error

      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError(
          "Failed to load products. Please check your network connection."
        ); // Set error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    getProducts();
  }, []);

  // Retry fetching products if network is back
  const retryFetch = () => {
    setProducts([]); // Clear previous products
    setError(null); // Clear error
    getProducts(); // Retry fetching
  };

  // Render error message if there's a network issue
  if (error) {
    return (
      <div className="container mx-auto p-4 h-screen w-screen absolute bg-white text-center">
        <h2 className="text-red-500 font-bold">{error}</h2>
        <button
          onClick={retryFetch}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render loader while products are loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container  mx-auto p-4">
      <div className="my-2">
        <SpecialDeal />
      </div>
      <Carousel images={Phoneimages} interval={2000} />
      <div className="flex gap-4 no-scrollbar w-full overflow-x-scroll p-4">
        {categories.map((category, index) => (
          <div key={index} className="flex-shrink-0">
            {/* Category Title Above the Card */}
            <div className="mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                {category.name}
              </h2>
            </div>
            {/* Category Card */}
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
      {/* Product Grid Layout */}
      <CategoryProducts category="vehicle" />
      <CategoryProducts category="laptops" />
      <CategoryProducts category="motorcycle" />
      <CategoryProducts category="tablets" />
      <NewArrival
        image={ps5Product.image}
        title={ps5Product.title}
        id={ps5Product.id}
        description={ps5Product.description}
        link={ps5Product.link}
      />
      <CategoryProducts category="mens-watches" />
      <CategoryProducts category="vehicle" />
      <p>Decorations for your Home</p>
      <MoreProducts category={"home-decoration"} />
      <p>Skin care</p>
      <BannerCard image={lotion} color={"1"} product={"Skin Care"} />
      <MoreProducts category={"skin-care"} />
      <div className="flex items-center p-2 my-2 bg-grad_11 w-full justify-between rounded-md">
        <h2 className="text-xl font-semibold text-white capitalize">
          Jewellery
        </h2>
      </div>
      <MoreProducts category={"womens-jewellery"} />
      <div className="flex items-center p-2 my-2 bg-grad_2 w-full justify-between rounded-md">
        <h2 className="text-xl font-semibold text-white capitalize">
          Male Shoes
        </h2>
      </div>
      <MoreProducts category={"mens-shoes"} />
      <div className="flex items-center p-2 my-2 bg-grad_8 w-full justify-between rounded-md">
        <h2 className="text-xl font-semibold text-white capitalize">
          Furnitures
        </h2>
      </div>
      <NewArrival
        image={asusRog.image}
        title={asusRog.title}
        id={asusRog.id}
        link={asusRog.link}
        description={asusRog.description}
      />
      <MoreProducts category={"furniture"} />
      <div className="flex items-center p-2 my-2 bg-grad_6 w-full justify-between rounded-md">
        <h2 className="text-xl font-semibold text-white capitalize">More</h2>
      </div>
      <FakeProducts />d
      <FakeCategories category={"electronics"} product={"Smart Watches"} />
      <BannerCard image={smartWatch} product={"smart Watches"}  color={"1"} />
      <LocalProducts />
      <NewArrival
        image={samsungUltra.image}
        title={samsungUltra.title}
        link={samsungUltra.link}
        id={samsungUltra.id}
        description={samsungUltra.description}
      />
    </div>
  );
};

export default Home;

