import React, { useEffect, useState } from 'react';
import { FaHeart, FaPlus, FaFire, FaTrophy } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../services/api';
import { toast } from 'react-toastify';

const HabitsPage = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Health',
    frequency: 'Daily',
    reminderTime: '09:00'
  });

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await apiClient.get('/habits/all');
      setHabits(response.habits);
    } catch (error) {
      toast.error('Error fetching habits');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/habits/create', formData);
      setHabits([...habits, response.habit]);
      setFormData({
        name: '',
        description: '',
        category: 'Health',
        frequency: 'Daily',
        reminderTime: '09:00'
      });
      setShowForm(false);
      toast.success('Habit created successfully!');
    } catch (error) {
      toast.error('Error creating habit');
    }
  };

  const logHabit = async (habitId) => {
    try {
      const response = await apiClient.post(`/habits/${habitId}/log`, { status: 'Completed' });
      setHabits(habits.map((h) => (h._id === habitId ? response.habit : h)));
      toast.success('Habit logged!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error logging habit');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Habit Tracker</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition"
            >
              <FaPlus /> New Habit
            </button>
          </div>

          {/* Create Habit Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Create a New Habit</h2>
              <form onSubmit={handleCreateHabit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Habit Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    rows="3"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option>Health</option>
                      <option>Fitness</option>
                      <option>Nutrition</option>
                      <option>Sleep</option>
                      <option>Meditation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Frequency</label>
                    <select
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option>Daily</option>
                      <option>3x Week</option>
                      <option>5x Week</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Create Habit
                </button>
              </form>
            </div>
          )}

          {/* Habits List */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading habits...</p>
            </div>
          ) : habits.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600 mb-4">No habits yet. Create one to get started!</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                Create Your First Habit
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit) => (
                <div key={habit._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{habit.name}</h3>
                      <p className="text-gray-600 text-sm">{habit.description}</p>
                    </div>
                    <FaHeart className="text-red-500 text-2xl" />
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaTrophy className="text-yellow-500" />
                      <span>Streak: {habit.currentStreak} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaFire className="text-orange-500" />
                      <span>Completed: {habit.totalCompletions} times</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => logHabit(habit._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      Log Today
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HabitsPage;
