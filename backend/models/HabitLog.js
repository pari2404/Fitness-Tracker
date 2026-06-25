const mongoose = require('mongoose');

const habitLogSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Completed', 'Skipped', 'Failed'],
    default: 'Completed'
  },
  notes: String,
  timeLogged: String, // Format: "HH:MM",
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

habitLogSchema.index({ habitId: 1, date: 1 });
habitLogSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('HabitLog', habitLogSchema);
