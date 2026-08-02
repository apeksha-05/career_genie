import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isTokenExpired } from '../utils/jwt';

/**
 * ProtectedRoute — a two-stage gate:
 *
 * 1. Authentication check: user must be logged in (isAuthenticated + valid token).
 *    An expired or missing token redirects to /login.
 *
 * 2. Role-based authorization check: the user's role (derived from the JWT payload
 *    in authSlice) must be in `allowedRoles`. Violations redirect to /unauthorized.
 *
 * Note: This is a UI-layer guard for a good user experience.
 *       True authorization is enforced by the backend `authenticate` + `authorize`
 *       middleware on every API request.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);

  // Not logged in at all
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  // Token present but expired — force re-login
  if (isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role for this route
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
