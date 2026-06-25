const express = require('express');
const router = express.Router();
const dietController = require('../controllers/dietController');
const { authenticate } = require('../middleware/auth');

// Meal routes
router.post('/log-meal', authenticate, dietController.logMeal);
router.get('/today', authenticate, dietController.getDailySummary);

// Diet template routes
router.get('/templates/all', authenticate, dietController.getDietTemplates);
router.get('/templates/:id', authenticate, dietController.getDietTemplateById);
router.post('/templates/create', authenticate, dietController.createDietTemplate);
router.get('/user-templates/all', authenticate, dietController.getUserTemplates);

// Analytics and goals
router.post('/calorie-goal', authenticate, dietController.updateCalorieGoal);
router.get('/analytics/nutrition', authenticate, dietController.getNutritionAnalytics);
router.post('/water/log', authenticate, dietController.logWaterIntake);

module.exports = router;
