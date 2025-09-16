// src/modules/Student/StudentDashboard.jsx

import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Attendance from './Attendance.jsx';
import Marks from './Marks.jsx';
import Grievance from './Grievance.jsx';

function StudentDashboard() {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <nav>
        <Link to="attendance">Attendance</Link> |{" "}
        <Link to="marks">Marks</Link> |{" "}
        <Link to="grievance">Grievance</Link>
      </nav>

      <Routes>
        <Route path="attendance" element={<Attendance />} />
        <Route path="marks" element={<Marks />} />
        <Route path="grievance" element={<Grievance />} />
        <Route path="" element={<p>Select a module.</p>} />
      </Routes>
    </div>
  );
}

export default StudentDashboard;
