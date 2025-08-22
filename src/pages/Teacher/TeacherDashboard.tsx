import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Calendar, TrendingUp, Clock, Star, Award, MessageCircle } from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function TeacherDashboard() {
  const stats = [
    { icon: BookOpen, label: 'دوراتي', value: '8', color: 'blue' },
    { icon: Users, label: 'عدد الطلاب', value: '124', color: 'green' },
    { icon: Star, label: 'التقييم', value: '4.8', color: 'yellow' },
    { icon: TrendingUp, label: 'معدل الإنجاز', value: '92%', color: 'purple' }
  ];

  const myCourses = [
    { 
      id: 1, 
      name: 'البرمجة الأساسية', 
      students: 45, 
      completion: 85, 
      nextClass: '2025-01-15 10:00',
      rating: 4.9
    },
    { 
      id: 2, 
      name: 'تطوير المواقع المتقدم', 
      students: 32, 
      completion: 60, 
      nextClass: '2025-01-16 14:00',
      rating: 4.7
    },
    { 
      id: 3, 
      name: 'الذكاء الاصطناعي', 
      students: 28, 
      completion: 40, 
      nextClass: '2025-01-17 09:00',
      rating: 4.8
    }
  ];

  const recentActivities = [
    { id: 1, type: 'تقييم', description: 'تم تقييم 15 مشروع في دورة البرمجة الأساسية', time: 'منذ ساعتين' },
    { id: 2, type: 'رسالة', description: 'رسالة جديدة من الطالب أحمد محمد', time: 'منذ 3 ساعات' },
    { id: 3, type: 'محاضرة', description: 'انتهاء محاضرة تطوير المواقع المتقدم', time: 'منذ 5 ساعات' }
  ];

  const topStudents = [
    { id: 1, name: 'سارة أحمد', course: 'البرمجة الأساسية', grade: 98, avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/40x40.png' },
    { id: 2, name: 'محمد علي', course: 'تطوير المواقع', grade: 95, avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/40x40.png' },
    { id: 3, name: 'فاطمة خالد', course: 'الذكاء الاصطناعي', grade: 94, avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/40x40.png' }
  ];

  return (
    <DashboardLayout userType="teacher">
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
        >
          <h1 className="text-2xl font-bold mb-2">مرحباً بك، د. فاطمة العلي!</h1>
          <p className="text-green-100">لديك 3 محاضرات اليوم و 15 تقييم في انتظارك</p>
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
          {/* My Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">دوراتي</h2>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-600">{course.students} طالب</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 mr-1">{course.rating}</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">معدل الإنجاز</span>
                      <span className="text-sm font-medium text-green-600">{course.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 ml-1" />
                    <span>المحاضرة القادمة: {course.nextClass}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">النشاطات الأخيرة</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 space-x-reverse">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'تقييم' ? 'bg-blue-100' :
                    activity.type === 'رسالة' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'تقييم' && <Award className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'رسالة' && <MessageCircle className="h-4 w-4 text-green-600" />}
                    {activity.type === 'محاضرة' && <BookOpen className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Students */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">أفضل الطلاب</h2>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div key={student.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="relative">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className={`absolute -top-1 -left-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.course}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">{student.grade}%</p>
                    <p className="text-xs text-green-600">ممتاز</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'إنشاء محاضرة', icon: BookOpen, color: 'blue' },
                { label: 'تقييم الطلاب', icon: Award, color: 'green' },
                { label: 'جدولة موعد', icon: Calendar, color: 'purple' },
                { label: 'إحصائيات الدورة', icon: TrendingUp, color: 'orange' }
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className={`flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-${action.color}-50 hover:border-${action.color}-200 transition-colors`}
                  >
                    <Icon className={`h-6 w-6 text-${action.color}-600 mb-2`} />
                    <span className="text-sm text-gray-700">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
