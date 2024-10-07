import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDsneJ4QUmyEzgQcyikYpvBurkYmIF36uw",
    authDomain: "josrant-1d3e8.firebaseapp.com",
    projectId: "josrant-1d3e8",
    storageBucket: "josrant-1d3e8.appspot.com",
    messagingSenderId: "556126161609",
    appId: "1:556126161609:web:c29fd4a1559b91b79edb18",
    measurementId: "G-1VH9E602JT"
};

const app = initializeApp(firebaseConfig);
console.log('Firebase initialized:', app.name); // Should log the app name if successful

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
