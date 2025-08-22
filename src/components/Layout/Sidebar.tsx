import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  Users,
  User,
  CreditCard,
  Building,
  DollarSign,
  UserCheck,
} from 'lucide-react';

const LOGO_URL = 'https://user-images.githubusercontent.com/38400331/296766411-9a7000d6-11f8-4228-b80c-03d3c7a6b825.png';

interface SidebarProps {
  userType: 'student' | 'teacher' | 'admin';
}

export default function Sidebar({ userType }: SidebarProps) {
  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: 'الرئيسية', path: `/${userType}` }
    ];

    switch (userType) {
      case 'student':
        return [
          ...baseItems,
          { icon: BookOpen, label: 'دوراتي', path: '/student/courses' },
          { icon: User, label: 'الملف الشخصي', path: '/student/profile' },
          { icon: CreditCard, label: 'المدفوعات', path: '/student/payments' }
        ];
      case 'teacher':
        return [
          ...baseItems,
          { icon: BookOpen, label: 'دوراتي', path: '/teacher/courses' },
          { icon: Users, label: 'طلابي', path: '/teacher/students' },
          { icon: User, label: 'الملف الشخصي', path: '/teacher/profile' }
        ];
      case 'admin':
        return [
          ...baseItems,
          { icon: Users, label: 'إدارة الطلاب', path: '/admin/students' },
          { icon: UserCheck, label: 'إدارة الأساتذة', path: '/admin/teachers' },
          { icon: BookOpen, label: 'إدارة الدورات', path: '/admin/courses' },
          { icon: Building, label: 'إدارة القاعات', path: '/admin/rooms' },
          { icon: DollarSign, label: 'إدارة المالية', path: '/admin/financial' }
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-white shadow-lg border-l border-gray-200"
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 space-x-reverse">
          <img src={LOGO_URL} alt="شعار أكاديمية الإتقان" className="h-10 w-10" />
          <div>
            <h1 className="text-lg font-bold text-gray-900">أكاديمية الإتقان</h1>
            <p className="text-sm text-gray-500">
              {userType === 'student' && 'لوحة الطالب'}
              {userType === 'teacher' && 'لوحة الأستاذ'}
              {userType === 'admin' && 'لوحة الإدارة'}
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 space-x-reverse px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
