import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { isLoggedIn, role } = useRole();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // Or an Unauthorized page
  }

  return <Outlet />;
}
