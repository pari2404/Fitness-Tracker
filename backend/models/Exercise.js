const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  targetMuscles: [{
    type: String,
    enum: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Forearms', 'Abs', 'Obliques', 'Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Full Body']
  }],
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: {
    type: Number, // in seconds
    required: true
  },
  calories: {
    type: Number,
    default: 0
  },
  videoUrl: String,
  imageUrl: String,
  instructions: [String],
  equipment: [String], // Empty array for no equipment
  reps: Number,
  sets: Number,
  restPeriod: Number, // in seconds
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exercise', exerciseSchema);
