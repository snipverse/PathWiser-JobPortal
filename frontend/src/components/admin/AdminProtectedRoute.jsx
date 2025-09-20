import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const { user } = useSelector(store => store.auth);
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AdminProtectedRoute;
