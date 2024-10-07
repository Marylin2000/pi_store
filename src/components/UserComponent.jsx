import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { auth } from "../firebase"; // Ensure Firebase is configured properly
import { updateProfile, updateEmail } from "firebase/auth";
import { uploadImage } from "../services/uploadImage";
// import Cart from "./Cart"; // A component for displaying the user's cart items

const UserPage = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    profileImage: user?.photoURL || "",
  });
  const [uploading, setUploading] = useState(false);

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
      const imageUrl = await uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
      setUploading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await updateProfile(user, {
          displayName: formData.displayName,
          photoURL: formData.profileImage,
        });
        if (user.email !== formData.email) {
          await updateEmail(user, formData.email);
        }
        setUser({ ...user, displayName: formData.displayName, email: formData.email, photoURL: formData.profileImage });
        setEditMode(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("An error occurred while updating your profile.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">User Profile</h1>
        <div className="flex items-center space-x-4 mb-8">
          <img
            src={formData.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-medium">{user?.displayName || "User"}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {editMode ? (
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {uploading && <p className="text-gray-500">Uploading...</p>}
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
              disabled={uploading}
            >
              Update Profile
            </button>
          </form>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Edit Profile
          </button>
        )}

        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Cart</h2>
     
      </div>
    </main>
  );
};

export default UserPage;
