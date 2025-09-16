import React, { useEffect, useState } from 'react';

function AttendanceManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=10')
      .then(res => res.json())
      .then(data => {
        setStudents(data.users);
        // Initialize all marked present by default
        const initAttendance = {};
        data.users.forEach(u => {
          initAttendance[u.id] = true;
        });
        setAttendance(initAttendance);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleAttendance = (id) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now just alert saved data
    alert('Attendance saved: ' + JSON.stringify(attendance));
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div>
      <h2>Manage Attendance</h2>
      <form onSubmit={handleSubmit}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map(st => (
              <tr key={st.id}>
                <td>{st.firstName} {st.lastName}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={attendance[st.id] || false}
                    onChange={() => toggleAttendance(st.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary">Save Attendance</button>
      </form>
    </div>
  );
}

export default AttendanceManagement;
