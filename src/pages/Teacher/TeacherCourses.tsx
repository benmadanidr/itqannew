import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Star, Calendar, Plus, Edit, BarChart3, Clock } from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function TeacherCourses() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const courses = [
    {
      id: 1,
      name: 'البرمجة الأساسية',
      description: 'تعلم أساسيات البرمجة باستخدام Python',
      students: 45,
      totalLessons: 20,
      completedLessons: 17,
      rating: 4.9,
      completion: 85,
      nextClass: '2025-01-15 10:00',
      duration: '12 أسبوع',
      level: 'مبتدئ',
      category: 'برمجة',
      status: 'نشط'
    },
    {
      id: 2,
      name: 'تطوير المواقع المتقدم',
      description: 'تطوير مواقع تفاعلية باستخدام React و Node.js',
      students: 32,
      totalLessons: 16,
      completedLessons: 9,
      rating: 4.7,
      completion: 60,
      nextClass: '2025-01-16 14:00',
      duration: '10 أسابيع',
      level: 'متقدم',
      category: 'تطوير ويب',
      status: 'نشط'
    },
    {
      id: 3,
      name: 'الذكاء الاصطناعي',
      description: 'مقدمة في الذكاء الاصطناعي وتعلم الآلة',
      students: 28,
      totalLessons: 18,
      completedLessons: 7,
      rating: 4.8,
      completion: 40,
      nextClass: '2025-01-17 09:00',
      duration: '14 أسبوع',
      level: 'متقدم',
      category: 'ذكاء اصطناعي',
      status: 'نشط'
    },
    {
      id: 4,
      name: 'أساسيات قواعد البيانات',
      description: 'تعلم تصميم وإدارة قواعد البيانات',
      students: 38,
      totalLessons: 15,
      completedLessons: 15,
      rating: 4.6,
      completion: 100,
      nextClass: 'مكتملة',
      duration: '8 أسابيع',
      level: 'متوسط',
      category: 'قواعد بيانات',
      status: 'مكتمل'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-600';
      case 'مكتمل': return 'bg-blue-100 text-blue-600';
      case 'متوقف': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'مبتدئ': return 'bg-green-100 text-green-600';
      case 'متوسط': return 'bg-yellow-100 text-yellow-600';
      case 'متقدم': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <DashboardLayout userType="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">إدارة دوراتي</h1>
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus className="h-4 w-4" />
              <span>إنشاء دورة جديدة</span>
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCourse(course.id)}
            >
              <div className="p-6">
                {/* Course Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-lg font-bold text-gray-900">{course.students}</p>
                    <p className="text-xs text-gray-600">طالب</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                    <p className="text-lg font-bold text-gray-900">{course.rating}</p>
                    <p className="text-xs text-gray-600">تقييم</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">التقدم</span>
                    <span className="text-sm font-medium text-green-600">{course.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.completion}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {course.completedLessons}/{course.totalLessons} درس
                    </span>
                    <span className="text-xs text-gray-500">{course.duration}</span>
                  </div>
                </div>

                {/* Next Class */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 ml-1" />
                    <span>
                      {course.nextClass === 'مكتملة' 
                        ? 'الدورة مكتملة' 
                        : `المحاضرة القادمة: ${course.nextClass}`
                      }
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                    <Edit className="h-4 w-4 ml-1" />
                    تعديل
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 ml-1" />
                    إحصائيات
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const course = courses.find(c => c.id === selectedCourse);
                if (!course) return null;

                return (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h2>
                        <p className="text-gray-600">{course.description}</p>
                      </div>
                      <button
                        onClick={() => setSelectedCourse(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">عدد الطلاب:</span>
                          <span className="font-medium">{course.students}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">التقييم:</span>
                          <span className="font-medium flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                            {course.rating}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">المدة:</span>
                          <span className="font-medium">{course.duration}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">المستوى:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(course.level)}`}>
                            {course.level}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الحالة:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(course.status)}`}>
                            {course.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">التصنيف:</span>
                          <span className="font-medium">{course.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 space-x-reverse">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        تعديل الدورة
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        عرض الطلاب
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        الإحصائيات
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}

        {/* Empty State */}
        {courses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد دورات</h3>
            <p className="text-gray-600 mb-4">ابدأ بإنشاء دورتك الأولى</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              إنشاء دورة جديدة
            </button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
