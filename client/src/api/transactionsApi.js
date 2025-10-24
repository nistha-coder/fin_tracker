import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all transactions
export const getAllTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get recent transactions
export const getRecentTransactions = async (limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/transactions/recent?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get transaction by ID
export const getTransactionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new transaction
export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, transactionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a transaction
export const updateTransaction = async (id, transactionData) => {
  try {
    const response = await axios.put(`${API_URL}/transactions/${id}`, transactionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a transaction
export const deleteTransaction = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get dashboard stats
export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/stats`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};