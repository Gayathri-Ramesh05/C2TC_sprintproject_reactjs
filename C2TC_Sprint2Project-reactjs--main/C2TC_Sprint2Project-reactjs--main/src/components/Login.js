import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Simple authentication logic
    if (username === 'admin' && password === 'admin') {
      onLogin({ username: 'admin' });
      navigate('/'); // ✅ Redirect to home page
    } else {
      setError('Invalid credentials. Use admin/admin to login.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>College Service Login</h2>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <div className="error">{error}</div>}
        <div className="login-hint">Hint: admin / admin</div>
      </div>
    </div>
  );
}
