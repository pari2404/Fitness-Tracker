const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.get('/', workoutController.getAllWorkouts);
router.get('/:id', workoutController.getWorkoutById);

// Protected routes
router.post('/create', authenticate, workoutController.createWorkout);
router.put('/:id', authenticate, workoutController.updateWorkout);
router.post('/start', authenticate, workoutController.startWorkout);
router.post('/complete', authenticate, workoutController.completeWorkout);
router.get('/history/all', authenticate, workoutController.getUserWorkoutHistory);

module.exports = router;
