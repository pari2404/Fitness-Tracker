const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  category: {
    type: String,
    enum: ['Health', 'Fitness', 'Nutrition', 'Sleep', 'Meditation', 'Reading', 'Hydration', 'Custom'],
    default: 'Custom'
  },
  icon: String,
  color: {
    type: String,
    default: '#3498db'
  },
  frequency: {
    type: String,
    enum: ['Daily', '3x Week', '5x Week', 'Weekly', 'Custom'],
    default: 'Daily'
  },
  targetDays: [{
    type: Number, // 0 = Sunday, 1 = Monday, etc.
    min: 0,
    max: 6
  }],
  reminderTime: String, // Format: "HH:MM"
  startDate: {
    type: Date,
    default: Date.now
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  totalCompletions: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notificationsEnabled: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('Habit', habitSchema);
