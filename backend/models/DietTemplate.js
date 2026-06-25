const mongoose = require('mongoose');

const dietTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  goal: {
    type: String,
    enum: ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Athletic Performance', 'Health Improvement'],
    required: true
  },
  dietType: {
    type: String,
    enum: ['Balanced', 'Low-Carb', 'High-Protein', 'Keto', 'Vegetarian', 'Vegan', 'Paleo', 'Mediterranean'],
    default: 'Balanced'
  },
  dailyCalories: {
    type: Number,
    required: true
  },
  macroSplit: {
    protein: {
      type: Number, // percentage
      default: 30
    },
    carbohydrates: {
      type: Number, // percentage
      default: 40
    },
    fats: {
      type: Number, // percentage
      default: 30
    }
  },
  meals: [{
    mealType: String,
    mealPlan: [{
      day: {
        type: Number, // 1-7
        min: 1,
        max: 7
      },
      foods: [{
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food'
        },
        quantity: Number,
        unit: String
      }]
    }]
  }],
  duration: {
    type: String,
    enum: ['1 Week', '2 Weeks', '1 Month', '3 Months', 'Custom'],
    default: '1 Week'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Challenging'],
    default: 'Moderate'
  },
  cuisineType: [String], // e.g., ['Italian', 'Asian', 'Mexican']
  isPublished: {
    type: Boolean,
    default: false
  },
  isCustom: {
    type: Boolean,
    default: false
  },
  userId: mongoose.Schema.Types.ObjectId, // null for default templates
  imageUrl: String,
  reviews: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DietTemplate', dietTemplateSchema);
