import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Register user
  // --- FIX #1: Changed 'name' to 'username' to match SignupPage and Backend ---
  // --- FIX #2: Changed URL to '/api/auth/register' to use the proxy ---
  const register = async (username, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setUser(response.data.data);
        toast.success('Registration successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // Login user
  // --- FIX #3: Changed URL to '/api/auth/login' to use the proxy ---
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setUser(response.data.data);
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const value = {
    user,
    loading,
    register, // This function is named 'register'
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
