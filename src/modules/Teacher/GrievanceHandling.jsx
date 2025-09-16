import React, { useState, useEffect } from 'react';

function GrievanceHandling() {
  // Mock grievance data (can be replaced with API calls)
  const [grievances, setGrievances] = useState(() => {
    const saved = localStorage.getItem('teacherGrievances');
    return saved ? JSON.parse(saved) : [
      { id: 1, studentName: 'Alice Johnson', subject: 'Marks discrepancy', description: 'Marks not updated properly.', response: '', status: 'Pending' },
      { id: 2, studentName: 'Bob Smith', subject: 'Attendance issue', description: 'Attendance not reflecting.', response: '', status: 'Pending' },
    ];
  });

  const [responses, setResponses] = useState({});

  useEffect(() => {
    localStorage.setItem('teacherGrievances', JSON.stringify(grievances));
  }, [grievances]);

  const handleResponseChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const handleRespond = (id) => {
    const responseText = responses[id];
    if (!responseText) {
      alert('Please enter a response.');
      return;
    }
    setGrievances(prev => prev.map(g => g.id === id ? { ...g, response: responseText, status: 'Responded' } : g));
    setResponses(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div>
      <h2>Grievance Handling</h2>
      {grievances.length === 0 ? (
        <p>No grievances to handle.</p>
      ) : (
        grievances.map(g => (
          <div key={g.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{g.studentName} - {g.subject} <small>({g.status})</small></h5>
              <p className="card-text">{g.description}</p>
              {g.response ? (
                <p><strong>Response:</strong> {g.response}</p>
              ) : (
                <>
                  <textarea
                    className="form-control mb-2"
                    rows="2"
                    placeholder="Enter your response"
                    value={responses[g.id] || ''}
                    onChange={e => handleResponseChange(g.id, e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={() => handleRespond(g.id)}>Submit Response</button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default GrievanceHandling;
