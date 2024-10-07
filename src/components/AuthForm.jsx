import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase"; // Import Firebase auth and provider
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

  const toggleShowPassword = () => {
    setFormData((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      console.log("Google login successful:", userCredential.user);
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">
          {type === "login" ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {type === "signup" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2">Password</label>
            <div>
              <input
                type={formData.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="button"
              className="absolute  flex right-3 top-[58%] text-sm text-gray-500"
              onClick={toggleShowPassword}
            >
              <span>{formData.showPassword ? <IoMdEye size={25} /> : <IoMdEyeOff size={25} />}</span>
            </button>
          </div>

          {type === "signup" && (
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                required
              />
              <label className="text-gray-700">
                I agree to the terms and conditions
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="my-4 flex items-center justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {type === "login" ? "Login with Google" : "Sign Up with Google"}
          </button>
        </div>

        <div className="mt-4 text-center">
          {type === "login" ? (
            <p>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:underline">
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
