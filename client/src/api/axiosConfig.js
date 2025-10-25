import axios from 'axios';

// Create a new Axios instance
const api = axios.create({
  baseURL: 'https://fin-tracker-2-odkq.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to automatically include auth token
api.interceptors.request.use(
  (config) => {
    // Get the user data from localStorage
    const userData = localStorage.getItem('user');

    if (userData) {
      // Parse the user and get the token
      const user = JSON.parse(userData);
      const token = user.token;

      if (token) {
        // Add token to Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // Return modified config
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
