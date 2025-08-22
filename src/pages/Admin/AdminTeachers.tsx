import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Plus, Edit, Trash2, Mail, Phone, Eye, Star, BookOpen } from 'lucide-react';
import { faker } from '@faker-js/faker';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function AdminTeachers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Generate mock teachers data
  const generateTeachers = () => {
    return Array.from({ length: 25 }, (_, index) => ({
      id: index + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: '+966501234567',
      avatar: `https://img-wrapper.vercel.app/image?url=https://placehold.co/50x50.png`,
      department: faker.helpers.arrayElement(['علوم الحاسب', 'هندسة البرمجيات', 'أمن المعلومات', 'الذكاء الاصطناعي']),
      specialization: faker.helpers.arrayElement(['البرمجة', 'قواعد البيانات', 'الشبكات', 'الذكاء الاصطناعي', 'أمن المعلومات']),
      qualification: faker.helpers.arrayElement(['بكالوريوس', 'ماجستير', 'دكتوراه']),
      experience: faker.number.int({ min: 1, max: 20 }),
      rating: faker.number.float({ min: 3.5, max: 5.0, precision: 0.1 }),
      coursesCount: faker.number.int({ min: 1, max: 8 }),
      studentsCount: faker.number.int({ min: 20, max: 200 }),
      joinDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
      status: faker.helpers.arrayElement(['نشط', 'إجازة', 'متوقف']),
      salary: faker.number.int({ min: 8000, max: 25000 })
    }));
  };

  const [teachers] = useState(generateTeachers());

  const departments = [
    { id: 'all', name: 'جميع الأقسام' },
    { id: 'cs', name: 'علوم الحاسب' },
    { id: 'se', name: 'هندسة البرمجيات' },
    { id: 'cyber', name: 'أمن المعلومات' },
    { id: 'ai', name: 'الذكاء الاصطناعي' }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || 
                             teacher.department.includes(departments.find(d => d.id === selectedDepartment)?.name || '');
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-600';
      case 'إجازة': return 'bg-yellow-100 text-yellow-600';
      case 'متوقف': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getQualificationColor = (qualification: string) => {
    switch (qualification) {
      case 'دكتوراه': return 'bg-purple-100 text-purple-600';
      case 'ماجستير': return 'bg-blue-100 text-blue-600';
      case 'بكالوريوس': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const stats = [
    { label: 'إجمالي الأساتذة', value: teachers.length.toString(), color: 'blue' },
    { label: 'الأساتذة النشطين', value: teachers.filter(t => t.status === 'نشط').length.toString(), color: 'green' },
    { label: 'متوسط التقييم', value: (teachers.reduce((sum, t) => sum + t.rating, 0) / teachers.length).toFixed(1), color: 'yellow' },
    { label: 'إجمالي الطلاب', value: teachers.reduce((sum, t) => sum + t.studentsCount, 0).toString(), color: 'purple' }
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">إدارة الأساتذة</h1>
          
          {/* Search and Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن أستاذ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 space-x-reverse bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>إضافة أستاذ</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
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
                  <Users className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Teachers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الأستاذ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القسم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المؤهل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الخبرة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التقييم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدورات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={teacher.avatar}
                          alt={teacher.name}
                          className="w-10 h-10 rounded-full ml-3"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                          <p className="text-sm text-gray-500">{teacher.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-gray-900">{teacher.department}</p>
                        <p className="text-sm text-gray-500">{teacher.specialization}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getQualificationColor(teacher.qualification)}`}>
                        {teacher.qualification}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {teacher.experience} سنة
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-900 mr-1">{teacher.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-gray-400 ml-1" />
                        <span className="text-sm text-gray-900">{teacher.coursesCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(teacher.status)}`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => setSelectedTeacher(teacher.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Teacher Details Modal */}
        {selectedTeacher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedTeacher(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const teacher = teachers.find(t => t.id === selectedTeacher);
                if (!teacher) return null;

                return (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <img
                          src={teacher.avatar}
                          alt={teacher.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{teacher.name}</h2>
                          <p className="text-gray-600">{teacher.department}</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${getQualificationColor(teacher.qualification)}`}>
                            {teacher.qualification}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedTeacher(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 ml-2" />
                          <span className="text-gray-900">{teacher.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 ml-2" />
                          <span className="text-gray-900">{teacher.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">التخصص:</span>
                          <span className="font-medium">{teacher.specialization}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">تاريخ التعيين:</span>
                          <span className="font-medium">{teacher.joinDate}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">سنوات الخبرة:</span>
                          <span className="font-medium">{teacher.experience} سنة</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">التقييم:</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium mr-1">{teacher.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">عدد الدورات:</span>
                          <span className="font-medium">{teacher.coursesCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">عدد الطلاب:</span>
                          <span className="font-medium">{teacher.studentsCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الراتب:</span>
                          <span className="font-medium">{teacher.salary.toLocaleString()} ر.س</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الحالة:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(teacher.status)}`}>
                            {teacher.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 space-x-reverse">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        إرسال رسالة
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        تعديل البيانات
                      </button>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        عرض الدورات
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}

        {/* Add Teacher Modal */}
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">إضافة أستاذ جديد</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="أدخل اسم الأستاذ"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="teacher@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+966501234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">القسم</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    {departments.slice(1).map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المؤهل العلمي</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="bachelor">بكالوريوس</option>
                    <option value="master">ماجستير</option>
                    <option value="phd">دكتوراه</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">سنوات الخبرة</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="عدد سنوات الخبرة"
                  />
                </div>

                <div className="flex items-center space-x-4 space-x-reverse pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    إضافة الأستاذ
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredTeachers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-600">
              لم يتم العثور على أساتذة يطابقون البحث الحالي
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
