import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Briefcase, Calendar, MapPin, Phone, Award, School, Image as ImageIcon, Save } from 'lucide-react';

const LOGO_URL = 'https://user-images.githubusercontent.com/38400331/296766411-9a7000d6-11f8-4228-b80c-03d3c7a6b825.png';

const CompleteProfilePage: React.FC = () => {
  const { user, isAuthenticated, completeProfile } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    dateOfBirth: '',
    placeOfBirth: '',
    schoolName: '',
    specialization: '',
    qualification: '',
    experience: '',
    avatar: user?.avatar || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100.png',
    avatarFile: null as File | null,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else if (user?.isProfileComplete) {
      navigate(`/${user.role}`);
    }
  }, [user, isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        avatarFile: file,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      completeProfile(formData);
      addToast('تم تحديث ملفك الشخصي بنجاح!', 'success');
      setIsLoading(false);
      navigate(`/${user?.role}`);
    }, 1500);
  };

  if (!user || user.isProfileComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const renderStudentFields = () => (
    <>
      <InputField icon={School} name="schoolName" label="اسم المؤسسة التعليمية" value={formData.schoolName} onChange={handleChange} required />
      <InputField icon={MapPin} name="placeOfBirth" label="مكان الميلاد" value={formData.placeOfBirth} onChange={handleChange} required />
    </>
  );

  const renderTeacherFields = () => (
    <>
      <InputField icon={Briefcase} name="specialization" label="التخصص" value={formData.specialization} onChange={handleChange} required />
      <InputField icon={Award} name="qualification" label="المؤهل العلمي" value={formData.qualification} onChange={handleChange} required />
      <InputField icon={Calendar} name="experience" label="سنوات الخبرة" type="number" value={formData.experience} onChange={handleChange} required />
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <img src={LOGO_URL} alt="شعار أكاديمية الإتقان" className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">إكمال الملف الشخصي</h2>
          <p className="text-gray-600 mt-2">
            مرحباً بك في أكاديمية الإتقان! يرجى إدخال البيانات التالية للمتابعة.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img src={formData.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-gray-200" />
              <label htmlFor="avatar-upload" className="absolute bottom-0 left-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                <ImageIcon className="h-4 w-4" />
                <input id="avatar-upload" name="avatar" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField icon={User} name="name" label="الاسم الكامل" value={formData.name} onChange={handleChange} required />
            <InputField icon={Phone} name="phone" label="رقم الهاتف" value={formData.phone} onChange={handleChange} required />
            <InputField icon={Calendar} name="dateOfBirth" label="تاريخ الميلاد" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
            
            {user.role === 'student' && renderStudentFields()}
            {user.role === 'teacher' && renderTeacherFields()}
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="ml-2 h-5 w-5" />
                  حفظ ومتابعة
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

interface InputFieldProps {
  icon: React.ElementType;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, name, label, value, onChange, type = 'text', required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  </div>
);

export default CompleteProfilePage;
