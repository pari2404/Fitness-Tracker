const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String,
    default: null
  },
  age: {
    type: Number,
    min: 13,
    max: 120
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Other'
  },
  height: {
    type: Number, // in cm
    default: null
  },
  weight: {
    type: Number, // in kg
    default: null
  },
  fitnessGoal: {
    type: String,
    enum: ['Weight Loss', 'Muscle Gain', 'General Fitness', 'Endurance', 'Flexibility'],
    default: 'General Fitness'
  },
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  dailyCalorieGoal: {
    type: Number,
    default: 2000
  },
  preferences: {
    notifications: { type: Boolean, default: true },
    emailUpdates: { type: Boolean, default: true },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, default: 'en' }
  },
  statistics: {
    totalWorkouts: { type: Number, default: 0 },
    totalMinutes: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});

module.exports = mongoose.model('User', userSchema);
