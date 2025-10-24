const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoriesByType,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');

// GET /api/categories - Get all categories
router.get('/', getAllCategories);

// GET /api/categories/:type - Get categories by type (income or expense)
router.get('/:type', getCategoriesByType);

// POST /api/categories - Create a new category
router.post('/', createCategory);

// PUT /api/categories/:id - Update a category
router.put('/:id', updateCategory);

// DELETE /api/categories/:id - Delete a category
router.delete('/:id', deleteCategory);

module.exports = router;