import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    spendingByCategory: [],
  });
  const [loading, setLoading] = useState(false);

  const updateCategories = useCallback((newCategories) => {
    setCategories(newCategories);
  }, []);

  const updateTransactions = useCallback((newTransactions) => {
    setTransactions(newTransactions);
  }, []);

  const updateStats = useCallback((newStats) => {
    setStats(newStats);
  }, []);

  const value = {
    categories,
    setCategories: updateCategories,
    transactions,
    setTransactions: updateTransactions,
    stats,
    setStats: updateStats,
    loading,
    setLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};