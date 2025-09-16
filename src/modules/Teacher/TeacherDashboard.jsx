import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function TeacherDashboard() {
  console.log("Rendering TeacherDashboard");
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/teacher/attendance" style={{ marginRight: '1rem' }}>Manage Attendance</Link>
        <Link to="/teacher/marks" style={{ marginRight: '1rem' }}>Manage Marks</Link>
        <Link to="/teacher/grievance">Handle Grievances</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default TeacherDashboard;
