import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';

import Login from './modules/UserManagement/Login.jsx';
import StudentDashboard from './modules/Student/StudentDashboard.jsx';
import TeacherDashboard from './modules/Teacher/TeacherDashboard.jsx';
import AttendanceManagement from './modules/Teacher/AttendanceManagement.jsx';
import MarksManagement from './modules/Teacher/MarksManagement.jsx';
import GrievanceHandling from './modules/Teacher/GrievanceHandling.jsx';

import AdminDashboard from './modules/Admin/AdminDashboard.jsx';
import UserManagement from './modules/Admin/UserManagement.jsx';
import SubjectManagement from './modules/Admin/SubjectManagement.jsx';
import LockSubmissions from './modules/Admin/LockSubmissions.jsx';
import AnalyticsDashboard from './modules/Admin/AnalyticsDashboard.jsx';
import GrievanceMonitoring from './modules/Admin/GrievanceMonitoring.jsx';

import NotFound from './modules/Common/NotFound.jsx';
import Unauthorized from './modules/Common/Unauthorized.jsx';

function RequireAuth({ user, allowedRoles, children }) {
  const location = useLocation();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  return children;
}

function Navbar({ user, onLogout }) {
  const role = user?.role;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary">
      <div className="container">
        {user && (
          <button className="btn btn-outline-light me-3" onClick={onLogout}>
            Logout
          </button>
        )}
        <Link className="navbar-brand" to="/">
          AIMS
        </Link>
        {user && (
          <div className="navbar-nav">
            <Link className="nav-link" to={`/${role}`}>
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* Redirect root URL to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/student/*"
          element={
            <RequireAuth user={user} allowedRoles={['student']}>
              <StudentDashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/teacher/*"
          element={
            <RequireAuth user={user} allowedRoles={['teacher']}>
              <TeacherDashboard />
            </RequireAuth>
          }
        >
          <Route path="attendance" element={<AttendanceManagement key="attendance" />} />
          <Route path="marks" element={<MarksManagement key="marks" />} />
          <Route path="grievance" element={<GrievanceHandling key="grievance" />} />
          <Route path="" element={<p>Please select a module.</p>} />
        </Route>

        <Route
          path="/admin/*"
          element={
            <RequireAuth user={user} allowedRoles={['admin']}>
              <AdminDashboard />
            </RequireAuth>
          }
        >
          <Route path="users" element={<UserManagement />} />
          <Route path="subjects" element={<SubjectManagement />} />
          <Route path="locks" element={<LockSubmissions />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="grievances" element={<GrievanceMonitoring />} />
          <Route path="" element={<p>Please select a module.</p>} />
        </Route>

        {/* Catch-all 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
