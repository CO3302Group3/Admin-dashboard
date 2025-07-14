import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formStyle = {
  background: 'rgba(255, 255, 255, 0.55)', // Light, semi-transparent white
  padding: '40px 32px',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(8, 8, 38, 0.10)', // Lighter shadow
  width: '350px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  backdropFilter: 'blur(8px)', // Glassmorphism effect
  border: '1px solid rgba(255,255,255,0.25)',
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(40, 80, 120, 0.25)', // Very light blue overlay, adjust alpha for shadow
  zIndex: 0,
};

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
      navigate('')
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/backgroundimage.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Overlay for reducing shadow */}
      <div style={overlayStyle}></div>
      <form style={{ ...formStyle, zIndex: 1 }} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', color: '#2980b9', marginBottom: 10, letterSpacing: 1 }}>Admin Login</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 15, color: '#34495e', fontWeight: 500 }}>Username</label>
          <input
            type="text"
            placeholder="Enter admin username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            style={{
              padding: '10px 12px',
              border: '1px solid #b2bec3',
              borderRadius: 6,
              fontSize: 15,
              transition: 'border 0.2s'
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 15, color: '#34495e', fontWeight: 500 }}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: '10px 12px',
              border: '1px solid #b2bec3',
              borderRadius: 6,
              fontSize: 15,
              transition: 'border 0.2s'
            }}
          />
        </div>
        <button
  type="submit"
  style={{
    marginTop: 8,
    padding: '6px 16px', // 6px vertical, 16px horizontal
    background: 'linear-gradient(90deg, #2980b9, #6dd5fa)',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 13, // smaller font
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s',
    boxShadow: '0 2px 8px rgba(52, 152, 219, 0.08)'
  }}
>
  Login
</button>
        
        {error && (
          <div style={{
            color: '#e74c3c',
            background: '#fdecea',
            borderRadius: 4,
            padding: 8,
            marginTop: 8,
            textAlign: 'center',
            fontSize: 14
          }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;