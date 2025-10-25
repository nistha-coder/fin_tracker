//category.controller.js
const Category = require('../models/category.model');

// Get all categories (for logged-in user only)
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id })
      .sort({ type: 1, name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get categories by type (for logged-in user only)
const getCategoriesByType = async (req, res) => {
  try {
    const { type } = req.params;
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid type. Must be "income" or "expense"' 
      });
    }
    
    const categories = await Category.find({ 
      type, 
      user: req.user.id 
    }).sort({ name: 1 });
    
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    // Check if category already exists for this user
    const existingCategory = await Category.findOne({ 
      name: { $regex: new RegExp('^${name}$', 'i') }, 
      type,
      user: req.user.id // CHECK ONLY IN USER'S CATEGORIES
    });

    if (existingCategory) {
      return res.status(400).json({ 
        success: false, 
        message: 'Category with this name already exists' 
      });
    }

    const category = await Category.create({ 
      name, 
      type,
      user: req.user.id // ADD USER
    });
    
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a category (only if it belongs to the user)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;

    const category = await Category.findOneAndUpdate(
      { _id: id, user: req.user.id }, // FILTER BY USER
      { name, type },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a category (only if it belongs to the user)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOneAndDelete({ 
      _id: id, 
      user: req.user.id 
    });

    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Category deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoriesByType,
  createCategory,
  updateCategory,
  deleteCategory,
};