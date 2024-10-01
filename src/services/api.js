import axios from "axios";

const API_URL = 'https://dummyjson.com/products/category/smartPhones';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};
