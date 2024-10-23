// BannerCarousel.js
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const banners = [
  { imgSrc: "/banner1.png", alt: "Flash Sales" },
  { imgSrc: "/banner2.png", alt: "Appliances" },
  { imgSrc: "/banner3.png", alt: "Phones & Tablets" }
];

const BannerCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Auto-scroll every 3 seconds
  };

  return (
    <Slider {...settings} className="mt-4">
      {banners.map((banner, index) => (
        <div key={index}>
          <img src={banner.imgSrc} alt={banner.alt} className="w-full h-auto"/>
        </div>
      ))}
    </Slider>
  );
};

export default BannerCarousel;
