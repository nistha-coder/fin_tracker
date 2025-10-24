import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { createCategory } from '../../api/categoriesApi';

const CreateCategoryForm = ({ onCategoryCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    setLoading(true);
    try {
      await createCategory(formData);
      toast.success('Category created successfully!');
      setFormData({ name: '', type: 'expense' });
      onCategoryCreated();
    } catch (error) {
      toast.error(error.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaPlus className="mr-3 text-primary-500" />
        Create New Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Groceries, Salary, Rent"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
            />
          </div>

          {/* Category Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Category Type
            </label>
            <div className="flex space-x-4 mt-2">
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <FaPlus />
          <span>{loading ? 'Creating...' : 'Create Category'}</span>
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;