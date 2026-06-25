const Food = require('../models/Food');
const Meal = require('../models/Meal');
const DietTemplate = require('../models/DietTemplate');
const UserDietTracker = require('../models/UserDietTracker');

// Log meal
exports.logMeal = async (req, res) => {
  try {
    const { mealType, foods, notes, time } = req.body;

    // Calculate total nutrition
    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0;

    for (let food of foods) {
      const foodItem = await Food.findById(food.foodId);
      if (foodItem) {
        const quantity = food.quantity || 1;
        totalCalories += foodItem.calories * quantity;
        totalProtein += (foodItem.protein || 0) * quantity;
        totalCarbs += (foodItem.carbohydrates || 0) * quantity;
        totalFats += (foodItem.fats || 0) * quantity;
      }
    }

    const meal = new Meal({
      userId: req.userId,
      mealType,
      foods,
      totalCalories: Math.round(totalCalories),
      totalProtein: Math.round(totalProtein),
      totalCarbs: Math.round(totalCarbs),
      totalFats: Math.round(totalFats),
      notes,
      time
    });

    await meal.save();
    await meal.populate('foods.foodId');

    // Update daily tracker
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let tracker = await UserDietTracker.findOne({
      userId: req.userId,
      date: { $gte: today }
    });

    if (!tracker) {
      tracker = new UserDietTracker({
        userId: req.userId,
        date: new Date()
      });
    }

    tracker.consumed.calories += totalCalories;
    tracker.consumed.protein += totalProtein;
    tracker.consumed.carbohydrates += totalCarbs;
    tracker.consumed.fats += totalFats;
    tracker.meals.push(meal._id);

    await tracker.save();

    res.status(201).json({
      message: 'Meal logged successfully',
      meal,
      tracker
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get daily diet summary
exports.getDailySummary = async (req, res) => {
  try {
    const { date } = req.query;
    const queryDate = new Date(date || new Date());
    queryDate.setHours(0, 0, 0, 0);

    const tracker = await UserDietTracker.findOne({
      userId: req.userId,
      date: { $gte: queryDate }
    }).populate('meals');

    if (!tracker) {
      return res.status(200).json({
        message: 'No data for this date',
        tracker: {
          dailyGoal: { calories: 2000, protein: 150, carbohydrates: 250, fats: 65, fiber: 30 },
          consumed: { calories: 0, protein: 0, carbohydrates: 0, fats: 0, fiber: 0 },
          meals: [],
          remaining: { calories: 2000, protein: 150, carbohydrates: 250, fats: 65 }
        }
      });
    }

    const remaining = {
      calories: tracker.dailyGoal.calories - tracker.consumed.calories,
      protein: tracker.dailyGoal.protein - tracker.consumed.protein,
      carbohydrates: tracker.dailyGoal.carbohydrates - tracker.consumed.carbohydrates,
      fats: tracker.dailyGoal.fats - tracker.consumed.fats
    };

    res.status(200).json({ tracker, remaining });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all diet templates
exports.getDietTemplates = async (req, res) => {
  try {
    const { goal, dietType, page = 1, limit = 10 } = req.query;
    let filter = { isPublished: true };

    if (goal) filter.goal = goal;
    if (dietType) filter.dietType = dietType;

    const templates = await DietTemplate.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await DietTemplate.countDocuments(filter);

    res.status(200).json({
      templates,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get diet template by ID
exports.getDietTemplateById = async (req, res) => {
  try {
    const template = await DietTemplate.findById(req.params.id).populate('meals.mealPlan.foods.foodId');
    if (!template) {
      return res.status(404).json({ error: 'Diet template not found' });
    }
    res.status(200).json({ template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create custom diet template
exports.createDietTemplate = async (req, res) => {
  try {
    const { name, description, goal, dietType, dailyCalories, macroSplit, meals, duration } = req.body;

    const template = new DietTemplate({
      name,
      description,
      goal,
      dietType,
      dailyCalories,
      macroSplit,
      meals,
      duration,
      userId: req.userId,
      isCustom: true,
      isPublished: false
    });

    await template.save();

    res.status(201).json({
      message: 'Diet template created successfully',
      template
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's custom templates
exports.getUserTemplates = async (req, res) => {
  try {
    const templates = await DietTemplate.find({
      userId: req.userId,
      isCustom: true
    });

    res.status(200).json({ templates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update daily calorie goal
exports.updateCalorieGoal = async (req, res) => {
  try {
    const { calories } = req.body;
    const User = require('../models/User');
    const user = await User.findByIdAndUpdate(
      req.userId,
      { dailyCalorieGoal: calories },
      { new: true }
    );

    res.status(200).json({
      message: 'Calorie goal updated',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get nutrition analytics
exports.getNutritionAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const trackers = await UserDietTracker.find({
      userId: req.userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });

    if (trackers.length === 0) {
      return res.status(200).json({ message: 'No data for this period', analytics: {} });
    }

    const avgCalories = Math.round(trackers.reduce((sum, t) => sum + t.consumed.calories, 0) / trackers.length);
    const avgProtein = Math.round(trackers.reduce((sum, t) => sum + t.consumed.protein, 0) / trackers.length);
    const avgCarbs = Math.round(trackers.reduce((sum, t) => sum + t.consumed.carbohydrates, 0) / trackers.length);
    const avgFats = Math.round(trackers.reduce((sum, t) => sum + t.consumed.fats, 0) / trackers.length);

    res.status(200).json({
      analytics: {
        averageCalories: avgCalories,
        averageProtein: avgProtein,
        averageCarbs: avgCarbs,
        averageFats: avgFats,
        daysTracked: trackers.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Log water intake
exports.logWaterIntake = async (req, res) => {
  try {
    const { quantity } = req.body; // in ml
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let tracker = await UserDietTracker.findOne({
      userId: req.userId,
      date: { $gte: today }
    });

    if (!tracker) {
      tracker = new UserDietTracker({
        userId: req.userId,
        date: new Date()
      });
    }

    tracker.waterIntake += quantity;
    await tracker.save();

    res.status(200).json({
      message: 'Water intake logged',
      tracker
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
