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

import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/User/Dashboard.jsx';

import Forgot from './pages/Forgot.jsx';

import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import CreateCategory from './pages/Admin/CreateCategory.jsx';
import CreateProduct from './pages/Admin/CreateProduct.jsx';
import Users from './pages/Admin/Users.jsx';
import Profile from './pages/User/Profile.jsx';
import Orders from './pages/User/Orders.jsx';
import Products from './pages/Admin/Products.jsx';
import SingleProduct from './pages/Admin/SingleProduct.jsx';
import Search from './pages/Search.jsx';

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
        <Route path="/search" element={<Search />} />

        <Route path='/admin' element={//ProtectedAdminRoute is a custom component that checks if the user is authenticated and has admin privileges before rendering the AdminDashboard component. If the user is not authenticated or does not have admin privileges, the user is redirected to the login page.AdminDashboard is inside the ProtectedAdminRoute component which is its child.Children are rendered only if the parent component renders them.Sometimes the opposite is true, where the parent component is rendered only if the child component is rendered.
          <ProtectedAdminRoute>
            <AdminDashboard/>
          </ProtectedAdminRoute>
        }></Route>

        <Route
          path="/dashboard"
          element={//ProtectedRoute is a custom component that checks if the user is authenticated before rendering the Dashboard component. If the user is not authenticated, the user is redirected to the login page.Dashboard is inside the ProtectedRoute component which is its child.Children are rendered only if the parent component renders them.Sometimes the opposite is true, where the parent component is rendered only if the child component is rendered.
            <ProtectedRoute>
              <Dashboard />    
            </ProtectedRoute>
          }
        />




        <Route path="/forgotpassword" element={<Forgot/>} />

        {/* Admin pages*/}
        <Route path='/dashboard/admin/create-category' element={<CreateCategory/>}></Route>
        <Route path='/dashboard/admin/create-product' element={<CreateProduct/>}></Route>
        <Route path='/dashboard/admin/create-users' element={<Users/>}></Route>
        <Route path='/dashboard/admin/products' element={<Products/>}></Route>
        <Route path='/dashboard/admin/singleProduct' element={<SingleProduct/>}></Route>
        {/* User pages */}
        <Route path='/dashboard/user/profile' element={<Profile/>}></Route>
        <Route path='/dashboard/user/orders' element={<Orders/>}></Route>


        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;