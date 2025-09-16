// src/modules/Common/Unauthorized.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Unauthorized</h1>
      <p className="lead">You do not have permission to view this page.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}

export default Unauthorized;
