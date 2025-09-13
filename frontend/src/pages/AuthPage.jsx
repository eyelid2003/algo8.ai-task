import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/forms/AuthForm';
import { login, signup } from '../api/auth';

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async ({ name, email, password }) => {
    try {
  
      setError('');

      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await signup(name, email, password);
      }

    
      if (data?.token) {
        localStorage.setItem('token', data.token);
      
        onAuthSuccess();
        navigate('/dashboard');
      } else {
        setError('Authentication failed: Invalid response from server.');
      }
    } catch (err) {
      console.error(err);
  
      setError(err?.response?.data?.message || err.message || 'An unknown error occurred.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
    
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      <AuthForm
        type={isLogin ? 'login' : 'signup'}
        onSubmit={handleAuth}
      />
      <button
        onClick={toggleForm}
        style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Switch to {isLogin ? 'Sign Up' : 'Login'}
      </button>
    </div>
  );
};

export default AuthPage;