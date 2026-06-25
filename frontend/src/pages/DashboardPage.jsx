import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaDumbbell, FaFire, FaHeart, FaTrophy, FaAppleAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import apiClient from '../services/api';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/users/statistics');
        setStats(response.statistics);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome back, {user?.firstName}! 🎉
            </h1>
            <p className="text-gray-600">Here's your fitness summary for today</p>
          </div>

          {/* Stats Grid */}
          {!loading && stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard
                icon={FaDumbbell}
                label="Total Workouts"
                value={stats.totalWorkouts}
                color="blue"
              />
              <StatCard
                icon={FaFire}
                label="Calories Burned"
                value={stats.caloriesBurned}
                color="orange"
              />
              <StatCard
                icon={FaHeart}
                label="Total Minutes"
                value={stats.totalMinutes}
                color="red"
              />
              <StatCard
                icon={FaTrophy}
                label="Current Streak"
                value={stats.streakDays + ' days'}
                color="purple"
              />
            </div>
          )}

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Workouts Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <FaDumbbell className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Start a Workout</h3>
              <p className="text-gray-600 mb-4">
                Choose from hundreds of home workout exercises
              </p>
              <a
                href="/workouts"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-block transition"
              >
                Browse Workouts
              </a>
            </div>

            {/* Habits Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <FaHeart className="text-4xl text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Track Habits</h3>
              <p className="text-gray-600 mb-4">
                Build and maintain your daily fitness habits
              </p>
              <a
                href="/habits"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg inline-block transition"
              >
                View Habits
              </a>
            </div>

            {/* Diet Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <FaAppleAlt className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Log Your Diet</h3>
              <p className="text-gray-600 mb-4">
                Track meals and monitor your nutrition goals
              </p>
              <a
                href="/diet"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg inline-block transition"
              >
                Track Diet
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
