import React, { useState } from 'react';

function SubjectManagement() {
  // Mock subjects state
  const [subjects, setSubjects] = useState([
    { id: 1, code: 'CS101', name: 'Computer Science Basics' },
    { id: 2, code: 'MA102', name: 'Mathematics II' },
  ]);

  const [formState, setFormState] = useState({ id: null, code: '', name: '' });
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setFormState({ id: null, code: '', name: '' });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!formState.code || !formState.name) return alert('Please enter code and name');

    const newSubject = {
      id: subjects.length ? Math.max(...subjects.map(s => s.id)) + 1 : 1,
      code: formState.code,
      name: formState.name,
    };

    setSubjects([...subjects, newSubject]);
    resetForm();
  };

  const handleEditSubject = (subject) => {
    setFormState(subject);
    setIsEditing(true);
  };

  const handleUpdateSubject = (e) => {
    e.preventDefault();
    setSubjects(subjects.map(s => (s.id === formState.id ? formState : s)));
    resetForm();
  };

  const handleDeleteSubject = (id) => {
    if (window.confirm('Are you sure to delete this subject?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  return (
    <div>
      <h2>Subject Management</h2>

      <form onSubmit={isEditing ? handleUpdateSubject : handleAddSubject} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Subject Code</label>
          <input
            type="text"
            name="code"
            value={formState.code}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Subject Name</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {isEditing ? 'Update Subject' : 'Add Subject'}
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
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No subjects found</td>
            </tr>
          ) : (
            subjects.map(subject => (
              <tr key={subject.id}>
                <td>{subject.code}</td>
                <td>{subject.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditSubject(subject)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteSubject(subject.id)}
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

export default SubjectManagement;
