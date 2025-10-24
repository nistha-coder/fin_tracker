import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-purple-600 mb-4">
        Welcome to FinTrack
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Your personal finance, simplified.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-white text-purple-600 border border-purple-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-50 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
