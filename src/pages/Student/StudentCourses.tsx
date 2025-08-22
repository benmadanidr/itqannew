import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, Users, Filter, Search } from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { useToast } from '../../context/ToastContext';

export default function StudentCourses() {
  const [activeTab, setActiveTab] = useState<'enrolled' | 'available'>('enrolled');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToast } = useToast();

  const enrolledCourses = [
    {
      id: 1,
      name: 'البرمجة الأساسية',
      instructor: 'د. أحمد علي',
      progress: 85,
      totalLessons: 20,
      completedLessons: 17,
      nextLesson: 'المتغيرات والدوال',
      rating: 4.8,
      category: 'برمجة'
    },
    {
      id: 2,
      name: 'تصميم المواقع',
      instructor: 'د. فاطمة محمد',
      progress: 60,
      totalLessons: 15,
      completedLessons: 9,
      nextLesson: 'CSS المتقدم',
      rating: 4.6,
      category: 'تصميم'
    },
  ];

  const availableCourses = [
    {
      id: 4,
      name: 'الذكاء الاصطناعي',
      instructor: 'د. سارة أحمد',
      duration: '12 أسبوع',
      level: 'متقدم',
      students: 150,
      price: 2500,
      rating: 4.9,
      category: 'ذكاء اصطناعي'
    },
    {
      id: 5,
      name: 'أمن المعلومات',
      instructor: 'د. عمر حسن',
      duration: '8 أسابيع',
      level: 'متوسط',
      students: 89,
      price: 1800,
      rating: 4.5,
      category: 'أمن معلومات'
    },
  ];

  const handleEnroll = (courseName: string) => {
    addToast(`تم إرسال طلب التسجيل في دورة "${courseName}"`, 'success');
  };

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">إدارة الدورات</h1>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث في الدورات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 space-x-reverse">
            <button
              onClick={() => setActiveTab('enrolled')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'enrolled'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              دوراتي ({enrolledCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'available'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              الدورات المتاحة ({availableCourses.length})
            </button>
          </nav>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'enrolled' ? (
            enrolledCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">التقدم</span>
                    <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    متابعة التعلم
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            availableCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
                  <div className="flex justify-between items-center text-sm text-gray-800 mb-4">
                    <span>{course.duration}</span>
                    <span className="font-bold text-lg text-green-600">{course.price} ر.س</span>
                  </div>
                  <button 
                    onClick={() => handleEnroll(course.name)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    التسجيل في الدورة
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
