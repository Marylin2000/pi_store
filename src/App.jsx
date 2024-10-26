import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import User from "./pages/User";

import Faq from "./components/Faq";
import { Toaster } from "react-hot-toast";
import CategoryProductsPage from "./pages/CategoryProductPage";
import CategoriesPage from "./pages/CategoriesPage";
import CartPage from "./pages/Cart";
import PaymentPage from "./pages/PaymentPage";
import SearchResults from "./components/SearchResult";
import FakeProductPage from "./pages/FakeProductPage";
import LocalProducts from "./components/LocalProducts";
import LocalPage from "./pages/LocalPage";
import Categories from "./pages/Categories";
import Gaming from "./components/Gaming";
import Help from "./pages/Help";
import AddProductForm from "./pages/AddProduct";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Toaster position="top-right" />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:category" element={<Categories />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment/:totalPrice" element={<PaymentPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/help" element={<Help />} />
            <Route
              path="/category/:category/products"
              element={<CategoryProductsPage />}
            />
            {/* New Route */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/products/:id" element={<FakeProductPage />} />
            <Route path="/addProduct" element={<AddProductForm />} />

            <Route path="/item/:id" element={<LocalPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
