// src/modules/Teacher/TeacherDashboard.jsx

import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AttendanceManagement from './AttendanceManagement.jsx';
import MarksManagement from './MarksManagement.jsx';
import GrievanceHandling from './GrievanceHandling.jsx';

function TeacherDashboard() {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="attendance" style={{ marginRight: '1rem' }}>Manage Attendance</Link>
        <Link to="marks" style={{ marginRight: '1rem' }}>Manage Marks</Link>
        <Link to="grievance">Handle Grievances</Link>
      </nav>

      <Routes>
        <Route path="attendance" element={<AttendanceManagement />} />
        <Route path="marks" element={<MarksManagement />} />
        <Route path="grievance" element={<GrievanceHandling />} />
        <Route path="" element={<p>Please select a module.</p>} />
      </Routes>
    </div>
  );
}

export default TeacherDashboard;
