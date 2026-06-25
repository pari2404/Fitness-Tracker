import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaEdit, FaSave } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../services/api';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoal: '',
    experienceLevel: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get('/users/profile');
      setProfile(response.user);
      setFormData({
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        age: response.user.age || '',
        gender: response.user.gender || '',
        height: response.user.height || '',
        weight: response.user.weight || '',
        fitnessGoal: response.user.fitnessGoal || '',
        experienceLevel: response.user.experienceLevel || ''
      });
    } catch (error) {
      toast.error('Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put('/users/profile', formData);
      setProfile(response.user);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading profile...</p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              {/* Profile Header */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaUser className="text-4xl text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">
                        {profile?.firstName} {profile?.lastName}
                      </h1>
                      <p className="text-gray-600">{profile?.email}</p>
                      <p className="text-gray-500 text-sm mt-2">
                        Goal: {profile?.fitnessGoal} • Level: {profile?.experienceLevel}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition"
                  >
                    {isEditing ? (
                      <>
                        <FaSave /> Save
                      </>
                    ) : (
                      <>
                        <FaEdit /> Edit
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Edit Form or View */}
              {isEditing ? (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Age</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Fitness Goal
                        </label>
                        <select
                          name="fitnessGoal"
                          value={formData.fitnessGoal}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                          <option>Weight Loss</option>
                          <option>Muscle Gain</option>
                          <option>General Fitness</option>
                          <option>Endurance</option>
                          <option>Flexibility</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Experience Level
                        </label>
                        <select
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
                    >
                      Update Profile
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 text-sm">Age</p>
                      <p className="text-2xl font-bold">{profile?.age || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Gender</p>
                      <p className="text-2xl font-bold">{profile?.gender || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Height</p>
                      <p className="text-2xl font-bold">{profile?.height ? profile?.height + ' cm' : 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Weight</p>
                      <p className="text-2xl font-bold">{profile?.weight ? profile?.weight + ' kg' : 'Not set'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
