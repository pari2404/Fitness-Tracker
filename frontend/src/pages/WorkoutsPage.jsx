import React, { useEffect, useState } from 'react';
import { FaDumbbell, FaPlay, FaPlus } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../services/api';
import { toast } from 'react-toastify';

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ difficulty: '', category: '' });

  useEffect(() => {
    fetchWorkouts();
  }, [filter]);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (filter.difficulty) query.append('difficulty', filter.difficulty);
      if (filter.category) query.append('category', filter.category);

      const response = await apiClient.get(`/workouts?${query}`);
      setWorkouts(response.workouts);
    } catch (error) {
      toast.error('Error fetching workouts');
    } finally {
      setLoading(false);
    }
  };

  const startWorkout = async (workoutId) => {
    try {
      const response = await apiClient.post('/workouts/start', { workoutId });
      toast.success('Workout started!');
      // Navigate to workout in progress
    } catch (error) {
      toast.error('Error starting workout');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Workouts</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition">
              <FaPlus /> Create Custom
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Difficulty</label>
                <select
                  value={filter.difficulty}
                  onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                  value={filter.category}
                  onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Strength">Strength</option>
                  <option value="Flexibility">Flexibility</option>
                  <option value="HIIT">HIIT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Workouts Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading workouts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workouts.map((workout) => (
                <div key={workout._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  {workout.imageUrl && (
                    <img
                      src={workout.imageUrl}
                      alt={workout.name}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{workout.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{workout.description}</p>
                    <div className="flex justify-between items-center mb-4 text-sm text-gray-700">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {workout.difficulty}
                      </span>
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                        {workout.duration} min
                      </span>
                    </div>
                    <button
                      onClick={() => startWorkout(workout._id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <FaPlay /> Start Workout
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

export default WorkoutsPage;
