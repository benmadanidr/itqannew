import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { faker } from '@faker-js/faker';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

type Student = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  courseId: number;
  courseName: string;
  grade: number;
  attendance: number;
  joinDate: string;
  status: 'نشط' | 'متأخر' | 'مكتمل';
  city: string;
  major: string;
};

const generateStudents = (count: number): Student[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: '+966501234567',
    avatar: `https://img-wrapper.vercel.app/image?url=https://i.pravatar.cc/50?u=${index}`,
    courseId: faker.number.int({ min: 1, max: 5 }),
    courseName: faker.helpers.arrayElement(['البرمجة الأساسية', 'تطوير المواقع', 'الذكاء الاصطناعي', 'أمن المعلومات', 'قواعد البيانات']),
    grade: faker.number.int({ min: 60, max: 100 }),
    attendance: faker.number.int({ min: 70, max: 100 }),
    joinDate: faker.date.past({ years: 1 }).toISOString().split('T')[0],
    status: faker.helpers.arrayElement(['نشط', 'متأخر', 'مكتمل']),
    city: faker.location.city(),
    major: faker.helpers.arrayElement(['علوم الحاسب', 'هندسة البرمجيات', 'أمن سيبراني', 'ذكاء اصطناعي'])
  }));
};

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>(generateStudents(50));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const { addToast } = useToast();

  const courses = [
    { id: 'all', name: 'جميع الدورات' },
    { id: 1, name: 'البرمجة الأساسية' },
    { id: 2, name: 'تطوير المواقع' },
    { id: 3, name: 'الذكاء الاصطناعي' },
    { id: 4, name: 'أمن المعلومات' },
    { id: 5, name: 'قواعد البيانات' }
  ];

  const handleAddStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStudent: Student = {
      id: students.length + 1,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: '+966501234567',
      avatar: `https://img-wrapper.vercel.app/image?url=https://i.pravatar.cc/50?u=${students.length + 1}`,
      courseId: 1,
      courseName: 'البرمجة الأساسية',
      grade: 0,
      attendance: 0,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'نشط',
      city: 'غير محدد',
      major: 'غير محدد'
    };
    setStudents([newStudent, ...students]);
    setIsAddModalOpen(false);
    addToast('تمت إضافة الطالب بنجاح', 'success');
  };

  const handleEditStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentToEdit) return;
    const formData = new FormData(e.currentTarget);
    const updatedStudent = {
      ...studentToEdit,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    };
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setIsEditModalOpen(false);
    setStudentToEdit(null);
    addToast('تم تحديث بيانات الطالب بنجاح', 'success');
  };

  const handleDeleteStudent = (id: number) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا الطالب؟')) {
      setStudents(students.filter(s => s.id !== id));
      addToast('تم حذف الطالب بنجاح', 'success');
    }
  };

  const openEditModal = (student: Student) => {
    setStudentToEdit(student);
    setIsEditModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-600';
      case 'متأخر': return 'bg-yellow-100 text-yellow-600';
      case 'مكتمل': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">إدارة الطلاب</h1>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن طالب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
              />
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 space-x-reverse bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>إضافة طالب</span>
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الطالب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدورة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ التسجيل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.slice(0, 10).map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full ml-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.courseName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.joinDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(student.status)}`}>{student.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button onClick={() => setSelectedStudent(student)} className="text-blue-600 hover:text-blue-800"><Eye className="h-4 w-4" /></button>
                        <button onClick={() => openEditModal(student)} className="text-green-600 hover:text-green-800"><Edit className="h-4 w-4" /></button>
                        <button onClick={() => handleDeleteStudent(student.id)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <Modal isOpen={!!selectedStudent} onClose={() => setSelectedStudent(null)} title="تفاصيل الطالب">
          {selectedStudent && (
             <div>
                <div className="flex items-center space-x-4 space-x-reverse mb-6">
                    <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-16 h-16 rounded-full" />
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h2>
                        <p className="text-gray-600">{selectedStudent.email}</p>
                    </div>
                </div>
                <div className="space-y-2 text-sm">
                    <p><strong>الدورة:</strong> {selectedStudent.courseName}</p>
                    <p><strong>الدرجة:</strong> {selectedStudent.grade}%</p>
                    <p><strong>الحضور:</strong> {selectedStudent.attendance}%</p>
                    <p><strong>تاريخ التسجيل:</strong> {selectedStudent.joinDate}</p>
                    <p><strong>الحالة:</strong> <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedStudent.status)}`}>{selectedStudent.status}</span></p>
                </div>
            </div>
          )}
        </Modal>

        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="إضافة طالب جديد">
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
              <input name="name" type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <input name="email" type="email" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500" />
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg">إضافة</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="تعديل بيانات الطالب">
          {studentToEdit && (
            <form onSubmit={handleEditStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input name="name" type="text" defaultValue={studentToEdit.name} required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input name="email" type="email" defaultValue={studentToEdit.email} required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500" />
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg">حفظ التغييرات</button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
