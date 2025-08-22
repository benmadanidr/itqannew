import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LOGO_URL = 'https://user-images.githubusercontent.com/38400331/296766411-9a7000d6-11f8-4228-b80c-03d3c7a6b825.png';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin' // Hardcoded for admin login
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login(formData.email, formData.password, formData.role);
      navigate(`/${formData.role}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 space-x-reverse mb-6">
            <img src={LOGO_URL} alt="شعار أكاديمية الإتقان" className="h-12 w-12" />
            <span className="text-2xl font-bold text-gray-900">أكاديمية الإتقان</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <Shield className="h-8 w-8 ml-3 text-purple-600" />
            تسجيل دخول الإدارة
          </h2>
          <p className="text-gray-600">
            خاص بالموظفين المصرح لهم فقط
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white shadow-xl rounded-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="أدخل كلمة المرور"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  تسجيل الدخول
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="text-center">
              <span className="text-gray-500">هل أنت طالب أو أستاذ؟</span>
              <Link
                to="/register"
                className="text-purple-600 hover:text-purple-700 font-medium mr-1"
              >
                إنشاء حساب جديد
              </Link>
            </div>
          </form>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-800 text-white p-4 rounded-lg text-sm"
        >
          <h4 className="font-medium mb-2">بيانات تجريبية:</h4>
          <div className="space-y-1 text-gray-300">
            <p>البريد الإلكتروني: admin@example.com</p>
            <p className="text-gray-400">كلمة المرور: أي شيء</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
