const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Pre-Workout', 'Post-Workout'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  foods: [{
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    },
    quantity: {
      type: Number,
      default: 1
    },
    unit: {
      type: String,
      enum: ['g', 'oz', 'cup', 'piece', 'serving', 'ml'],
      default: 'g'
    }
  }],
  totalCalories: {
    type: Number,
    default: 0
  },
  totalProtein: {
    type: Number,
    default: 0
  },
  totalCarbs: {
    type: Number,
    default: 0
  },
  totalFats: {
    type: Number,
    default: 0
  },
  notes: String,
  time: String, // Format: "HH:MM"
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

mealSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('Meal', mealSchema);
