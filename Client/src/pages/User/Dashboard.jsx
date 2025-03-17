import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/context.jsx';

const Dashboard = () => {
  const { auth } = useAuth();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User Dashboard</h1>
      <div className="dashboard-content">
        <div className="user-info">
          <h4>{auth?.user ? auth.user.name : ''}</h4>
          <h4>{auth?.user ? auth.user.email : ''}</h4>
          <h4>{auth?.user ? auth.user.phone : ''}</h4>
        </div>
        <div className="nav-links-group">
          <NavLink to='/dashboard/user/profile' className="nav-link-item" activeClassName="active">Profile</NavLink>
          <NavLink to='/dashboard/user/orders' className="nav-link-item" activeClassName="active">Orders</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;