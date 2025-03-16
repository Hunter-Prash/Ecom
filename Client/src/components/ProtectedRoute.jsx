import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/context.jsx';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.token === "") {
    return <div>Loading...</div>; // Prevent early redirection
  }

  if (!auth?.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;