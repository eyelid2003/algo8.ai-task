import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

const checkAuthStatus = () => {
  return !!localStorage.getItem('token');
};

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(checkAuthStatus());

  const handleAuthChange = () => {
    setIsLoggedIn(checkAuthStatus());
  };

  useEffect(() => {
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
      
          <Route 
            path="/auth" 
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <AuthPage onAuthSuccess={handleAuthChange} />} 
          />
        
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <DashboardPage /> : <Navigate to="/auth" />} 
          />
        
          <Route path="*" element={<Navigate to={isLoggedIn ? '/dashboard' : '/auth'} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;