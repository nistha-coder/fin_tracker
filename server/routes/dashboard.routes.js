const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getIncomeExpenseOverTime,
} = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');

// All routes are protected - require authentication
router.use(protect);

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', getDashboardStats);

// GET /api/dashboard/income-expense - Get income vs expense over time
router.get('/income-expense', getIncomeExpenseOverTime);

module.exports = router;