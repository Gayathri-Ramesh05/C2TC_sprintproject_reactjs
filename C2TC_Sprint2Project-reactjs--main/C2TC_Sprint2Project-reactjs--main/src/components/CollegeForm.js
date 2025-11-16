import React, { useEffect, useState } from 'react';
import { addCollege, updateCollege } from '../api';

const empty = {
  collegeId: '',
  collegeName: '',
  collegeLocation: '',
  collegeEmail: '',
  collegePhone: '',
  collegeType: '',
  studentCount: ''
};

export default function CollegeForm({ editing, onSaved, onCancel }) {
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editing) {
      setForm({
        collegeId: editing.collegeId || '',
        collegeName: editing.collegeName || '',
        collegeLocation: editing.collegeLocation || '',
        collegeEmail: editing.collegeEmail || '',
        collegePhone: editing.collegePhone || '',
        collegeType: editing.collegeType || '',
        studentCount: editing.studentCount || ''
      });
    } else {
      setForm(empty);
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        collegeId: Number(form.collegeId),
        collegeName: form.collegeName,
        collegeLocation: form.collegeLocation,
        collegeEmail: form.collegeEmail,
        collegePhone: form.collegePhone,
        collegeType: form.collegeType,
        studentCount: Number(form.studentCount)
      };

      if (editing) {
        // For update: API expects College object (save will update by ID)
        await updateCollege(payload);
        setMessage('Updated successfully');
      } else {
        await addCollege(payload);
        setMessage('Added successfully');
      }
      onSaved();
      setTimeout(() => setMessage(''), 2000);
      setForm(empty);
    } catch (err) {
      console.error(err);
      setMessage('Error saving');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <label>College ID</label>
        <input name="collegeId" value={form.collegeId} onChange={handleChange} required />

        <label>College Name</label>
        <input name="collegeName" value={form.collegeName} onChange={handleChange} required />

        <label>Location</label>
        <input name="collegeLocation" value={form.collegeLocation} onChange={handleChange} required />

        <label>Email</label>
        <input name="collegeEmail" value={form.collegeEmail} onChange={handleChange} type="email" required />

        <label>Phone</label>
        <input name="collegePhone" value={form.collegePhone} onChange={handleChange} required />

        <label>Type</label>
        <input name="collegeType" value={form.collegeType} onChange={handleChange} />

        <label>Student Count</label>
        <input name="studentCount" value={form.studentCount} onChange={handleChange} type="number" />

        <div className="form-actions">
          <button type="submit">{editing ? 'Update' : 'Add College'}</button>
          {editing && <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
      {message && <div className="form-message">{message}</div>}
    </div>
  );
}
