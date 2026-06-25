const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const { authenticate } = require('../middleware/auth');

// All routes are protected
router.post('/create', authenticate, habitController.createHabit);
router.get('/all', authenticate, habitController.getUserHabits);
router.get('/:id', authenticate, habitController.getHabitById);
router.put('/:id', authenticate, habitController.updateHabit);
router.post('/:id/log', authenticate, habitController.logHabitCompletion);
router.get('/:id/logs', authenticate, habitController.getHabitLogs);
router.get('/:id/stats', authenticate, habitController.getHabitStats);
router.delete('/:id', authenticate, habitController.deleteHabit);

module.exports = router;
