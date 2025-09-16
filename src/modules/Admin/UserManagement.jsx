import React, { useState } from 'react';

function UserManagement() {
  // Mock users state
  const [users, setUsers] = useState([
    { id: 1, username: 'student1', role: 'student' },
    { id: 2, username: 'teacher1', role: 'teacher' },
    { id: 3, username: 'admin1', role: 'admin' },
  ]);

  const [formState, setFormState] = useState({ id: null, username: '', role: 'student' });
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setFormState({ id: null, username: '', role: 'student' });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!formState.username) return alert('Username is required');

    const newUser = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      username: formState.username,
      role: formState.role,
    };

    setUsers([...users, newUser]);
    resetForm();
  };

  const handleEditUser = (user) => {
    setFormState(user);
    setIsEditing(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setUsers(users.map(u => (u.id === formState.id ? formState : u)));
    resetForm();
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div>
      <h2>User Management</h2>

      <form onSubmit={isEditing ? handleUpdateUser : handleAddUser} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            name="role"
            value={formState.role}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {isEditing ? 'Update User' : 'Add User'}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No users found</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
