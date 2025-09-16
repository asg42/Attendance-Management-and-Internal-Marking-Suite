// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';

import Login from './modules/UserManagement/Login.jsx';
import StudentDashboard from './modules/Student/StudentDashboard.jsx';
import TeacherDashboard from './modules/Teacher/TeacherDashboard.jsx';
import AdminDashboard from './modules/Admin/AdminDashboard.jsx';

// Role-based route guard component
function RequireAuth({ user, allowedRoles, children }) {
  const location = useLocation();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// Navbar component showing logout and role-specific links
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
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

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
        />

        <Route
          path="/admin/*"
          element={
            <RequireAuth user={user} allowedRoles={['admin']}>
              <AdminDashboard />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to={user ? `/${user.role}` : '/login'} replace />} />
      </Routes>
    </>
  );
}

export default function RouterWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
