import React, { useEffect, useState } from 'react';
import CollegeForm from './CollegeForm';
import CollegeList from './CollegeList';
import { getAllColleges } from '../api';

export default function Home({ user, onLogout }) {
  const [colleges, setColleges] = useState([]);
  const [editingCollege, setEditingCollege] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, [refreshKey]);

  const fetchAll = async () => {
    try {
      const res = await getAllColleges();
      setColleges(res.data);
    } catch (err) {
      console.error('Error fetching colleges', err);
      setColleges([]);
    }
  };

  const triggerRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="title">College Service Dashboard</div>
        <div className="header-right">
          <span>Welcome, {user.username}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main className="main-grid">
        <aside className="left-panel">
          <h3>{editingCollege ? 'Edit College' : 'Add College'}</h3>
          <CollegeForm
            editing={editingCollege}
            onSaved={() => { setEditingCollege(null); triggerRefresh(); }}
            onCancel={() => setEditingCollege(null)}
          />
        </aside>

        <section className="content">
          <h3>College Records</h3>
          <CollegeList
            colleges={colleges}
            onEdit={(c) => setEditingCollege(c)}
            onDeleted={() => triggerRefresh()}
          />
        </section>
      </main>
    </div>
  );
}
