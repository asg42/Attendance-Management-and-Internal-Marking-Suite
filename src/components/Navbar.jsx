// Navbar.jsx or within your App.jsx file

import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link className="navbar-brand" to="/">AIMS</Link>
        {user && (
          <div className="navbar-nav">
            <Link className="nav-link" to={`/${role}`}>Dashboard</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
