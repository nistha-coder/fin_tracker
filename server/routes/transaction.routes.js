const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  getRecentTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transaction.controller');

// GET /api/transactions - Get all transactions
router.get('/', getAllTransactions);

// GET /api/transactions/recent - Get recent transactions
router.get('/recent', getRecentTransactions);

// GET /api/transactions/:id - Get a single transaction
router.get('/:id', getTransactionById);

// POST /api/transactions - Create a new transaction
router.post('/', createTransaction);

// PUT /api/transactions/:id - Update a transaction
router.put('/:id', updateTransaction);

// DELETE /api/transactions/:id - Delete a transaction
router.delete('/:id', deleteTransaction);

module.exports = router;