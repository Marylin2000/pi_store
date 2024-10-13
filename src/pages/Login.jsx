import React from 'react';
import AuthForm from '../components/AuthForm';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
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
      await signInWithPopup(auth, googleProvider);
      console.log('Google login successful');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (

      <AuthForm type="login" onSubmit={handleLogin} />
     
  );
};

export default Login;
