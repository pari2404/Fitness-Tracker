// Script to seed initial data into the database
// Run with: node backend/seeds/seedData.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');
const Food = require('../models/Food');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/magic-fitness');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedExercises = async () => {
  const exercises = [
    {
      name: 'Push-ups',
      description: 'Classic upper body exercise',
      targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
      difficulty: 'Beginner',
      duration: 30,
      calories: 5,
      instructions: [
        'Place hands shoulder-width apart',
        'Lower body until chest nearly touches floor',
        'Push back up to starting position'
      ],
      equipment: [],
      reps: 15,
      sets: 3
    },
    {
      name: 'Squats',
      description: 'Lower body strength exercise',
      targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
      difficulty: 'Beginner',
      duration: 30,
      calories: 8,
      instructions: [
        'Stand with feet shoulder-width apart',
        'Lower hips back and down',
        'Push through heels to return to start'
      ],
      equipment: [],
      reps: 20,
      sets: 3
    },
    {
      name: 'Plank',
      description: 'Core strengthening exercise',
      targetMuscles: ['Abs', 'Core'],
      difficulty: 'Beginner',
      duration: 45,
      calories: 3,
      instructions: [
        'Place forearms on ground',
        'Keep body in straight line',
        'Hold position for time'
      ],
      equipment: [],
      reps: 1,
      sets: 3
    },
    {
      name: 'Burpees',
      description: 'Full body HIIT exercise',
      targetMuscles: ['Full Body'],
      difficulty: 'Advanced',
      duration: 60,
      calories: 15,
      instructions: [
        'Start in standing position',
        'Drop to plank',
        'Do a push-up',
        'Jump feet to hands',
        'Jump up with arms overhead'
      ],
      equipment: [],
      reps: 10,
      sets: 3
    },
    {
      name: 'Mountain Climbers',
      description: 'Cardio and core exercise',
      targetMuscles: ['Chest', 'Abs', 'Quads'],
      difficulty: 'Intermediate',
      duration: 45,
      calories: 10,
      instructions: [
        'Start in plank position',
        'Alternate driving knees to chest',
        'Move at fast pace'
      ],
      equipment: [],
      reps: 30,
      sets: 3
    }
  ];

  await Exercise.deleteMany({});
  const createdExercises = await Exercise.insertMany(exercises);
  console.log(`Seeded ${createdExercises.length} exercises`);
  return createdExercises;
};

const seedFoods = async () => {
  const foods = [
    { name: 'Chicken Breast', category: 'Protein', calories: 165, protein: 31, carbohydrates: 0, fats: 3.6 },
    { name: 'Brown Rice', category: 'Grains', calories: 111, protein: 2.6, carbohydrates: 23, fats: 0.9 },
    { name: 'Broccoli', category: 'Vegetables', calories: 34, protein: 2.8, carbohydrates: 7, fats: 0.4 },
    { name: 'Egg', category: 'Protein', calories: 155, protein: 13, carbohydrates: 1.1, fats: 11 },
    { name: 'Banana', category: 'Fruits', calories: 89, protein: 1.1, carbohydrates: 23, fats: 0.3 },
    { name: 'Salmon', category: 'Protein', calories: 208, protein: 20, carbohydrates: 0, fats: 13 },
    { name: 'Sweet Potato', category: 'Vegetables', calories: 86, protein: 1.6, carbohydrates: 20, fats: 0.1 },
    { name: 'Almonds', category: 'Fats', calories: 579, protein: 21, carbohydrates: 22, fats: 50 },
    { name: 'Oats', category: 'Grains', calories: 389, protein: 17, carbohydrates: 66, fats: 6.9 },
    { name: 'Greek Yogurt', category: 'Dairy', calories: 59, protein: 10, carbohydrates: 3.3, fats: 0.4 }
  ];

  await Food.deleteMany({});
  const createdFoods = await Food.insertMany(foods);
  console.log(`Seeded ${createdFoods.length} foods`);
  return createdFoods;
};

const seedWorkouts = async (exercises) => {
  const workouts = [
    {
      name: 'Beginner Full Body',
      description: 'Perfect for beginners starting their fitness journey',
      category: 'Mixed',
      difficulty: 'Beginner',
      exercises: [
        { exerciseId: exercises[0]._id, sets: 3, reps: 10, duration: 30 },
        { exerciseId: exercises[1]._id, sets: 3, reps: 15, duration: 30 },
        { exerciseId: exercises[2]._id, sets: 3, reps: 1, duration: 45 }
      ],
      duration: 30,
      caloriesBurned: 150,
      frequency: '3x Week'
    },
    {
      name: 'HIIT Cardio Blast',
      description: 'High-intensity interval training for maximum results',
      category: 'HIIT',
      difficulty: 'Advanced',
      exercises: [
        { exerciseId: exercises[3]._id, sets: 3, reps: 10, duration: 60 },
        { exerciseId: exercises[4]._id, sets: 3, reps: 30, duration: 45 },
        { exerciseId: exercises[0]._id, sets: 3, reps: 15, duration: 30 }
      ],
      duration: 20,
      caloriesBurned: 250,
      frequency: '3x Week'
    }
  ];

  await Workout.deleteMany({});
  const createdWorkouts = await Workout.insertMany(workouts);
  console.log(`Seeded ${createdWorkouts.length} workouts`);
};

const seedUsers = async () => {
  const users = [
    {
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@example.com',
      password: await bcrypt.hash('password123', 10),
      fitnessGoal: 'Weight Loss',
      experienceLevel: 'Beginner',
      age: 28,
      gender: 'Male',
      height: 175,
      weight: 85,
      dailyCalorieGoal: 2000
    }
  ];

  await User.deleteMany({});
  const createdUsers = await User.insertMany(users);
  console.log(`Seeded ${createdUsers.length} users`);
};

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Starting database seeding...');

    const exercises = await seedExercises();
    await seedFoods();
    await seedWorkouts(exercises);
    await seedUsers();

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
