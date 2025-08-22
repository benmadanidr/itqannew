import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Award, BookOpen, Star } from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'د. فاطمة العلي محمد',
    email: 'fatima.alali@example.com',
    phone: '+966501234567',
    dateOfBirth: '1985-03-20',
    city: 'الرياض',
    address: 'حي الملقا، شارع التخصصي',
    employeeId: 'TR2025001',
    department: 'قسم علوم الحاسب',
    specialization: 'هندسة البرمجيات والذكاء الاصطناعي',
    joinDate: '2020-09-01',
    qualification: 'دكتوراه في علوم الحاسب',
    experience: '15 سنة',
    bio: 'أستاذة مشاركة في علوم الحاسب، متخصصة في الذكاء الاصطناعي وتعلم الآلة. حاصلة على درجة الدكتوراه من جامعة ستانفورد، وقد نشرت أكثر من 30 بحثاً علمياً في مجال الذكاء الاصطناعي.'
  });

  const [editData, setEditData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const teachingStats = [
    { label: 'إجمالي الدورات', value: '12', icon: BookOpen },
    { label: 'الطلاب الحاليين', value: '156', icon: User },
    { label: 'متوسط التقييم', value: '4.8', icon: Star },
    { label: 'سنوات الخبرة', value: '15', icon: Award }
  ];

  const achievements = [
    { title: 'أفضل أستاذ للعام 2024', date: '2024-12-15', type: 'جائزة' },
    { title: 'بحث متميز في الذكاء الاصطناعي', date: '2024-10-20', type: 'بحث' },
    { title: 'شهادة تدريب في التعليم الرقمي', date: '2024-08-10', type: 'شهادة' },
    { title: 'مشاركة في مؤتمر عالمي', date: '2024-06-05', type: 'مؤتمر' }
  ];

  const courses = [
    { name: 'البرمجة الأساسية', students: 45, rating: 4.9, status: 'نشط' },
    { name: 'تطوير المواقع المتقدم', students: 32, rating: 4.7, status: 'نشط' },
    { name: 'الذكاء الاصطناعي', students: 28, rating: 4.8, status: 'نشط' },
    { name: 'أساسيات قواعد البيانات', students: 38, rating: 4.6, status: 'مكتمل' }
  ];

  const academicInfo = [
    { label: 'رقم الموظف', value: profileData.employeeId },
    { label: 'القسم', value: profileData.department },
    { label: 'التخصص', value: profileData.specialization },
    { label: 'المؤهل العلمي', value: profileData.qualification },
    { label: 'تاريخ التعيين', value: new Date(profileData.joinDate).toLocaleDateString('ar-SA') },
    { label: 'سنوات الخبرة', value: profileData.experience }
  ];

  return (
    <DashboardLayout userType="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">الملف الشخصي</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 space-x-reverse bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Edit className="h-4 w-4" />
              <span>تعديل البيانات</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 space-x-reverse bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>حفظ</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 space-x-reverse bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
                <span>إلغاء</span>
              </button>
            </div>
          )}
        </div>

        {/* Teaching Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {teachingStats.map((stat, index) => {
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
                  <div className="p-3 rounded-lg bg-green-100">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src="https://img-wrapper.vercel.app/image?url=https://placehold.co/120x120.png"
                    alt="صورة الملف الشخصي"
                    className="w-30 h-30 rounded-full mx-auto"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 left-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full text-center border border-gray-300 rounded-lg px-3 py-1"
                    />
                  ) : (
                    profileData.name
                  )}
                </h2>
                <p className="text-gray-600 mb-2">{profileData.employeeId}</p>
                <p className="text-sm text-green-600 mb-4">{profileData.department}</p>
                
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    rows={4}
                    placeholder="نبذة عنك..."
                  />
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">{profileData.bio}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">المعلومات الشخصية</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 ml-2" />
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <span className="text-gray-900">{profileData.email}</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 ml-2" />
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <span className="text-gray-900">{profileData.phone}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الميلاد</label>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 ml-2" />
                      {isEditing ? (
                        <input
                          type="date"
                          value={editData.dateOfBirth}
                          onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <span className="text-gray-900">{new Date(profileData.dateOfBirth).toLocaleDateString('ar-SA')}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 ml-2" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.city}
                          onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <span className="text-gray-900">{profileData.city}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 ml-2" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.address}
                          onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <span className="text-gray-900">{profileData.address}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">التخصص</label>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 ml-2" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.specialization}
                          onChange={(e) => setEditData({ ...editData, specialization: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <span className="text-gray-900">{profileData.specialization}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">المعلومات الأكاديمية</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {academicInfo.map((info, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600">{info.label}</span>
                    <span className="font-medium text-gray-900">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Current Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">دوراتي الحالية</h3>
            <div className="space-y-3">
              {courses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{course.name}</h4>
                    <p className="text-sm text-gray-600">{course.students} طالب</p>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 mr-1">{course.rating}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      course.status === 'نشط' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">الإنجازات والأوسمة</h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    achievement.type === 'جائزة' ? 'bg-yellow-100 text-yellow-600' :
                    achievement.type === 'بحث' ? 'bg-blue-100 text-blue-600' :
                    achievement.type === 'شهادة' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {achievement.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
