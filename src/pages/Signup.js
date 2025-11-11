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

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_type, setUserType] = useState(''); // default user type
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!username || !email || !password || !user_type) {
      setError('Please fill in all fields');
      return;
    }

    const signupData = { username, email, password, user_type }; // Include userType

    try {
      const response = await fetch('http://192.168.1.75/admin-management/register_admin', {
        method: 'POST',
        body: JSON.stringify(signupData),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok) {
        setError('');
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error during signup:', error);
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
          Sign Up
        </h2>

        {/* Username Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 15, color: '#34495e', fontWeight: 500 }}>Username</label>
          <input
            type="text"
            placeholder="Enter username"
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

        {/* Email Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 15, color: '#34495e', fontWeight: 500 }}>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* User Type Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 15, color: '#34495e', fontWeight: 500 }}>User Type</label>
          <select
            value={user_type}
            onChange={(e) => setUserType(e.target.value)}
            style={{
              padding: '10px 12px',
              border: '1px solid #b2bec3',
              borderRadius: 6,
              fontSize: 15,
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Sign Up Button */}
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
          Sign Up
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

        {/* Login Link */}
        <div
          style={{
            marginTop: 12,
            fontSize: 13,
            color: '#34495e',
            textAlign: 'center',
          }}
        >
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#2980b9', textDecoration: 'none' }}>
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
