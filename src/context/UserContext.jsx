import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase'; // Import Firebase authentication and database instances
import { ref, get, set } from 'firebase/database'; // Import Realtime Database methods

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setLoading(true);
      setError(null);

      if (authUser) {
        try {
          // Reference to the user's data in the Realtime Database
          const userRef = ref(db, `users/${authUser.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            // If user data exists in the Realtime Database, update the user object with additional data
            const userData = snapshot.val();
            setUser({
              uid: authUser.uid,
              displayName: authUser.displayName,
              email: authUser.email,
              photoURL: authUser.photoURL,
              address: userData.address,
            });
          } else {
            // If no additional data exists, set the user to Firebase Auth data and create a database entry
            setUser(authUser);
            await set(userRef, { address: "", displayName: authUser.displayName });
          }
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          setError("Failed to load user data.");
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to update the user profile in Firebase Auth and Realtime Database
  const updateUserProfile = async (updates) => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      // Update profile in Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: updates.displayName || user.displayName,
        photoURL: updates.photoURL || user.photoURL,
      });

      // Update user data in Realtime Database
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, { ...updates, email: user.email });

      // Update local state
      setUser((prevUser) => ({
        ...prevUser,
        ...updates,
      }));
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Failed to log out.");
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, error, logout, updateUserProfile, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
