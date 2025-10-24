import React from 'react';

const StatCard = ({ title, value, icon: Icon, gradient, iconBg }) => {
  return (
    <div className={`${gradient} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconBg} p-3 rounded-xl`}>
          <Icon className="text-2xl" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium uppercase tracking-wider opacity-90 mb-1">
          {title}
        </p>
        <p className="text-4xl font-bold">
          ₹{Math.abs(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};

export default StatCard;