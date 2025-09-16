import React, { useEffect, useState } from 'react';

function MarksManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=10')
      .then(res => res.json())
      .then(data => {
        setStudents(data.users);
        const initMarks = {};
        data.users.forEach(u => {
          initMarks[u.id] = '';
        });
        setMarks(initMarks);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (id, value) => {
    setMarks(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Marks saved: ' + JSON.stringify(marks));
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div>
      <h2>Manage Marks</h2>
      <form onSubmit={handleSubmit}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map(st => (
              <tr key={st.id}>
                <td>{st.firstName} {st.lastName}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={marks[st.id] || ''}
                    onChange={e => handleChange(st.id, e.target.value)}
                    className="form-control"
                    style={{ maxWidth: '100px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary">Save Marks</button>
      </form>
    </div>
  );
}

export default MarksManagement;
