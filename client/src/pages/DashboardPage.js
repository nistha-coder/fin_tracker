import React, { useEffect, useState } from 'react';
import OverviewStats from '../components/dashboard/OverviewStats';
import AddTransactionForm from '../components/dashboard/AddTransactionForm';
import RecentTransactionList from '../components/dashboard/RecentTransactionList';
import SpendingPieChart from '../components/dashboard/SpendingPieChart';
import { getDashboardStats, getRecentTransactions } from '../api/transactionsApi';
import { useAppContext } from '../context/AppContext';

const DashboardPage = () => {
  // --- FIX #1: Added 'loading' to the destructuring ---
  const {
    stats,
    setStats,
    transactions,
    setTransactions,
    loading, // Get the loading state
    setLoading,
  } = useAppContext();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadDashboardData();
  }, [refreshKey]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsResponse, transactionsResponse] = await Promise.all([
        getDashboardStats(),
        getRecentTransactions(10),
      ]);
      setStats(statsResponse.data);
      setTransactions(transactionsResponse.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // --- FIX #2: Add a loading check ---
  // If data is loading OR stats haven't been loaded yet,
  // display a loading message instead of the dashboard.
  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-gray-700">Loading Dashboard...</h2>
        {/* You could add a spinner component here */}
      </div>
    );
  }

  // --- If we get here, 'loading' is false AND 'stats' exists ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-black mb-8 text-center drop-shadow-lg">
        💰 Financial Dashboard
      </h1>

      {/* Overview Stats */}
      {/* This is now safe to render */}
      <OverviewStats stats={stats} />

      {/* Add Transaction Form */}
      <AddTransactionForm onTransactionAdded={handleRefresh} />

      {/* Charts and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* This is now safe to render */}
        <SpendingPieChart spendingByCategory={stats.spendingByCategory} />
        <RecentTransactionList
          transactions={transactions}
          onTransactionDeleted={handleRefresh}
        />
      </div>
    </div>
  );
};

export default DashboardPage;