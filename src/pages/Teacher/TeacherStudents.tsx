import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Star, TrendingUp, Award, BookOpen, Mail, Phone } from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function TeacherStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const courses = [
    { id: 'all', name: 'جميع الدورات' },
    { id: 1, name: 'البرمجة الأساسية' },
    { id: 2, name: 'تطوير المواقع المتقدم' },
    { id: 3, name: 'الذكاء الاصطناعي' }
  ];

  const students = [
    {
      id: 1,
      name: 'سارة أحمد محمد',
      email: 'sara.ahmed@example.com',
      phone: '+966501234567',
      avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/50x50.png',
      courseId: 1,
      courseName: 'البرمجة الأساسية',
      grade: 98,
      attendance: 95,
      completedLessons: 18,
      totalLessons: 20,
      lastActivity: '2025-01-14',
      joinDate: '2024-09-15',
      status: 'نشط'
    },
    {
      id: 2,
      name: 'محمد علي حسن',
      email: 'mohamed.ali@example.com',
      phone: '+966502345678',
      avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/50x50.png',
      courseId: 2,
      courseName: 'تطوير المواقع المتقدم',
      grade: 95,
      attendance: 88,
      completedLessons: 14,
      totalLessons: 16,
      lastActivity: '2025-01-13',
      joinDate: '2024-10-01',
      status: 'نشط'
    },
    {
      id: 3,
      name: 'فاطمة خالد العلي',
      email: 'fatima.khaled@example.com',
      phone: '+966503456789',
      avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/50x50.png',
      courseId: 3,
      courseName: 'الذكاء الاصطناعي',
      grade: 94,
      attendance: 92,
      completedLessons: 12,
      totalLessons: 18,
      lastActivity: '2025-01-14',
      joinDate: '2024-11-10',
      status: 'نشط'
    },
    {
      id: 4,
      name: 'أحمد عبدالله النوري',
      email: 'ahmed.abdullah@example.com',
      phone: '+966504567890',
      avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/50x50.png',
      courseId: 1,
      courseName: 'البرمجة الأساسية',
      grade: 87,
      attendance: 85,
      completedLessons: 16,
      totalLessons: 20,
      lastActivity: '2025-01-12',
      joinDate: '2024-09-20',
      status: 'متأخر'
    },
    {
      id: 5,
      name: 'نور الدين السعد',
      email: 'nour.alsaad@example.com',
      phone: '+966505678901',
      avatar: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/50x50.png',
      courseId: 2,
      courseName: 'تطوير المواقع المتقدم',
      grade: 91,
      attendance: 90,
      completedLessons: 13,
      totalLessons: 16,
      lastActivity: '2025-01-14',
      joinDate: '2024-10-05',
      status: 'نشط'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.courseId.toString() === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-600';
      case 'متأخر': return 'bg-yellow-100 text-yellow-600';
      case 'غير نشط': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout userType="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">إدارة الطلاب</h1>
          
          {/* Search and Filter */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن طالب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              />
            </div>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الطلاب</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">الطلاب النشطين</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => s.status === 'نشط').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">متوسط الدرجات</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(students.reduce((sum, s) => sum + s.grade, 0) / students.length).toFixed(1)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">معدل الحضور</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطالب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدورة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدرجة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحضور</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التقدم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full ml-3"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-gray-400 ml-1" />
                        <span className="text-sm text-gray-900">{student.courseName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-bold ${getGradeColor(student.grade)}`}>
                        {student.grade}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{student.attendance}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 ml-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(student.completedLessons / student.totalLessons) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">
                          {student.completedLessons}/{student.totalLessons}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <button
                        onClick={() => setSelectedStudent(student.id)}
                        className="text-green-600 hover:text-green-800 ml-3"
                      >
                        عرض التفاصيل
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Student Details Modal */}
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const student = students.find(s => s.id === selectedStudent);
                if (!student) return null;

                return (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                          <p className="text-gray-600">{student.courseName}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedStudent(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 ml-2" />
                          <span className="text-gray-900">{student.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 ml-2" />
                          <span className="text-gray-900">{student.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">تاريخ التسجيل:</span>
                          <span className="font-medium">{student.joinDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">آخر نشاط:</span>
                          <span className="font-medium">{student.lastActivity}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">الدرجة:</span>
                          <span className={`font-bold ${getGradeColor(student.grade)}`}>
                            {student.grade}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">معدل الحضور:</span>
                          <span className="font-medium">{student.attendance}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الدروس المكتملة:</span>
                          <span className="font-medium">
                            {student.completedLessons}/{student.totalLessons}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الحالة:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 space-x-reverse">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        إرسال رسالة
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        تقييم الطالب
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        عرض التقرير
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-600">
              لم يتم العثور على طلاب يطابقون البحث الحالي
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
