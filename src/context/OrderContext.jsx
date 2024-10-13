// import React, { createContext, useContext, useState, useEffect } from "react";
// import { auth, db} from "firebase"
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

// const OrderContext = createContext();

// export const useOrder = () => useContext(OrderContext);

// export const OrderProvider = ({ children }) => {
//   const [orders, setOrders] = useState(() => {
//     const storedOrders = localStorage.getItem("orders");
//     return storedOrders ? JSON.parse(storedOrders) : [];
//   });

//   const [userLocation, setUserLocation] = useState(null);
//   const [userId, setUserId] = useState(null);

//   // Fetch user location from Firebase Firestore
//   useEffect(() => {
//     const fetchUserLocation = async (userId) => {
//       if (!userId) return;
//       const userDocRef = doc(db, "users", userId);
//       const userDoc = await getDoc(userDocRef);
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         setUserLocation(userData.location); // Assuming 'location' field exists in user document
//       } else {
//         console.error("User location not found");
//       }
//     };

//     // Listen to auth changes (get current logged-in user)
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//         fetchUserLocation(user.uid); // Fetch location when user is authenticated
//       } else {
//         setUserId(null);
//         setUserLocation(null); // Reset location if user logs out
//       }
//     });

//     return () => unsubscribe(); // Cleanup subscription on component unmount
//   }, []);

//   const addOrder = (cartItems) => {
//     if (!userLocation) {
//       console.error("Cannot add order, user location is missing");
//       return;
//     }

//     const newOrder = {
//       id: new Date().getTime(),
//       items: cartItems,
//       location: userLocation,
//       date: new Date().toISOString(),
//     };

//     const updatedOrders = [...orders, newOrder];
//     setOrders(updatedOrders);
//     localStorage.setItem("orders", JSON.stringify(updatedOrders));
//   };

//   return (
//     <OrderContext.Provider value={{ orders, addOrder, userLocation }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };
