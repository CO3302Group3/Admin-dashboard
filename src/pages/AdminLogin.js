import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const formStyle = {
  background: 'rgba(255, 255, 255, 0.55)',
  padding: '40px 32px',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(8, 8, 38, 0.10)',
  width: '350px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.25)',
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(40, 80, 120, 0.25)',
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
      navigate('/dashboard');
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
      <div style={overlayStyle}></div>

      <form style={{ ...formStyle, zIndex: 1 }} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', color: '#2980b9', marginBottom: 10, letterSpacing: 1 }}>
          Admin Login
        </h2>

        {/* Username Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 15, color: '#34495e', fontWeight: 500 }}>Username</label>
          <input
            type="text"
            placeholder="Enter admin username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            style={{
              padding: '10px 12px',
              border: '1px solid #b2bec3',
              borderRadius: 6,
              fontSize: 15,
              transition: 'border 0.2s',
            }}
          />
        </div>

        {/* Password Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 15, color: '#34495e', fontWeight: 500 }}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px 12px',
              border: '1px solid #b2bec3',
              borderRadius: 6,
              fontSize: 15,
              transition: 'border 0.2s',
            }}
          />
        </div>

        {/* Forgot Password */}
        <button
          type="button"
          onClick={() => alert('Redirect to Forgot Password Page')}
          style={{
            background: 'none',
            border: 'none',
            color: '#3498db',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '14px',
            padding: 0,
            alignSelf: 'flex-end',
          }}
        >
          Forgot Password?
        </button>

        {/* Login Button */}
        <button
          type="submit"
          style={{
            marginTop: 8,
            padding: '6px 16px',
            background: 'linear-gradient(90deg, #2980b9, #6dd5fa)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background 0.2s',
            boxShadow: '0 2px 8px rgba(52, 152, 219, 0.08)',
          }}
        >
          Login
        </button>

        {/* Error Message */}
        {error && (
          <div
            style={{
              color: '#e74c3c',
              background: '#fdecea',
              borderRadius: 4,
              padding: 8,
              marginTop: 8,
              textAlign: 'center',
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        {/* Sign Up Link */}
        <div
          style={{
            marginTop: 12,
            fontSize: 13,
            color: '#34495e',
            textAlign: 'center',
          }}
        >
          Don’t have an account?{' '}
          <Link to="/signup" style={{ color: '#2980b9', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
