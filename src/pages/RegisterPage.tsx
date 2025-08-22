import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const LOGO_URL = 'https://user-images.githubusercontent.com/38400331/296766411-9a7000d6-11f8-4228-b80c-03d3c7a6b825.png';

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { addToast } = useToast();
  const defaultRole = location.state?.defaultRole || 'teacher';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ ...prev, role: defaultRole }));
  }, [defaultRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addToast('كلمات المرور غير متطابقة', 'warning');
      return;
    }
    if (!formData.agreeToTerms) {
      addToast('يجب الموافقة على شروط الخدمة وسياسة الخصوصية', 'warning');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      login(formData.email, formData.password, formData.role, true);
      
      addToast('تم إنشاء الحساب بنجاح! يرجى إكمال ملفك الشخصي.', 'success');
      
      navigate(`/${formData.role}`);
      
      setIsLoading(false);
    }, 1500);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-600 text-white';
      case 'teacher': return 'bg-brand-gold text-brand-dark-blue';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'student': return 'طالب';
      case 'teacher': return 'أستاذ';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://img-wrapper.vercel.app/image?url=https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-brand-dark-blue bg-opacity-70 flex flex-col justify-center items-center text-white p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <img src={LOGO_URL} alt="شعار أكاديمية الإتقان" className="h-24 w-24 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">مرحباً بك في أكاديمية الإتقان</h1>
            <p className="text-xl text-gray-300 max-w-md">
              المنصة الرائدة لإدارة التعليم. انضم إلى مجتمعنا من المعلمين والطلاب المتميزين.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="text-center mb-8">
            <Link to="/" className="lg:hidden inline-flex items-center space-x-2 space-x-reverse mb-6">
              <img src={LOGO_URL} alt="شعار أكاديمية الإتقان" className="h-10 w-10" />
              <span className="text-2xl font-bold text-gray-900">أكاديمية الإتقان</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              إنشاء حساب جديد
            </h2>
            <p className="text-gray-600">
              انضم إلى مجتمعنا التعليمي اليوم
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  أقوم بإنشاء حساب بصفتي:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['teacher', 'student'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFormData({ ...formData, role })}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        formData.role === role
                          ? getRoleColor(role)
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {getRoleName(role)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input
                  type="text" required
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email" required
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} required
                    value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تأكيد كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'} required
                    value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="h-4 w-4 text-brand-gold focus:ring-brand-gold border-gray-300 rounded ml-2"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                  أوافق على <a href="#" className="font-medium text-brand-dark-blue hover:underline">شروط الخدمة</a> و <a href="#" className="font-medium text-brand-dark-blue hover:underline">سياسة الخصوصية</a>
                </label>
              </div>

              <button
                type="submit" disabled={isLoading}
                className="w-full bg-brand-dark-blue hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'إنشاء الحساب'
                )}
              </button>

              <div className="text-center text-sm">
                <span className="text-gray-500">لديك حساب بالفعل؟ </span>
                <Link
                  to="/login"
                  className="text-brand-dark-blue hover:underline font-medium"
                >
                  تسجيل دخول الإدارة
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
