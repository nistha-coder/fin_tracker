import React, { useEffect, useState } from 'react';
import CreateCategoryForm from '../components/categories/CreateCategoryForm';
import CategoryList from '../components/categories/CategoryList';
import { getAllCategories } from '../api/categoriesApi';
import { useAppContext } from '../context/AppContext';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const CategoriesPage = () => {
  const { categories, setCategories, setLoading } = useAppContext();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadCategories();
  }, [refreshKey]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    // --- CHANGED --- Added dark background
    <div className="min-h-screen bg-green-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- CHANGED --- Swapped text to white */}
        <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
          🏷️ Manage Categories
        </h1>

        {/* Create Category Form */}
        <CreateCategoryForm onCategoryCreated={handleRefresh} />

        {/* Category Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income Categories */}
          {/* --- CHANGED --- Swapped to dark card, changed shadow to border */}
          <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8">
            {/* --- CHANGED --- Swapped text to white */}
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="bg-green-500 p-2 rounded-lg mr-3">
                <FaArrowUp className="text-white" />
              </div>
              Income Categories
            </h2>
            <CategoryList
              categories={categories}
              type="income"
              onCategoryUpdated={handleRefresh}
            />
          </div>

          {/* Expense Categories */}
          {/* --- CHANGED --- Swapped to dark card, changed shadow to border */}
          <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8">
            {/* --- CHANGED --- Swapped text to white */}
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div className="bg-red-500 p-2 rounded-lg mr-3">
                <FaArrowDown className="text-white" />
              </div>
              Expense Categories
            </h2>
            <CategoryList
              categories={categories}
              type="expense"
              onCategoryUpdated={handleRefresh}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;