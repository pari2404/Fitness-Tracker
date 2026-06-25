const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: String,
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    default: 0 // in grams
  },
  carbohydrates: {
    type: Number,
    default: 0 // in grams
  },
  fats: {
    type: Number,
    default: 0 // in grams
  },
  fiber: {
    type: Number,
    default: 0 // in grams
  },
  sugar: {
    type: Number,
    default: 0 // in grams
  },
  servingSize: {
    type: String,
    default: '100g'
  },
  category: {
    type: String,
    enum: ['Fruits', 'Vegetables', 'Grains', 'Protein', 'Dairy', 'Fats', 'Snacks', 'Beverages', 'Other'],
    default: 'Other'
  },
  imageUrl: String,
  isCustom: {
    type: Boolean,
    default: false
  },
  userId: mongoose.Schema.Types.ObjectId, // null for default foods
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Food', foodSchema);
