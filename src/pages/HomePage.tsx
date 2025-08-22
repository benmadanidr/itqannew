import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  Award,
  ArrowLeft,
  CheckCircle,
  Star,
  Palette,
} from 'lucide-react';

const LOGO_URL = 'https://user-images.githubusercontent.com/38400331/296766411-9a7000d6-11f8-4228-b80c-03d3c7a6b825.png';

export default function HomePage() {
  const features = [
    {
      icon: Users,
      title: 'إدارة الطلاب والأساتذة',
      description: 'نظام شامل لإدارة بيانات الطلاب والأساتذة وتسجيلهم',
      link: '/admin/students'
    },
    {
      icon: BookOpen,
      title: 'إدارة الدورات',
      description: 'إنشاء وإدارة الدورات التعليمية والمناهج الدراسية',
      link: '/admin/courses'
    },
    {
      icon: Award,
      title: 'تتبع التقدم',
      description: 'متابعة تقدم الطلاب وتقييم أدائهم بشكل دوري',
      link: '/student'
    },
    {
      icon: Palette,
      title: 'تصميم البطاقات',
      description: 'أداة مدمجة لتصميم وطباعة بطاقات هوية احترافية',
      link: '/card-design'
    }
  ];

  const stats = [
    { number: '500+', label: 'طالب مسجل' },
    { number: '50+', label: 'أستاذ متخصص' },
    { number: '100+', label: 'دورة تعليمية' },
    { number: '95%', label: 'معدل النجاح' }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <img src={LOGO_URL} alt="شعار أكاديمية الإتقان" className="h-12 w-12" />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">أكاديمية الإتقان التعليمية</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 space-x-reverse">
              <Link
                to="/about"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                من نحن
              </Link>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                دخول الإدارة
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                إنشاء حساب
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              نظام إدارة
              <span className="gradient-text block">أكاديمية الإتقان التعليمية</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              منصة شاملة لإدارة العملية التعليمية تجمع بين الطلاب والأساتذة والإدارة 
              في مكان واحد لتوفير تجربة تعليمية استثنائية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                ابدأ الآن
                <ArrowLeft className="inline-block mr-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300"
              >
                دخول الإدارة
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              مميزات النظام
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نوفر حلولاً متكاملة لإدارة جميع جوانب العملية التعليمية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link to={feature.link} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              للجميع في المجتمع التعليمي
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              منصة موحدة تخدم جميع أطراف العملية التعليمية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'للطلاب',
                description: 'تسجيل في الدورات، متابعة التقدم، إدارة المدفوعات',
                color: 'blue',
                features: ['تسجيل الدورات', 'متابعة الدرجات', 'الجداول الدراسية', 'المدفوعات']
              },
              {
                title: 'للأساتذة',
                description: 'إدارة الدورات، متابعة الطلاب، التقارير والتحليلات',
                color: 'green',
                features: ['إدارة الدورات', 'تقييم الطلاب', 'التقارير', 'الجداول']
              },
              {
                title: 'للإدارة',
                description: 'إدارة شاملة للمدرسة، الطلاب، الأساتذة، والمالية',
                color: 'purple',
                features: ['إدارة شاملة', 'التقارير المالية', 'إدارة الموظفين', 'الإحصائيات']
              }
            ].map((userType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white border-2 border-gray-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-${userType.color}-100 rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <Users className={`h-8 w-8 text-${userType.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  {userType.title}
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  {userType.description}
                </p>
                <ul className="space-y-2">
                  {userType.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 space-x-reverse">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ابدأ رحلتك التعليمية اليوم
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف الطلاب والأساتذة الذين يستخدمون نظامنا لتحقيق أهدافهم التعليمية
            </p>
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center"
            >
              إنشاء حساب جديد
              <Star className="mr-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
              <img src={LOGO_URL} alt="شعار أكاديمية الإتقان" className="h-10 w-10" />
              <span className="text-2xl font-bold">أكاديمية الإتقان</span>
            </div>
            <p className="text-gray-400 mb-4">
              نظام إدارة مدرسة متطور لتحسين العملية التعليمية
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 أكاديمية الإتقان. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
