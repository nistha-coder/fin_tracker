import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { deleteCategory, updateCategory } from '../../api/categoriesApi';

const CategoryList = ({ categories, type, onCategoryUpdated }) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const filteredCategories = categories.filter((cat) => cat.type === type);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        toast.success('Category deleted successfully!');
        onCategoryUpdated();
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setEditName(category.name);
  };

  const handleSave = async (id) => {
    if (!editName.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    try {
      await updateCategory(id, { name: editName, type });
      toast.success('Category updated successfully!');
      setEditingId(null);
      onCategoryUpdated();
    } catch (error) {
      toast.error('Failed to update category');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName('');
  };

  if (filteredCategories.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl">
        <div className="text-4xl mb-3">📂</div>
        <p className="text-gray-500">No {type} categories yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredCategories.map((category) => (
        <div
          key={category._id}
          className={`flex items-center justify-between p-4 rounded-xl border-l-4 bg-gray-50 hover:bg-gray-100 transition-all duration-300 ${
            type === 'income' ? 'border-green-500' : 'border-red-500'
          }`}
        >
          {editingId === category._id ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-primary-500 rounded-lg focus:outline-none"
              />
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleSave(category._id)}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaSave />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-800 text-lg">
                  {category.name}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    type === 'income'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {type}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors hover:scale-110"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors hover:scale-110"
                >
                  <FaTrash />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;