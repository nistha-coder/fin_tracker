import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaWallet, FaChartLine, FaTags } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <FaWallet className="text-2xl text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              FinTrack
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-2">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/dashboard')
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaChartLine className="text-lg" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/categories"
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isActive('/categories')
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaTags className="text-lg" />
              <span>Manage Categories</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;