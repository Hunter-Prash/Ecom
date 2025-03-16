import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/context';

const AdminDashboard = () => {
  const { auth } = useAuth();
  return (
    <>
      <h1 style={{ color: 'black', fontSize: '24px', margin: '10px', padding: '10px' }}>Admin Dashboard</h1>
      <div className="admin-dashboard">

        <div>
          <h4 style={{ color: 'black', fontSize: '24px', margin: '10px', padding: '10px' }}>{auth?.user ? auth.user.name : ''}</h4>
          <h4 style={{ color: 'black', fontSize: '24px', margin: '10px', padding: '10px' }}>{auth?.user ? auth.user.email : ''}</h4>
          <h4 style={{ color: 'black', fontSize: '24px', margin: '10px', padding: '10px' }}>{auth?.user ? auth.user.phone : ''}</h4>

        </div>

        <div className="nav-links-group">
          <NavLink to='/dashboard/admin/create-category' className="nav-link-item" activeClassName="active">Create Category</NavLink>
          <NavLink to='/dashboard/admin/create-product' className="nav-link-item" activeClassName="active">Create Product</NavLink>
          <NavLink to='/dashboard/admin/create-users' className="nav-link-item" activeClassName="active">Users</NavLink>
        </div>
      </div>
    </>

  );
};

export default AdminDashboard;