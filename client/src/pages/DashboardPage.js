import React, { useEffect, useState } from 'react';
import OverviewStats from '../components/dashboard/OverviewStats';
import AddTransactionForm from '../components/dashboard/AddTransactionForm';
import RecentTransactionList from '../components/dashboard/RecentTransactionList';
import SpendingPieChart from '../components/dashboard/SpendingPieChart';
import { getDashboardStats, getRecentTransactions } from '../api/transactionsApi';
import { useAppContext } from '../context/AppContext';

const DashboardPage = () => {
  const {
    stats,
    setStats,
    transactions,
    setTransactions,
    loading,
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

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-900">
        <h2 className="text-2xl font-bold text-green-100">Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-green-100 mb-8 text-center drop-shadow-lg">
          💰 Financial Dashboard
        </h1>

        {/* --- UI CHANGE 1 ---
            OverviewStats remains at the top for high visibility. */}
        <OverviewStats stats={stats} />

        {/* --- UI CHANGE 2 ---
            A new grid to place the Form and Pie Chart side-by-side.
            On large screens (lg): 2/3 for the chart, 1/3 for the form.
            On small screens (default): They stack vertically. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
          
          {/* Main content area (Chart) */}
          <div className="lg:col-span-2">
            <SpendingPieChart spendingByCategory={stats.spendingByCategory} />
          </div>

          {/* Sidebar area (Form) */}
          <div className="lg:col-span-1">
            <AddTransactionForm onTransactionAdded={handleRefresh} />
          </div>
        </div>

        {/* --- UI CHANGE 3 ---
            RecentTransactionList is now at the bottom, full-width. */}
        <RecentTransactionList
          transactions={transactions}
          onTransactionDeleted={handleRefresh}
        />
        
      </div>
    </div>
  );
};

export default DashboardPage;