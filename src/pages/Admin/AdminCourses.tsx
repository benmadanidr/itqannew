import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Plus, Edit, Trash2, Eye, Users, Star, Calendar, DollarSign, Clock } from 'lucide-react';
import { faker } from '@faker-js/faker';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const generateCourses = () => {
  return Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: faker.company.catchPhrase(),
    instructor: faker.person.fullName(),
    studentsCount: faker.number.int({ min: 20, max: 150 }),
    price: faker.number.int({ min: 500, max: 3000 }),
    duration: `${faker.number.int({ min: 4, max: 16 })} أسابيع`,
    status: faker.helpers.arrayElement(['نشط', 'مكتمل', 'قادم']),
    rating: faker.number.float({ min: 3.5, max: 5.0, precision: 0.1 }),
    category: faker.helpers.arrayElement(['برمجة', 'تصميم', 'تسويق', 'إدارة أعمال']),
    startDate: faker.date.future().toISOString().split('T')[0],
  }));
};

export default function AdminCourses() {
  const [courses, setCourses] = useState(generateCourses());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-600';
      case 'مكتمل': return 'bg-blue-100 text-blue-600';
      case 'قادم': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">إدارة الدورات</h1>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن دورة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 space-x-reverse bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>إضافة دورة</span>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدورة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الأستاذ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطلاب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التقييم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{course.name}</p>
                      <p className="text-sm text-gray-500">{course.category}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.instructor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.studentsCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{course.price} ر.س</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-900 mr-1">{course.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button onClick={() => setSelectedCourse(course)} className="text-blue-600 hover:text-blue-800"><Eye className="h-4 w-4" /></button>
                        <button className="text-green-600 hover:text-green-800"><Edit className="h-4 w-4" /></button>
                        <button className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
