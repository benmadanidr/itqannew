import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="البحث..."
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 left-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 space-x-reverse">
            <img
              src={user?.avatar || 'https://img-wrapper.vercel.app/image?url=https://placehold.co/40x40.png'}
              alt={user?.name}
              className="h-8 w-8 rounded-full"
            />
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="تسجيل الخروج"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
