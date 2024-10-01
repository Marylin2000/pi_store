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

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Toaster position="top-right"/>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/category/:category/products" element={<CategoryProductsPage />} /> {/* New Route */}


            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
