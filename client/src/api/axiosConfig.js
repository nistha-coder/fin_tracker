import axios from 'axios';

// Define the base URL for your backend
const API_URL = 'http://localhost:5000/api';

// Create an 'axios' instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // <-- THIS IS THE MAGIC!
});

export default api;
