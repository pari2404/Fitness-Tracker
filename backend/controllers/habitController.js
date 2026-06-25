const Habit = require('../models/Habit');
const HabitLog = require('../models/HabitLog');

// Create habit
exports.createHabit = async (req, res) => {
  try {
    const { name, description, category, frequency, reminderTime, color } = req.body;

    const habit = new Habit({
      userId: req.userId,
      name,
      description,
      category,
      frequency,
      reminderTime,
      color
    });

    await habit.save();

    res.status(201).json({
      message: 'Habit created successfully',
      habit
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all habits for user
exports.getUserHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId, isActive: true });

    res.status(200).json({ habits });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get habit by ID
exports.getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    res.status(200).json({ habit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update habit
exports.updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const habit = await Habit.findByIdAndUpdate(id, updates, { new: true });
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    res.status(200).json({
      message: 'Habit updated successfully',
      habit
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Log habit completion
exports.logHabitCompletion = async (req, res) => {
  try {
    const { habitId, status = 'Completed', notes } = req.body;

    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    // Check if already logged today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await HabitLog.findOne({
      habitId,
      userId: req.userId,
      date: { $gte: today }
    });

    if (existingLog) {
      return res.status(400).json({ error: 'Habit already logged for today' });
    }

    const habitLog = new HabitLog({
      habitId,
      userId: req.userId,
      status,
      notes,
      completedAt: new Date()
    });

    await habitLog.save();

    // Update habit streak
    if (status === 'Completed') {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayLog = await HabitLog.findOne({
        habitId,
        userId: req.userId,
        date: { $gte: yesterday, $lt: today }
      });

      if (yesterdayLog && yesterdayLog.status === 'Completed') {
        habit.currentStreak += 1;
      } else {
        habit.currentStreak = 1;
      }

      habit.totalCompletions += 1;

      if (habit.currentStreak > habit.longestStreak) {
        habit.longestStreak = habit.currentStreak;
      }
    }

    await habit.save();

    res.status(201).json({
      message: 'Habit logged successfully',
      habitLog,
      habit
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get habit logs for a period
exports.getHabitLogs = async (req, res) => {
  try {
    const { habitId, startDate, endDate } = req.query;

    const logs = await HabitLog.find({
      habitId,
      userId: req.userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1 });

    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get habit statistics
exports.getHabitStats = async (req, res) => {
  try {
    const { habitId } = req.params;

    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    const completionRate = habit.totalCompletions > 0
      ? Math.round((habit.totalCompletions / Math.ceil((new Date() - habit.startDate) / (1000 * 60 * 60 * 24))) * 100)
      : 0;

    res.status(200).json({
      habitName: habit.name,
      currentStreak: habit.currentStreak,
      longestStreak: habit.longestStreak,
      totalCompletions: habit.totalCompletions,
      completionRate: completionRate + '%',
      startDate: habit.startDate
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete habit
exports.deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
