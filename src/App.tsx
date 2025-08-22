import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import GlobalKeyListener from './components/GlobalKeyListener';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CardDesignPage from './pages/CardDesignPage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import StudentDashboard from './pages/Student/StudentDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';

// Student Pages
import StudentCourses from './pages/Student/StudentCourses';
import StudentProfile from './pages/Student/StudentProfile';
import StudentPayments from './pages/Student/StudentPayments';

// Teacher Pages
import TeacherCourses from './pages/Teacher/TeacherCourses';
import TeacherStudents from './pages/Teacher/TeacherStudents';
import TeacherProfile from './pages/Teacher/TeacherProfile';

// Admin Pages
import AdminStudents from './pages/Admin/AdminStudents';
import AdminTeachers from './pages/Admin/AdminTeachers';
import AdminCourses from './pages/Admin/AdminCourses';
import AdminRooms from './pages/Admin/AdminRooms';
import AdminFinancial from './pages/Admin/AdminFinancial';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <GlobalKeyListener />
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/card-design" element={<CardDesignPage />} />
                
                {/* Profile Completion Route */}
                <Route path="/complete-profile" element={<CompleteProfilePage />} />
                
                {/* Protected Student Routes */}
                <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                  <Route path="/student" element={<StudentDashboard />} />
                  <Route path="/student/courses" element={<StudentCourses />} />
                  <Route path="/student/profile" element={<StudentProfile />} />
                  <Route path="/student/payments" element={<StudentPayments />} />
                </Route>
                
                {/* Protected Teacher Routes */}
                <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
                  <Route path="/teacher" element={<TeacherDashboard />} />
                  <Route path="/teacher/courses" element={<TeacherCourses />} />
                  <Route path="/teacher/students" element={<TeacherStudents />} />
                  <Route path="/teacher/profile" element={<TeacherProfile />} />
                </Route>
                
                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/students" element={<AdminStudents />} />
                  <Route path="/admin/teachers" element={<AdminTeachers />} />
                  <Route path="/admin/courses" element={<AdminCourses />} />
                  <Route path="/admin/rooms" element={<AdminRooms />} />
                  <Route path="/admin/financial" element={<AdminFinancial />} />
                </Route>
              </Routes>
            </motion.div>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
