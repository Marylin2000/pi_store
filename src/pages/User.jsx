import React from "react";
import { useUser } from "../context/UserContext";
import UserPage from "../components/UserComponent";

function User() {
  const { user } = useUser();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      {user ? (
      <UserPage />
      ) : (
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">User Profile</h1>
          <p className="text-gray-600 mb-6">You are not logged in</p>
          <div className="flex justify-center space-x-4">
            <a
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              href="/login"
            >
              Login
            </a>
            <a
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
              href="/signup"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </main>
  );
}

export default User;
