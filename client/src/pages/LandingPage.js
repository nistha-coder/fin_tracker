import React from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-500 text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-2xl">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-3xl mb-6 shadow-xl">
          <FaWallet className="text-5xl text-white" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to FinTrack
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-10">
          Your personal finance journey starts here.
          <br />
          Track, manage, and grow your money with ease.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-3 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:bg-white/90 transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3 bg-white/30 text-white font-bold rounded-lg backdrop-blur-sm hover:bg-white/40 transform hover:-translate-y-1 transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20 max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
          <FaChartLine className="text-4xl text-white mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Track Expenses</h3>
          <p className="text-white/80">
            Easily categorize and visualize where your money goes.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
          <FaWallet className="text-4xl text-white mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Manage Budgets</h3>
          <p className="text-white/80">
            Create custom budgets and get notified when you're near your limit.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
          <FaShieldAlt className="text-4xl text-white mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
          <p className="text-white/80">
            Your financial data is encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
