import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: Array<'student' | 'teacher' | 'admin'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user && !user.isProfileComplete && user.role !== 'admin') {
    return <Navigate to="/complete-profile" state={{ from: location }} replace />;
  }

  if (user && allowedRoles.includes(user.role)) {
    return <Outlet />;
  }
  
  return <Navigate to={`/${user?.role || ''}`} replace />;
};

export default ProtectedRoute;
