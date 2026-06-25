import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaDumbbell, FaFire, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaDumbbell /> Magic Fitness
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-yellow-300 transition duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/workouts"
                className="hover:text-yellow-300 transition duration-300"
              >
                Workouts
              </Link>
              <Link
                to="/habits"
                className="hover:text-yellow-300 transition duration-300"
              >
                Habits
              </Link>
              <Link
                to="/diet"
                className="hover:text-yellow-300 transition duration-300"
              >
                Diet
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-yellow-300 transition duration-300"
              >
                <FaUser /> {user?.firstName}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-300 flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition duration-300 font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
