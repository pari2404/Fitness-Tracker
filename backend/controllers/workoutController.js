const Workout = require('../models/Workout');
const WorkoutProgress = require('../models/WorkoutProgress');
const Exercise = require('../models/Exercise');

// Get all workouts
exports.getAllWorkouts = async (req, res) => {
  try {
    const { difficulty, category, page = 1, limit = 10 } = req.query;
    let filter = { isActive: true };

    if (difficulty) filter.difficulty = difficulty;
    if (category) filter.category = category;

    const workouts = await Workout.find(filter)
      .populate('exercises.exerciseId')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Workout.countDocuments(filter);

    res.status(200).json({
      workouts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get workout by ID
exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('exercises.exerciseId');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json({ workout });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create workout
exports.createWorkout = async (req, res) => {
  try {
    const { name, description, category, difficulty, exercises, duration, imageUrl } = req.body;

    const workout = new Workout({
      userId: req.userId,
      name,
      description,
      category,
      difficulty,
      exercises,
      duration,
      imageUrl,
      isCustom: true
    });

    await workout.save();
    await workout.populate('exercises.exerciseId');

    res.status(201).json({
      message: 'Workout created successfully',
      workout
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update workout
exports.updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const workout = await Workout.findByIdAndUpdate(id, updates, { new: true }).populate('exercises.exerciseId');

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({
      message: 'Workout updated successfully',
      workout
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Start workout
exports.startWorkout = async (req, res) => {
  try {
    const { workoutId } = req.body;

    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    const workoutProgress = new WorkoutProgress({
      userId: req.userId,
      workoutId,
      startTime: new Date(),
      status: 'In Progress'
    });

    await workoutProgress.save();

    res.status(201).json({
      message: 'Workout started',
      workoutProgress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete workout
exports.completeWorkout = async (req, res) => {
  try {
    const { progressId, caloriesBurned, notes } = req.body;

    const workoutProgress = await WorkoutProgress.findById(progressId);
    if (!workoutProgress) {
      return res.status(404).json({ error: 'Workout progress not found' });
    }

    workoutProgress.endTime = new Date();
    workoutProgress.duration = Math.floor((workoutProgress.endTime - workoutProgress.startTime) / 60000);
    workoutProgress.caloriesBurned = caloriesBurned || workoutProgress.caloriesBurned;
    workoutProgress.status = 'Completed';
    workoutProgress.completedAt = new Date();
    workoutProgress.notes = notes;

    await workoutProgress.save();

    // Update user statistics
    const User = require('../models/User');
    const user = await User.findById(req.userId);
    user.statistics.totalWorkouts += 1;
    user.statistics.totalMinutes += workoutProgress.duration;
    user.statistics.caloriesBurned += workoutProgress.caloriesBurned;
    await user.save();

    res.status(200).json({
      message: 'Workout completed',
      workoutProgress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's workout history
exports.getUserWorkoutHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const history = await WorkoutProgress.find({ userId: req.userId })
      .populate('workoutId')
      .sort({ completedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await WorkoutProgress.countDocuments({ userId: req.userId });

    res.status(200).json({
      history,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
