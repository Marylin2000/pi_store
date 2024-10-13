import React from "react";
import ps4Banner from "../assets/images/gaming/ps4/banner.jpg";
import ps4Image2 from "../assets/images/gaming/ps4/image2.jpg";
import ps4Image3 from "../assets/images/gaming/ps4/image3.jpg";
import ps4Image1 from "../assets/images/gaming/ps4/image1.jpg";

import ps5Image1 from "../assets/images/gaming/ps5/image1.jpg";
import ps5Image2 from "../assets/images/gaming/ps5/image2.jpg";
import ps5Image3 from "../assets/images/gaming/ps5/image3.jpg";
import ps5Image4 from "../assets/images/gaming/ps5/image4.jpg";
import ps5Image5 from "../assets/images/gaming/ps5/image5.jpg";
import ProductCard from "./ProductCard";
import LocalCard from "./LocalCard";

const gaming = [
  {
    id: 21,
    title: "PS4",
    description:
      "The PlayStation 4 (PS4) is Sony's iconic gaming console, known for its powerful performance and diverse game library. It features a custom AMD processor and advanced graphics capabilities, offering immersive gaming experiences with stunning visuals. The PS4 supports Blu-ray playback, streaming services, and digital downloads, making it an all-in-one entertainment system. It also includes the DualShock 4 wireless controller, providing intuitive and responsive gameplay. With access to exclusive titles like The Last of Us Part II, God of War, and Horizon Zero Dawn, the PS4 remains a popular and versatile console for gamers of all levels.",
    price: 1500,
    discountPercentage: 10,
    rating: 4.9,
    stock: 40,
    brand: "Sony",
    category: "Gaming",
    thumbnail: ps4Image1,
    images: [ps4Image2, ps4Image3],
  },
  {
    id: 22,
    title: "PS5",
    description:
      "The PlayStation 5 (PS5) is Sony’s next-generation gaming console, designed for ultra-high performance and immersive gameplay. It features a powerful custom AMD processor and GPU, delivering 4K gaming at high frame rates with ray tracing capabilities for realistic lighting and shadows. The PS5 offers lightning-fast load times with its ultra-high-speed SSD, and its Tempest 3D AudioTech provides immersive soundscapes. The console supports backward compatibility with most PS4 games and includes the innovative DualSense controller with adaptive triggers and haptic feedback for a deeper, more tactile gaming experience. The PS5's sleek design and cutting-edge technology make it a must-have for gaming enthusiasts.",
    price: 1500,
    discountPercentage: 10,
    rating: 4.9,
    stock: 40,
    brand: "Sony",
    category: "Gaming",
    thumbnail: ps5Image1,
    images: [ps5Image2, ps5Image3, ps5Image4, ps5Image5],
  },
];

function Gaming() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {gaming.map((product) => (
          <LocalCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Gaming;
