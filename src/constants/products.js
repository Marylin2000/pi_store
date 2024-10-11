// iPhone 13 Images
import iPhone13Image1 from '../assets/images/Iphone/13/image1.jpg';
import iPhone13Image2 from '../assets/images/Iphone/13/image2.jpg';
import iPhone13Image3 from '../assets/images/Iphone/13/image3.jpg';
import iPhone13Image4 from '../assets/images/Iphone/13/image4.jpg';

// iPhone 12 Images
import iPhone12Image1 from '../assets/images/Iphone/12/image1.jpg';
import iPhone12Image2 from '../assets/images/Iphone/12/image2.jpg';
import iPhone12Image3 from '../assets/images/Iphone/12/image3.jpg';
import iPhone12Image4 from '../assets/images/Iphone/12/image4.jpg';


// iPhone 11 Images
import iPhone11Image1 from '../assets/images/Iphone/11/image1.jpg';
import iPhone11Image2 from '../assets/images/Iphone/11/image2.jpg';
import iPhone11Image3 from '../assets/images/Iphone/11/image3.jpg';

// Sony Mirrorless Camera Images
import camera1 from '../assets/images/camera/image1.jpg';
import camera2 from '../assets/images/camera/image2.jpg';
import camera3 from '../assets/images/camera/image3.jpg';
import camera4 from '../assets/images/camera/image4.jpg';

// Samsung Galaxy S21 Images
import galaxyS21Image1 from '../assets/images/ac/ac1.jpg';
import galaxyS21Image2 from '../assets/images/ac/ac2.jpg';

// Google Pixel 5 Images
import freezer1 from '../assets/images/ac/freezer1.jpg';
import freezer2 from '../assets/images/ac/freezer2.jpg';
import freezer3 from '../assets/images/ac/freezer3.jpg';

// Iphone x Images
import x1 from '../assets/images/Iphone/x/image11.jpg';
import x2 from '../assets/images/Iphone/x/image21.jpg';

//xr
import xr1 from '../assets/images/Iphone/x/image1.jpg';
import xr2 from '../assets/images/Iphone/x/image2.jpg';

// Nikon DSLR Camera Images
import music1 from '../assets/images/music/image1.jpg';
import music2 from '../assets/images/music/image2.jpg';
import music3 from '../assets/images/music/image3.jpg';

// Canon DSLR Camera Images
import otherTv1 from '../assets/images/Tv/tv.jpg';
import otherTv2 from '../assets/images/Tv/tc.jpg';

import samsungTv3 from '../assets/images/Tv/tv1.jpg';
import samsungTv4 from '../assets/images/Tv/tv2.jpg';
import samsungTv2 from '../assets/images/Tv/tv3.jpg';
import samsungS24U from '../assets/images/samsung/s24Ultra.jpg';




// LG UltraWide Monitor Images
import lgMonitorImage1 from '../assets/images/Tv/image1.jpg';
import lgMonitorImage2 from '../assets/images/Tv/image2.jpg';
import lgMonitorImage3 from '../assets/images/Tv/image3.jpg';

