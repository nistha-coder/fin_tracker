import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { FaWallet, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State for login errors
  const { login } = useAuth();
  const navigate = useNavigate(); // Hook for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      await login(formData.email, formData.password);
      // On successful login, AuthContext will likely handle redirection
      // or you can do it here:
      navigate('/dashboard'); // Redirect to a protected route
    } catch (error) {
      console.error('Login error:', error);
      // Set a user-friendly error message
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-500 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl mb-4">
            <FaWallet className="text-4xl text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-white/80">Login to access your finance tracker.</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="absolute -top-2 left-4 px-1 bg-transparent text-white/80 text-xs"
              >
                Email Address
              </label>
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/20 text-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="absolute -top-2 left-4 px-1 bg-transparent text-white/80 text-xs"
              >
                Password
              </label>
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/20 text-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-center text-red-400 text-sm">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Logging in...'
              ) : (
                <span className="flex items-center justify-center">
                  <FaSignInAlt className="mr-2" />
                  Login
                </span>
              )}
            </button>
          </form>

          {/* Sign up Link */}
          <p className="text-center text-white/80 mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-bold text-white hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;