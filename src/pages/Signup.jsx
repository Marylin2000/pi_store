// src/pages/Signup.js
import React from 'react';
import AuthForm from '../components/AuthForm';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate()

  const handleSignup = async (data) => {
    const { email, password, name } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password, name);
      console.log('Signup successful');
      navigate("/login")
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignup} />;
};

export default Signup;