// Additional products can be added similarly...


   export const  products =  [
      {
        id: 1,
        title: "iPhone 13",
        description: "Latest Apple smartphone with A15 Bionic chip and 5G support.",
        price: 999,
        discountPercentage: 5.5,
        rating: 4.8,
        stock: 150,
        brand: "Apple",
        category: "smartphones",
        thumbnail:iPhone13Image1,
        images: [
         iPhone13Image2,iPhone13Image3,iPhone13Image4
        ]
      },
      {
        id: 2,
        title: "iPhone 12",
        description: "Apple smartphone with A14 Bionic chip and 5G capability.",
        price: 799,
        discountPercentage: 8,
        rating: 4.7,
        stock: 200,
        brand: "Apple",
        category: "smartphones",
        thumbnail: iPhone12Image1,
        images: [
          iPhone12Image2,iPhone12Image3,iPhone12Image4

        ]
      },
      {
        id: 3,
        title: "iPhone 11",
        description: "Apple smartphone with dual-camera system and A13 Bionic chip.",
        price: 699,
        discountPercentage: 7,
        rating: 4.6,
        stock: 120,
        brand: "Apple",
        category: "smartphones",
        thumbnail: iPhone11Image1  ,
        images: [
          iPhone11Image2,iPhone11Image2,iPhone11Image3,
        ]
      },
      {
        id: 4,
        title: "iPhone X",
        description: "Apple smartphone with OLED display and Face ID technology.",
        price: 599,
        discountPercentage: 9.5,
        rating: 4.5,
        stock: 100,
        brand: "Apple",
        category: "smartphones",
        thumbnail: x1,
        images: [
         x1,x2
        ]
      },
      {
        id: 5,
        title: "iPhone XR",
        description: "Apple smartphone with Liquid Retina display and powerful A12 chip.",
        price: 499,
        discountPercentage: 10,
        rating: 4.4,
        stock: 140,
        brand: "Apple",
        category: "smartphones",
        thumbnail: xr1,
        images: [
         xr1, xr2
        ]
      },
 
      {
        id: 7,
        title: "Sony Mirrorless Camera",
        description: "Compact Sony mirrorless camera with 4K recording.",
        price: 1400,
        discountPercentage: 12,
        rating: 4.7,
        stock: 60,
        brand: "Sony",
        category: "cameras",
        thumbnail:   camera1,
        images: [
       camera2,camera3,camera4

        ]
      },
      {
        id: 8,
        title: "Samsung 300L Freezer",
        description: "Large-capacity freezer with energy-saving technology.",
        price: 800,
        discountPercentage: 10,
        rating: 4.6,
        stock: 70,
        brand: "Samsung",
        category: "freezers",
        thumbnail:freezer1,
        images: [
          freezer1
        ]
      },
      {
        id: 9,
        title: "LG 200L Freezer",
        description: "LG upright freezer with quick cooling system.",
        price: 700,
        discountPercentage: 8,
        rating: 4.5,
        stock: 80,
        brand: "LG",
        category: "freezers",
        thumbnail: freezer2,
        images: [
         freezer2
        ]
      },
      {
        id: 10,
        title: "Sony Music Player",
        description: "Portable music player with high-resolution display and long battery life.",
        price: 150,
        discountPercentage: 6,
        rating: 4.3,
        stock: 90,
        brand: "Sony",
        category: "music players",
        thumbnail:music1,
        images: [
          music1,music2, music3
        ]
      },
      {
        id: 11,
        title: "Samsung 55-inch 4K TV",
        description: "Samsung 4K smart TV with HDR support and Wi-Fi connectivity.",
        price: 1200,
        discountPercentage: 5,
        rating: 4.8,
        stock: 65,
        brand: "Samsung",
        category: "Electronics",
        thumbnail: samsungTv2,
        images: [
         samsungTv3, samsungTv4 
        ]
      },
      {
        id: 12,
        title: "LG 65-inch OLED TV",
        description: "LG OLED TV with stunning color accuracy and AI-enhanced picture quality.",
        price: 2500,
        discountPercentage: 10,
        rating: 4.9,
        stock: 40,
        brand: "LG",
        category: "Electronics",
        thumbnail: lgMonitorImage2,
        images: [
          lgMonitorImage1,
          lgMonitorImage3
        ]
      },
      {
        id: 13,
        title: "Samsung S24 Ultra",
        description: "The Samsung Galaxy S24 Ultra is a premium smartphone featuring a sleek design, a stunning 6.8-inch Dynamic AMOLED 2X display with a 120Hz refresh rate, and advanced camera capabilities. It boasts a powerful quad-camera setup with a high-resolution main sensor, offering excellent photography and videography. Powered by the latest Snapdragon 8 Gen 3 chipset (or Exynos, depending on the region), it ensures top-notch performance, seamless multitasking, and 5G connectivity. The S24 Ultra also includes a long-lasting battery, S Pen support, and IP68 water and dust resistance, making it a versatile and high-performance device for tech enthusiasts.",
        price: 1500,
        discountPercentage: 10,
        rating: 4.9,
        stock: 40,
        brand: "Samsung",
        category: "SmartPhones",
        thumbnail: samsungS24U,
        images: [
          samsungS24U
        ]
      },
      // Additional 28 products would follow the same structure, covering more smartphones, cameras, freezers, music players, and Electronics.
    ]
  

export const Phoneimages =  [
         iPhone13Image1, iPhone12Image1, camera2, samsungTv2
        ]
  
        