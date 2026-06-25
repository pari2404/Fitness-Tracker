import React, { useEffect, useState } from 'react';
import { FaAppleAlt, FaPlus, FaChartPie, FaWater } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../services/api';
import { toast } from 'react-toastify';

const DietPage = () => {
  const [dietData, setDietData] = useState(null);
  const [meals, setMeals] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMealForm, setShowMealForm] = useState(false);
  const [mealForm, setMealForm] = useState({
    mealType: 'Breakfast',
    foods: [],
    notes: '',
    time: new Date().toTimeString().slice(0, 5)
  });

  useEffect(() => {
    fetchDietData();
    fetchTemplates();
  }, []);

  const fetchDietData = async () => {
    try {
      const response = await apiClient.get('/diet/today');
      setDietData(response);
      if (response.tracker) {
        setMeals(response.tracker.meals || []);
      }
    } catch (error) {
      toast.error('Error fetching diet data');
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await apiClient.get('/diet/templates/all');
      setTemplates(response.templates);
    } catch (error) {
      console.error('Error fetching templates');
    }
  };

  const calculatePercentage = (consumed, goal) => {
    if (!goal) return 0;
    return Math.round((consumed / goal) * 100);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Diet Tracker</h1>
            <button
              onClick={() => setShowMealForm(!showMealForm)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition"
            >
              <FaPlus /> Log Meal
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading diet data...</p>
            </div>
          ) : (
            <>
              {/* Nutrition Summary */}
              {dietData?.tracker && (
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Today's Nutrition Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Calories */}
                    <div className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="8"
                            strokeDasharray={`${calculatePercentage(dietData.tracker.consumed.calories, dietData.tracker.dailyGoal.calories) * 2.827} 282.7`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold">{calculatePercentage(dietData.tracker.consumed.calories, dietData.tracker.dailyGoal.calories)}%</span>
                        </div>
                      </div>
                      <p className="text-gray-600 font-semibold">Calories</p>
                      <p className="text-sm text-gray-500">{dietData.tracker.consumed.calories} / {dietData.tracker.dailyGoal.calories}</p>
                    </div>

                    {/* Protein */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{dietData.tracker.consumed.protein}g</div>
                      <p className="text-gray-600 font-semibold">Protein</p>
                      <p className="text-sm text-gray-500">Goal: {dietData.tracker.dailyGoal.protein}g</p>
                    </div>

                    {/* Carbs */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">{dietData.tracker.consumed.carbohydrates}g</div>
                      <p className="text-gray-600 font-semibold">Carbs</p>
                      <p className="text-sm text-gray-500">Goal: {dietData.tracker.dailyGoal.carbohydrates}g</p>
                    </div>

                    {/* Fats */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600 mb-2">{dietData.tracker.consumed.fats}g</div>
                      <p className="text-gray-600 font-semibold">Fats</p>
                      <p className="text-sm text-gray-500">Goal: {dietData.tracker.dailyGoal.fats}g</p>
                    </div>

                    {/* Water */}
                    <div className="text-center">
                      <FaWater className="text-4xl text-blue-400 mx-auto mb-2" />
                      <p className="text-gray-600 font-semibold">Water</p>
                      <p className="text-sm text-gray-500">{dietData.tracker.waterIntake || 0}ml</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Log Meal Form */}
              {showMealForm && (
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Log a Meal</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Meal Type</label>
                      <select
                        value={mealForm.mealType}
                        onChange={(e) => setMealForm({ ...mealForm, mealType: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Snack</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      Log Meal
                    </button>
                  </form>
                </div>
              )}

              {/* Diet Templates */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Diet Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.slice(0, 3).map((template) => (
                    <div key={template._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                      <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                          {template.goal}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          {template.dailyCalories} cal
                        </span>
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
                        Use This Template
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DietPage;
