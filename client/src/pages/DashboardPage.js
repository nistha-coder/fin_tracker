import React, { useEffect, useState } from 'react';
import OverviewStats from '../components/dashboard/OverviewStats';
import AddTransactionForm from '../components/dashboard/AddTransactionForm';
import RecentTransactionList from '../components/dashboard/RecentTransactionList';
import SpendingPieChart from '../components/dashboard/SpendingPieChart';
import { getDashboardStats, getRecentTransactions } from '../api/transactionsApi';
import { useAppContext } from '../context/AppContext';

const DashboardPage = () => {
  const { stats, setStats, transactions, setTransactions, setLoading } = useAppContext();
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
        💰 Financial Dashboard
      </h1>

      {/* Overview Stats */}
      <OverviewStats stats={stats} />

      {/* Add Transaction Form */}
      <AddTransactionForm onTransactionAdded={handleRefresh} />

      {/* Charts and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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