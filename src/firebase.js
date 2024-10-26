// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsneJ4QUmyEzgQcyikYpvBurkYmIF36uw",
    authDomain: "josrant-1d3e8.firebaseapp.com",
    projectId: "josrant-1d3e8",
    storageBucket: "josrant-1d3e8.appspot.com",
    messagingSenderId: "556126161609",
    appId: "1:556126161609:web:c29fd4a1559b91b79edb18",
    measurementId: "G-1VH9E602JT",
    databaseURL: "https://josrant-1d3e8-default-rtdb.firebaseio.com/", // URL for Realtime Database
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and Storage
export const db = getDatabase(app); // Realtime Database
export const storage = getStorage(app); // Firebase Storage for image uploads

// Initialize Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
