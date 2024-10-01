// src/pages/Login.js
import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const handleLogin = (data) => {
    console.log('Login data:', data);
    // Handle login logic here
  };

  return (
    <AuthForm type="login" onSubmit={handleLogin} />
  );
};

export default Login;
