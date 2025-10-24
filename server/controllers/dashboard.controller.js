const Transaction = require('../models/transaction.model');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Get current month start and end dates
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // Get all-time total balance
    const allTransactions = await Transaction.find();
    const totalBalance = allTransactions.reduce((sum, t) => sum + t.amount, 0);

    // Get month-to-date income
    const monthlyIncome = await Transaction.aggregate([
      {
        $match: {
          type: 'income',
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    // Get month-to-date expenses
    const monthlyExpenses = await Transaction.aggregate([
      {
        $match: {
          type: 'expense',
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    // Get spending by category for the month
    const spendingByCategory = await Transaction.aggregate([
      {
        $match: {
          type: 'expense',
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: { $abs: '$amount' } },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryInfo',
        },
      },
      {
        $unwind: '$categoryInfo',
      },
      {
        $project: {
          _id: 1,
          name: '$categoryInfo.name',
          total: 1,
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalBalance,
        monthlyIncome: monthlyIncome[0]?.total || 0,
        monthlyExpenses: Math.abs(monthlyExpenses[0]?.total || 0),
        spendingByCategory,
        month: {
          start: startOfMonth,
          end: endOfMonth,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get income vs expense over time (for charts)
const getIncomeExpenseOverTime = async (req, res) => {
  try {
    const { months = 6 } = req.query;
    
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - parseInt(months));

    const data = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: monthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            type: '$type',
          },
          total: { $sum: { $abs: '$amount' } },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getIncomeExpenseOverTime,
};