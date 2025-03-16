import React from 'react';
import { useAuth } from '../context/context.jsx';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.token === "") {
    return <div>Loading...</div>;
  }

  if (!auth?.token) {
    return <Navigate to="/login" />;
  } 
  
  if (auth?.user?.role !== 1) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedAdminRoute;