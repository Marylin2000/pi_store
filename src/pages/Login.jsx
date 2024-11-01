import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // State to track login errors

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setError('Incorrect email or password.');
      } else {
        setError('Login error. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('Google login successful');
      navigate('/');
    } catch (error) {
      setError('Google login error. Please try again.');
      console.error('Google login error:', error);
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      error={error} // Pass error state to AuthForm
    />
  );
};

export default Login;
