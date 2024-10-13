// src/pages/Login.js
import React from 'react';
import AuthForm from '../components/AuthForm';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      navigate('/')
  
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
      console.log('Google login successful');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <>
      <AuthForm type="login" onSubmit={handleLogin} />
      <button
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-600"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>
    </>
  );
};

export default Login;
