import React from 'react';
import { FaTrash, FaCalendar, FaTag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { deleteTransaction } from '../../api/transactionsApi';

const RecentTransactionList = ({ transactions, onTransactionDeleted }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
        toast.success('Transaction deleted successfully!');
        onTransactionDeleted();
      } catch (error) {
        toast.error('Failed to delete transaction');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-500 text-lg">No transactions yet</p>
          <p className="text-gray-400 mt-2">Add your first transaction above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h2>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border-l-4 bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:translate-x-2 ${
              transaction.type === 'income' ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <div className="flex-1 mb-3 md:mb-0">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-start">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">
                    {transaction.description}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center">
                      <FaCalendar className="mr-1" />
                      {formatDate(transaction.date)}
                    </span>
                    <span className="flex items-center">
                      <FaTag className="mr-1" />
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {transaction.category?.name}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4">
              <span
                className={`text-2xl font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}₹
                {Math.abs(transaction.amount).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <button
                onClick={() => handleDelete(transaction._id)}
                className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 hover:scale-110"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactionList;