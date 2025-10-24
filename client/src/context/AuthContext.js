
import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig'; // <-- Import our new api instance
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Check if user is already logged in (via cookie) when app loads
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // The server will check the cookie and return the user
        const res = await api.get('/auth/profile');
        setUser(res.data);
      } catch (err) {
        // No valid cookie, user is not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Helper to extract error messages from Axios
  const getErrorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    return error.message || 'An unknown error occurred.';
  };

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data); // Set user from response
      toast.success('Logged in successfully!');
      return res.data; // Return user data to page
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err; // Re-throw error for the page to handle
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      setUser(res.data); // Set user from response
      toast.success('Account created successfully!');
      return res.data; // Return user data to page
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err; // Re-throw error for the page to handle
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      toast.success('Logged out successfully.');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  // Provide the context value
  const value = {
    user,
    loading, // Provide loading state
    login,
    signup,
    logout,
  };

  // Don't render children until we've checked auth status
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
