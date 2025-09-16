import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/admin/users" style={{ marginRight: '1rem' }}>User Management</Link>
        <Link to="/admin/subjects" style={{ marginRight: '1rem' }}>Subject Management</Link>
        <Link to="/admin/locks" style={{ marginRight: '1rem' }}>Lock Submissions</Link>
        <Link to="/admin/analytics" style={{ marginRight: '1rem' }}>Analytics & Dashboards</Link>
        <Link to="/admin/grievances">Grievance Monitoring</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default AdminDashboard;
