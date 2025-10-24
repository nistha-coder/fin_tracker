import React, { createContext, useContext, useState } from 'react';
//
// All backend imports like 'user.model' and 'jsonwebtoken' have been REMOVED.
// A React context should only contain frontend code.
//
//

const AppContext = createContext();

// Renamed 'useApp' to 'useAppContext'
// This now matches what your other pages are trying to import.
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // --- FIX: Added all the states your DashboardPage needs ---
  const [stats, setStats] = useState(null); // For dashboard stats
  const [transactions, setTransactions] = useState([]); // For recent transactions
  const [categories, setCategories] = useState([]); // For categories
  const [loading, setLoading] = useState(true); // Global loading state

  // Add functions to fetch or update this data
  const fetchTransactions = async () => {
    //
    // TODO: Add API call to fetch transactions
    // Example: const res = await axios.get('/api/transactions');
    // setTransactions(res.data.data);
    //
  };

  // --- FIX: Exported all states and setters in the value ---
  const value = {
    stats,
    setStats,
    transactions,
    setTransactions, // Added this setter
    categories,
    setCategories,
    loading,         // Added loading state
    setLoading,      // Added loading setter
    fetchTransactions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};