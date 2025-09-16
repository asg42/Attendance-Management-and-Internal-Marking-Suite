import React, { useState } from 'react';

function LockSubmissions() {
  // Mock state: locks for marks and attendance
  const [locks, setLocks] = useState({
    marksLocked: false,
    attendanceLocked: false,
  });

  const toggleLock = (type) => {
    setLocks((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div>
      <h2>Lock Submissions</h2>
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={locks.marksLocked}
          onChange={() => toggleLock('marksLocked')}
          id="marksLock"
        />
        <label className="form-check-label" htmlFor="marksLock">
          Lock Marks Submission
        </label>
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          checked={locks.attendanceLocked}
          onChange={() => toggleLock('attendanceLocked')}
          id="attendanceLock"
        />
        <label className="form-check-label" htmlFor="attendanceLock">
          Lock Attendance Submission
        </label>
      </div>

      <div className="mt-3">
        <strong>Current Status:</strong>
        <ul>
          <li>Marks Submission: {locks.marksLocked ? 'Locked' : 'Unlocked'}</li>
          <li>Attendance Submission: {locks.attendanceLocked ? 'Locked' : 'Unlocked'}</li>
        </ul>
      </div>
    </div>
  );
}

export default LockSubmissions;
