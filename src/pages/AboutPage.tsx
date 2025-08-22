import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, UserCheck, ArrowLeft } from 'lucide-react';

const LOGO_URL = 'https://user-images.githubusercontent.com/38400331/296766411-9a7000d6-11f8-4228-b80c-03d3c7a6b825.png';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-dark-blue flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center w-full max-w-2xl"
      >
        {/* Logo */}
        <img 
          src={LOGO_URL} 
          alt="شعار أكاديمية الإتقان التعليمية" 
          className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6"
        />

        {/* School Name */}
        <h1 className="text-3xl md:text-5xl font-bold text-brand-light-blue mb-2">
          أكاديمية الإتقان التعليمية
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-brand-gold mb-8">
          بدار الشيوخ - الجلفة
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-12 max-w-xl mx-auto leading-relaxed">
          نلتزم بتقديم تعليم متميز وبيئة تعليمية ملهمة تمكّن الطلاب والأساتذة من تحقيق أقصى إمكاناتهم. انضم إلينا اليوم لتكون جزءاً من رحلة النجاح.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/register"
              state={{ defaultRole: 'student' }}
              className="w-full sm:w-auto flex items-center justify-center bg-brand-light-blue text-brand-dark-blue px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-blue-400/50"
            >
              <User className="ml-2 h-5 w-5" />
              تسجيل كطالب
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/register"
              state={{ defaultRole: 'teacher' }}
              className="w-full sm:w-auto flex items-center justify-center bg-brand-gold text-brand-dark-blue px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-yellow-400/50"
            >
              <UserCheck className="ml-2 h-5 w-5" />
              تسجيل كأستاذ
            </Link>
          </motion.div>
        </div>

        {/* Back to Home link */}
        <div className="mt-16">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center">
                <ArrowLeft className="ml-2 h-4 w-4" />
                العودة إلى الصفحة الرئيسية
            </Link>
        </div>
      </motion.div>
    </div>
  );
}
