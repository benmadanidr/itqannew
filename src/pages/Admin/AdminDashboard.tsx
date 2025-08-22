import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, DollarSign, TrendingUp, Calendar, Award, Building, AlertCircle } from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function AdminDashboard() {
  const stats = [
    { icon: Users, label: 'إجمالي الطلاب', value: '1,248', color: 'blue', change: '+12%' },
    { icon: BookOpen, label: 'الدورات النشطة', value: '45', color: 'green', change: '+8%' },
    { icon: Award, label: 'الأساتذة', value: '87', color: 'purple', change: '+5%' },
    { icon: DollarSign, label: 'الإيرادات الشهرية', value: '245,000 ر.س', color: 'yellow', change: '+15%' }
  ];

  const recentActivities = [
    { id: 1, type: 'تسجيل', description: 'انضم 15 طالب جديد اليوم', time: 'منذ ساعة', color: 'green' },
    { id: 2, type: 'دفع', description: 'تم دفع 25,000 ر.س للدورات', time: 'منذ ساعتين', color: 'blue' },
    { id: 3, type: 'دورة', description: 'بدء دورة الذكاء الاصطناعي الجديدة', time: 'منذ 3 ساعات', color: 'purple' },
    { id: 4, type: 'تقييم', description: 'تم تقييم 45 طالب في دورات مختلفة', time: 'منذ 4 ساعات', color: 'orange' }
  ];

  const topCourses = [
    { name: 'البرمجة الأساسية', students: 156, revenue: '78,000 ر.س', rating: 4.9 },
    { name: 'تطوير المواقع', students: 132, revenue: '66,000 ر.س', rating: 4.8 },
    { name: 'الذكاء الاصطناعي', students: 98, revenue: '49,000 ر.س', rating: 4.7 },
    { name: 'أمن المعلومات', students: 87, revenue: '43,500 ر.س', rating: 4.6 }
  ];

  const alerts = [
    { id: 1, type: 'تحذير', message: '5 طلاب لم يدفعوا الرسوم', severity: 'warning' },
    { id: 2, type: 'معلومات', message: 'انتهاء صالحية 3 دورات قريباً', severity: 'info' },
    { id: 3, type: 'نجاح', message: 'تم تحديث النظام بنجاح', severity: 'success' }
  ];

  const quickStats = [
    { label: 'معدل الحضور', value: '94%', trend: 'up' },
    { label: 'معدل إكمال الدورات', value: '87%', trend: 'up' },
    { label: 'رضا الطلاب', value: '4.8/5', trend: 'up' },
    { label: 'نمو الإيرادات', value: '15%', trend: 'up' }
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <h1 className="text-2xl font-bold mb-2">مرحباً بك، مدير النظام!</h1>
          <p className="text-purple-100">نظرة شاملة على أداء الأكاديمية والإحصائيات الحديثة</p>
        </motion.div>

        {/* Main Stats */}
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
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">النشاطات الأخيرة</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 space-x-reverse">
                  <div className={`p-2 rounded-lg bg-${activity.color}-100`}>
                    <div className={`w-2 h-2 rounded-full bg-${activity.color}-600`}></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full bg-${activity.color}-100 text-${activity.color}-600`}>
                    {activity.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">التنبيهات</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${
                    alert.severity === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    alert.severity === 'info' ? 'bg-blue-50 border-blue-200' :
                    'bg-green-50 border-green-200'
                  }`}
                >
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <AlertCircle className={`h-4 w-4 mt-0.5 ${
                      alert.severity === 'warning' ? 'text-yellow-600' :
                      alert.severity === 'info' ? 'text-blue-600' :
                      'text-green-600'
                    }`} />
                    <div>
                      <p className={`text-xs font-medium ${
                        alert.severity === 'warning' ? 'text-yellow-800' :
                        alert.severity === 'info' ? 'text-blue-800' :
                        'text-green-800'
                      }`}>
                        {alert.type}
                      </p>
                      <p className={`text-sm ${
                        alert.severity === 'warning' ? 'text-yellow-700' :
                        alert.severity === 'info' ? 'text-blue-700' :
                        'text-green-700'
                      }`}>
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">أفضل الدورات</h2>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-600">{course.students} طالب</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">{course.revenue}</p>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-600 mr-1">{course.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات سريعة</h2>
            <div className="space-y-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{stat.label}</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="font-bold text-gray-900">{stat.value}</span>
                    <TrendingUp className={`h-4 w-4 ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`} />
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
              { label: 'إضافة طالب', icon: Users, color: 'blue', href: '/admin/students' },
              { label: 'إنشاء دورة', icon: BookOpen, color: 'green', href: '/admin/courses' },
              { label: 'إدارة القاعات', icon: Building, color: 'purple', href: '/admin/rooms' },
              { label: 'التقارير المالية', icon: DollarSign, color: 'yellow', href: '/admin/financial' }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className={`flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-${action.color}-50 hover:border-${action.color}-200 transition-colors`}
                >
                  <Icon className={`h-6 w-6 text-${action.color}-600 mb-2`} />
                  <span className="text-sm text-gray-700 text-center">{action.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
