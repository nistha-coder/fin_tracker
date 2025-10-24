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
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
categorySchema.index({ type: 1 });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;