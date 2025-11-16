import React from 'react';
import { deleteCollege } from '../api';
import './CollegeList.css'; // import styling for consistency

export default function CollegeCard({ college, onEdit, onDeleted }) {
  const id = college.collegeId ?? college.id;

  // Handle delete action
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${college.collegeName}?`)) return;
    try {
      await deleteCollege(id);
      onDeleted();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete the college record. Please try again.');
    }
  };

  return (
    <div className="college-card">
      <h3>{college.collegeName}</h3>

      <p className="meta"><b>📍 Location:</b> {college.collegeLocation}</p>
      <p className="meta"><b>📧 Email:</b> {college.collegeEmail}</p>
      <p className="meta"><b>📞 Phone:</b> {college.collegePhone}</p>
      <p className="meta"><b>🏫 Type:</b> {college.collegeType}</p>
      <p className="meta"><b>👩‍🎓 Students:</b> {college.studentCount}</p>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => onEdit(college)}>
          ✏️ Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
