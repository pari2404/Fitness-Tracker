import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Magic Fitness</h3>
            <p className="text-gray-400">
              Your ultimate fitness companion for home workouts, habit tracking, and
              diet management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  Workouts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Habits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Diet Plans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-2xl">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-600 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-blue-300 hover:text-blue-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-pink-400 hover:text-pink-600 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Magic Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
