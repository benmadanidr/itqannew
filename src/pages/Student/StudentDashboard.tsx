import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Award, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function StudentDashboard() {
  const stats = [
    { icon: BookOpen, label: 'الدورات المسجلة', value: '5', color: 'blue' },
    { icon: CheckCircle, label: 'الدورات المكتملة', value: '2', color: 'green' },
    { icon: Clock, label: 'الساعات المتبقية', value: '45', color: 'orange' },
    { icon: Award, label: 'الشهادات المحصلة', value: '2', color: 'purple' }
  ];

  const recentCourses = [
    { id: 1, name: 'البرمجة الأساسية', progress: 85, instructor: 'د. أحمد علي', nextClass: '2025-01-15 10:00' },
    { id: 2, name: 'تصميم المواقع', progress: 60, instructor: 'د. فاطمة محمد', nextClass: '2025-01-16 14:00' },
    { id: 3, name: 'قواعد البيانات', progress: 40, instructor: 'د. محمد خالد', nextClass: '2025-01-17 09:00' }
  ];

  const upcomingAssignments = [
    { id: 1, title: 'مشروع تطبيق ويب', course: 'البرمجة الأساسية', dueDate: '2025-01-20', priority: 'عالي' },
    { id: 2, title: 'تصميم واجهة مستخدم', course: 'تصميم المواقع', dueDate: '2025-01-22', priority: 'متوسط' },
    { id: 3, title: 'إنشاء قاعدة بيانات', course: 'قواعد البيانات', dueDate: '2025-01-25', priority: 'منخفض' }
  ];

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <h1 className="text-2xl font-bold mb-2">مرحباً بك، أحمد محمد!</h1>
          <p className="text-blue-100">استمر في رحلتك التعليمية وحقق أهدافك</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">دوراتي الحالية</h2>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-600">الأستاذ: {course.instructor}</p>
                    </div>
                    <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 ml-1" />
                    <span>المحاضرة القادمة: {course.nextClass}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Assignments */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">المهام القادمة</h2>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      assignment.priority === 'عالي' ? 'bg-red-100 text-red-600' :
                      assignment.priority === 'متوسط' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {assignment.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{assignment.course}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 ml-1" />
                    <span>موعد التسليم: {assignment.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'تصفح الدورات', icon: BookOpen, href: '/student/courses' },
              { label: 'المدفوعات', icon: TrendingUp, href: '/student/payments' },
              { label: 'الجدول الدراسي', icon: Calendar, href: '/student/schedule' },
              { label: 'الملف الشخصي', icon: Award, href: '/student/profile' }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Icon className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-700">{action.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
