const mongoose = require('mongoose');

const workoutProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  duration: {
    type: Number, // in minutes
    default: 0
  },
  caloriesBurned: {
    type: Number,
    default: 0
  },
  exercisesCompleted: [{
    exerciseId: mongoose.Schema.Types.ObjectId,
    setsCompleted: Number,
    repsCompleted: Number,
    duration: Number,
    status: {
      type: String,
      enum: ['In Progress', 'Completed', 'Skipped'],
      default: 'In Progress'
    }
  }],
  status: {
    type: String,
    enum: ['In Progress', 'Completed', 'Abandoned'],
    default: 'In Progress'
  },
  notes: String,
  difficulty: String,
  completedAt: Date
});

module.exports = mongoose.model('WorkoutProgress', workoutProgressSchema);
