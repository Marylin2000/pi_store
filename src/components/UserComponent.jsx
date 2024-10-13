import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { auth } from "../firebase";
import { updateProfile, updateEmail, signOut } from "firebase/auth";
import { uploadImage } from "../services/uploadImage";
import { db } from "../firebase"; // Import Firestore
import { ref, set, get } from "firebase/database"; // Import methods for writing data

const UserPage = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    profileImage: "",
    address: "", // Initial address value
    password: "",
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      const loadUserData = async () => {
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setFormData({
            displayName: userData.displayName || "",
            email: userData.email || "",
            profileImage: userData.photoURL || "",
            address: userData.address || "", // Load address from database
            password: "",
          });
        }
      };

      loadUserData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const imageUrl = await uploadImage(file);
        setFormData((prev) => ({
          ...prev,
          profileImage: imageUrl,
        }));
      } catch (error) {
        console.error("Image upload error: ", error);
        alert("Error uploading image.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUploading(true); // Set uploading to true when starting the update
    try {
      if (user) {
        // Check if the email is valid before updating
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          alert("Please enter a valid email address.");
          return;
        }

        // Update Firebase Authentication profile
        await updateProfile(user, {
          displayName: formData.displayName,
          photoURL: formData.profileImage,
        });

        // Only update email if it is different
        if (user.email !== formData.email) {
          await updateEmail(user, formData.email);
        }

        // Update Realtime Database profile
        const userRef = ref(db, `users/${user.uid}`);
        await set(userRef, {
          displayName: formData.displayName,
          email: formData.email,
          photoURL: formData.profileImage,
          address: formData.address, // Ensure address is included here
        });

        // Update local user state
        setUser({
          ...user,
          displayName: formData.displayName,
          email: formData.email,
          photoURL: formData.profileImage,
          address: formData.address, // Update address in user state
        });

        setEditMode(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile: ", error.message || error);
      alert("An error occurred while updating your profile.");
    } finally {
      setUploading(false); // Set uploading to false after the update
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFormData({
        displayName: "",
        email: "",
        profileImage: "",
        address: "",
        password: "",
      });
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error: ", error);
      alert("An error occurred while logging out.");
    }
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <main className="h-screen w-screen py-4 px-2 flex justify-center items-start">
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <button className="text-white text-2xl">☰</button>
          <h1 className="text-white text-xl font-semibold">Edit Profile</h1>
          <div className="flex items-center space-x-3">
            <button className="text-white">🔔</button>
            <button className="text-white">🛒</button>
          </div>
        </div>
        <div className="bg-indigo-500 rounded-t-lg p-6">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={formData.profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
              <button
                onClick={handleImageUploadClick}
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full"
              >
                ✏️
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </div>
          <h2 className="text-white text-center text-lg mt-4">
            {user?.displayName || "User"}
          </h2>
        </div>
        <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            placeholder={user?.displayName || "Name"}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={user?.email || "Email"}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your address" // More descriptive placeholder
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white ${
              uploading ? "bg-gray-400" : "bg-blue-600"
            }`}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Update Profile"}{" "}
            {/* Change button text */}
          </button>
        </form>
        <button
          onClick={handleLogout}
          className="w-full py-2 mt-4 rounded-md bg-red-600 text-white"
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default UserPage;
