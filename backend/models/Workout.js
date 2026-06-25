const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
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
    enum: ['Cardio', 'Strength', 'Flexibility', 'HIIT', 'Yoga', 'Mixed'],
    default: 'Mixed'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  exercises: [{
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    },
    sets: Number,
    reps: Number,
    duration: Number,
    restPeriod: Number
  }],
  duration: {
    type: Number, // in minutes
    required: true
  },
  caloriesBurned: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  videoUrl: String,
  frequency: {
    type: String,
    enum: ['One Time', 'Daily', '3x Week', '5x Week', 'Custom'],
    default: 'One Time'
  },
  isCustom: {
    type: Boolean,
    default: false
  },
  isActive: {
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

module.exports = mongoose.model('Workout', workoutSchema);
