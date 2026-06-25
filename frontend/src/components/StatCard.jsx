import React from 'react';
import { FaCheckCircle, FaTrophy, FaFire, FaChartLine } from 'react-icons/fa';

const StatCard = ({ icon: Icon, label, value, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color]} text-white p-6 rounded-lg shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-200 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="text-5xl opacity-30" />
      </div>
    </div>
  );
};

export default StatCard;
