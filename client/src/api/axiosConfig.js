// src/api/api.js

import axios from 'axios';

// Create a new Axios instance
const api = axios.create({
  // ✅ Add your live backend base URL
  baseURL: 'https://fin-tracker-2-odkq.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // 1. Get the user data from localStorage
    const userData = localStorage.getItem('user');

    if (userData) {
      // 2. Parse the user and get the token
      const user = JSON.parse(userData);
      const token = user.token;

      if (token) {
        // 3. Add token to Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // 4. Return modified config
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
