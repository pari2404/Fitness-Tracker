// Calculate BMI
const calculateBMI = (height, weight) => {
  if (height && weight) {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  }
  return null;
};

// Get BMI category
const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

// Calculate daily calorie requirement (Basal Metabolic Rate)
const calculateBMR = (age, gender, height, weight) => {
  if (gender === 'Male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

// Calculate TDEE (Total Daily Energy Expenditure)
const calculateTDEE = (bmr, activityLevel) => {
  const activityMultiplier = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'very-active': 1.725,
    'extremely-active': 1.9
  };
  return (bmr * (activityMultiplier[activityLevel] || 1.55)).toFixed(0);
};

// Format date to YYYY-MM-DD
const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

module.exports = {
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  formatDate
};
