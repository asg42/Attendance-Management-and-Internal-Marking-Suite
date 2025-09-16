// src/modules/UserManagement/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation and dummy login
    if (username && password) {
      // Assign role based on selection
      onLogin({ username, role });
      navigate(`/${role}`);
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input 
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            id="role"
            className="form-select"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
