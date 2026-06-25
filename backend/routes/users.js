const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// All routes are protected
router.get('/profile', authenticate, userController.getUserProfile);
router.put('/profile', authenticate, userController.updateUserProfile);
router.put('/preferences', authenticate, userController.updatePreferences);
router.get('/statistics', authenticate, userController.getUserStatistics);
router.put('/profile-image', authenticate, userController.updateProfileImage);

module.exports = router;
