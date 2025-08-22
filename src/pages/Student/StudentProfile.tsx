import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera } from 'lucide-react';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'أحمد محمد العلي',
    email: 'ahmed.mohamed@example.com',
    phone: '+966501234567',
    dateOfBirth: '1995-05-15',
    city: 'الرياض',
    address: 'حي النخيل، شارع الملك فهد',
    studentId: 'ST2025001',
    major: 'علوم الحاسب',
    enrollmentDate: '2023-09-01',
    bio: 'طالب في علوم الحاسب، مهتم بالبرمجة وتطوير المواقع. أسعى لتطوير مهاراتي في مجال التكنولوجيا والذكاء الاصطناعي.'
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

  const achievements = [
    { title: 'شهادة البرمجة الأساسية', date: '2024-12-15', type: 'شهادة' },
    { title: 'أفضل طالب في الدورة', date: '2024-11-20', type: 'إنجاز' },
    { title: 'مشروع متميز', date: '2024-10-10', type: 'مشروع' }
  ];

  const academicInfo = [
    { label: 'رقم الطالب', value: profileData.studentId },
    { label: 'التخصص', value: profileData.major },
    { label: 'تاريخ التسجيل', value: new Date(profileData.enrollmentDate).toLocaleDateString('ar-SA') },
    { label: 'عدد الدورات المكتملة', value: '5' },
    { label: 'المعدل التراكمي', value: '4.2/5.0' }
  ];

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">الملف الشخصي</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
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
                    <button className="absolute bottom-0 left-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
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
                <p className="text-gray-600 mb-4">{profileData.studentId}</p>
                
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    rows={3}
                    placeholder="نبذة عنك..."
                  />
                ) : (
                  <p className="text-gray-600 text-sm">{profileData.bio}</p>
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
                          value={editData.major}
                          onChange={(e) => setEditData({ ...editData, major: e.target.value })}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <span className="text-gray-900">{profileData.major}</span>
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

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">الإنجازات والشهادات</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      achievement.type === 'شهادة' ? 'bg-blue-100 text-blue-600' :
                      achievement.type === 'إنجاز' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {achievement.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
