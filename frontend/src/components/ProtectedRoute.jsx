import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppShell from './AppShell';

const ProtectedRoute = ({ children, allowedRoles, noShell = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  if (noShell) return children;

  return <AppShell>{children}</AppShell>;
};

export default ProtectedRoute;
