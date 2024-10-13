import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFakeCategories, fetchProductsByCategory } from "../services/api";
import ProductCard from "../components/ProductCard";
import FakeCard from "../components/FakeCard";

function Categories() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [fake, setFake] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProductsByCategory(category);
      setProducts(fetchedProducts);
    };
    if (category == "electronics" ){
      const getFakeProducts = async () => {
        const fetchedProducts = await fetchFakeCategories(category);
        setFake(fetchedProducts);
      };
      getFakeProducts();

    }
    
    getProducts();

    fake?console.log(`products from ${category},  ${fake}`):console.log(products)
  }, [category]);
  console.log(`products from ${category},  ${products}`);
  console.log(`products from ${category},  ${fake}`);
  return (
    <main>
      <div className="p-4">
        {
        category !== "electronics"?
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {
            console.log("i am redering products")
          }
        </div>:
        
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        
          {fake.map((product) => (
            
            <FakeCard key={product.id} product={product} />
          ))}
          {
            console.log("i am redering fake products")
            
          }
        </div>

        }
      </div>
    </main>
  );
}

export default Categories;
