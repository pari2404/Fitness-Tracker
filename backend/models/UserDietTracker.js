const mongoose = require('mongoose');

const userDietTrackerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dailyGoal: {
    calories: {
      type: Number,
      default: 2000
    },
    protein: {
      type: Number,
      default: 150 // grams
    },
    carbohydrates: {
      type: Number,
      default: 250 // grams
    },
    fats: {
      type: Number,
      default: 65 // grams
    },
    fiber: {
      type: Number,
      default: 30 // grams
    }
  },
  consumed: {
    calories: {
      type: Number,
      default: 0
    },
    protein: {
      type: Number,
      default: 0
    },
    carbohydrates: {
      type: Number,
      default: 0
    },
    fats: {
      type: Number,
      default: 0
    },
    fiber: {
      type: Number,
      default: 0
    }
  },
  meals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }],
  caloriesBurned: {
    type: Number,
    default: 0
  },
  netCalories: {
    type: Number,
    default: 0
  },
  waterIntake: {
    type: Number,
    default: 0 // in milliliters
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userDietTrackerSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('UserDietTracker', userDietTrackerSchema);
