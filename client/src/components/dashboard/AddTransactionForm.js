import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { createTransaction } from '../../api/transactionsApi';
import { getCategoriesByType } from '../../api/categoriesApi';

const AddTransactionForm = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    category: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      const response = await getCategoriesByType(formData.type);
      setCategories(response.data);
      if (response.data.length > 0) {
        setFormData((prev) => ({ ...prev, category: response.data[0]._id }));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }, [formData.type]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.category) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await createTransaction(formData);
      toast.success('Transaction added successfully!');
      setFormData({
        description: '',
        amount: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        category: categories[0]?._id || '',
      });
      onTransactionAdded();
    } catch (error) {
      toast.error(error.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaPlus className="mr-3 text-primary-500" />
        Add New Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Grocery Shopping"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
            />
          </div>
          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Transaction Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-500 focus:ring-green-500"
                />
                <span className="text-gray-700 font-medium">Income</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleChange}
                  className="w-5 h-5 text-red-500 focus:ring-red-500"
                />
                <span className="text-gray-700 font-medium">Expense</span>
              </label>
            </div>
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <FaPlus />
          <span>{loading ? 'Adding...' : 'Add Transaction'}</span>
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
