import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Policy from './pages/Policy.jsx';
import React from 'react';
import PageNotFound from './pages/PageNotFound.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/Login.jsx';
import Header from './components/Header.jsx';
import Signup from './pages/Signup.jsx';

import Dashboard from './pages/User/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Forgot from './pages/Forgot.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={//ProtectedRoute is a custom component that checks if the user is authenticated before rendering the Dashboard component. If the user is not authenticated, the user is redirected to the login page.Dashboard is inside the ProtectedRoute component which is its child.Children are rendered only if the parent component renders them.Sometimes the opposite is true, where the parent component is rendered only if the child component is rendered.
            <ProtectedRoute>
              <Dashboard />    
            </ProtectedRoute>
          }
        />
        <Route path="/forgotpassword" element={<Forgot/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;