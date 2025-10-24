import React from 'react';
import StatCard from '../common/StatCard';
import { FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const OverviewStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Balance"
        value={stats.totalBalance}
        icon={FaWallet}
        gradient="bg-gradient-to-br from-primary-500 to-secondary-500"
        iconBg="bg-white/20"
      />
      <StatCard
        title="Monthly Income"
        value={stats.monthlyIncome}
        icon={FaArrowUp}
        gradient="bg-gradient-to-br from-green-500 to-emerald-600"
        iconBg="bg-white/20"
      />
      <StatCard
        title="Monthly Expenses"
        value={stats.monthlyExpenses}
        icon={FaArrowDown}
        gradient="bg-gradient-to-br from-red-500 to-pink-600"
        iconBg="bg-white/20"
      />
    </div>
  );
};

export default OverviewStats;