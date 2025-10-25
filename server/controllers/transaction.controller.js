//transaction.controller.js

const Transaction = require('../models/transaction.model');

// Get all transactions (for logged-in user only)
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .populate('category', 'name type')
      .sort({ date: -1 });
    
    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get recent transactions (limited, for logged-in user only)
const getRecentTransactions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const transactions = await Transaction.find({ user: req.user.id })
      .populate('category', 'name type')
      .sort({ date: -1 })
      .limit(limit);
    
    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get transaction by ID (only if it belongs to the user)
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const transaction = await Transaction.findOne({ 
      _id: id, 
      user: req.user.id 
    }).populate('category', 'name type');
    
    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }
    
    res.json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { description, amount, type, date, category } = req.body;

    // Store amount as positive for income, negative for expense
    const finalAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);

    const transaction = await Transaction.create({
      description,
      amount: finalAmount,
      type,
      date: date || new Date(),
      category,
      user: req.user.id, // ADD USER FROM AUTH MIDDLEWARE
    });

    const populatedTransaction = await Transaction.findById(transaction._id)
      .populate('category', 'name type');

    res.status(201).json({ success: true, data: populatedTransaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a transaction (only if it belongs to the user)
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, type, date, category } = req.body;

    // Store amount as positive for income, negative for expense
    const finalAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, user: req.user.id }, // FILTER BY USER
      { description, amount: finalAmount, type, date, category },
      { new: true, runValidators: true }
    ).populate('category', 'name type');

    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }

    res.json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a transaction (only if it belongs to the user)
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({ 
      _id: id, 
      user: req.user.id 
    });

    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Transaction deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllTransactions,
  getRecentTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};