const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, height, weight, fitnessGoal, experienceLevel, phoneNumber } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        firstName,
        lastName,
        age,
        gender,
        height,
        weight,
        fitnessGoal,
        experienceLevel,
        phoneNumber,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user preferences
exports.updatePreferences = async (req, res) => {
  try {
    const { notifications, emailUpdates, theme, language } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        'preferences.notifications': notifications,
        'preferences.emailUpdates': emailUpdates,
        'preferences.theme': theme,
        'preferences.language': language
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Preferences updated',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user statistics
exports.getUserStatistics = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      statistics: {
        totalWorkouts: user.statistics.totalWorkouts,
        totalMinutes: user.statistics.totalMinutes,
        caloriesBurned: user.statistics.caloriesBurned,
        streakDays: user.statistics.streakDays
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile image
exports.updateProfileImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { profileImage: imageUrl },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile image updated',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
