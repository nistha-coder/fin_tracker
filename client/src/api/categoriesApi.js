import api from './axiosConfig';

const API_URL = 'http://localhost:5000/api';

// Get all categories
export const getAllCategories = async () => {
  try {
    const response = await api.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get categories by type (income or expense)
export const getCategoriesByType = async (type) => {
  try {
    const response = await api.get(`${API_URL}/categories/${type}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await api.post(`${API_URL}/categories`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a category
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`${API_URL}/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};