import React from 'react';

function AnalyticsDashboard() {
  // Mock data
  const stats = {
    totalStudents: 120,
    totalTeachers: 15,
    totalSubjects: 20,
    avgStudentAttendance: '85%',
    avgMarks: '78',
  };

  return (
    <div>
      <h2>Analytics & Dashboards</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Students</h5>
              <p className="card-text fs-2">{stats.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Total Teachers</h5>
              <p className="card-text fs-2">{stats.totalTeachers}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Total Subjects</h5>
              <p className="card-text fs-2">{stats.totalSubjects}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4>Attendance & Marks Summary</h4>
        <ul>
          <li>Average Student Attendance: {stats.avgStudentAttendance}</li>
          <li>Average Marks: {stats.avgMarks}</li>
        </ul>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
