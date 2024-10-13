import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase'; // Import Realtime Database instance
import { ref, get } from 'firebase/database'; // Import methods for interacting with Realtime Database

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // Fetch the user's additional data (like address) from the Realtime Database
        const userRef = ref(db, `users/${authUser.uid}`); // Reference to the user's data in the database
        const snapshot = await get(userRef);

        // If data exists in the Realtime Database, update the user object with the additional data
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUser({
            uid: authUser.uid,
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
            address: userData.address, // Fetch address from the database
          });
        } else {
          // If no additional data exists, just set the Firebase Auth user data
          setUser(authUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading to false after the user and data are fetched
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <UserContext.Provider value={{ user, loading, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
