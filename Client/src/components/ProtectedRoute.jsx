import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/context.jsx';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  console.log("ProtectedRoute: Auth State:", auth);

  if (auth.token === "") {
    console.log("ProtectedRoute: Waiting for auth state...");
    return <div>Loading...</div>; // Prevent early redirection
  }

  if (!auth?.token) {
    console.log("ProtectedRoute: User is not authenticated. Redirecting to /login");
    return <Navigate to="/login" />;
  }

  console.log("ProtectedRoute: User is authenticated. Rendering page.");
  return children;
};

export default ProtectedRoute;
