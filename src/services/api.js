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

// src/services/api.js
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data = await response.json();
    return data.products; // Return the array of products
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const fetchFakeProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    
    throw error;
  }
};

export const fetchFakeCategories = async (category) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    
    throw error;
  }
};


export const fetchFakeProductById = async (id) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};