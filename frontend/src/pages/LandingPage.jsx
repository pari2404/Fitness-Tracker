import React from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaHeartbeat, FaAppleAlt, FaCheck } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Magic Fitness</h1>
          <p className="text-xl mb-8">
            Your complete fitness companion for home workouts, habit tracking, and diet management
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-bold transition duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-bold transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Magic Fitness?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaDumbbell className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Home Workouts</h3>
              <p className="text-gray-600">
                No equipment needed! Hundreds of exercises designed for all fitness levels.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaHeartbeat className="text-4xl text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Habit Tracking</h3>
              <p className="text-gray-600">
                Build lasting habits with streak tracking and daily reminders.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaAppleAlt className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Diet Tracking</h3>
              <p className="text-gray-600">
                Log meals, track calories, and monitor macronutrients with ease.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <FaCheck className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Diet Templates</h3>
              <p className="text-gray-600">
                Pre-designed meal plans for every goal and dietary preference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fitness?</h2>
          <p className="mb-8 text-lg">Join thousands of users who have achieved their fitness goals with Magic Fitness.</p>
          <Link
            to="/register"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-bold transition duration-300 inline-block"
          >
            Start Your Journey Now
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
