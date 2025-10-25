//category.model.js

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Category type is required'],
      enum: ['income', 'expense'],
    },
    // ADD USER FIELD
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
categorySchema.index({ type: 1 });
categorySchema.index({ user: 1 }); // ADD INDEX FOR USER

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;