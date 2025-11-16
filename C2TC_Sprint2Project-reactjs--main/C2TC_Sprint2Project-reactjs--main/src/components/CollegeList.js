import React from 'react';
import CollegeCard from './CollegeCard';
import './CollegeList.css';


export default function CollegeList({ colleges, onEdit, onDeleted }) {
  if (!colleges || colleges.length === 0) {
    return <div className="no-data">No records found.</div>;
  }

  return (
    <div className="card-grid">
      {colleges.map((c) => (
        <CollegeCard key={c.collegeId || c.id} college={c} onEdit={onEdit} onDeleted={onDeleted} />
      ))}
    </div>
  );
}
