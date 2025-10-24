import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaWallet, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register} = useAuth(); // Assuming you have a signup function in your context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(formData.username, formData.email, formData.password);
      // On successful signup, navigate to the dashboard or login page
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Signup error:', error);
      // Set a user-friendly error message
      setError('Failed to create account. Email may already be in use.');
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
          <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-white/80">Start tracking your finances today.</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username Field */}
            <div className="relative">
              <label
                htmlFor="username"
                className="absolute -top-2 left-4 px-1 bg-transparent text-white/80 text-xs"
              >
                Username
              </label>
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="your_username"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/20 text-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

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
                minLength="6" // Good practice to add minLength
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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-white/80 mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-white hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;