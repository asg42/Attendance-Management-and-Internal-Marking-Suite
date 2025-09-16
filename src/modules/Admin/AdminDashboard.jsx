// src/modules/Admin/AdminDashboard.jsx

import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="users">Manage Users</Link> |{" "}
        <Link to="subjects">Manage Subjects</Link> |{" "}
        <Link to="analytics">View Analytics</Link>
      </nav>

      <Routes>
        <Route path="users" element={<p>User management placeholder</p>} />
        <Route path="subjects" element={<p>Subject management placeholder</p>} />
        <Route path="analytics" element={<p>Analytics and reports placeholder</p>} />
        <Route path="" element={<p>Select a module.</p>} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;
