import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Container,
  Alert,
  CircularProgress,
  useTheme
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  // ✅ Check token + expiry on page load
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const expiry = localStorage.getItem('token_expiry');

    if (token && expiry) {
      const now = new Date().getTime();

      if (now < parseInt(expiry, 10)) {
        // Token still valid
        if (typeof onLogin === 'function') onLogin();
        navigate('/dashboard');
      } else {
        // Token expired -> clear it
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_expiry');
      }
    } else {
      const savedEmail = localStorage.getItem('email');
      if (savedEmail) {
        setEmail(savedEmail);
      }
    }
  }, [navigate, onLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const loginData = { email, password };
    const basicAuth = 'Basic ' + btoa(`${email}:${password}`);

    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.8.186/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth,
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log('Login Response:', data);

      if (response.ok) {
        setError('');
        if (rememberMe) { // Fixed logic: only save if checked
          localStorage.setItem('email', email);
        }

        console.log('access_token:', data.data.access_token);
        localStorage.setItem('access_token', data.data.access_token);

        if (typeof onLogin === 'function') onLogin();
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(rgba(10, 25, 41, 0.7), rgba(10, 25, 41, 0.9)), url(${process.env.PUBLIC_URL}/assets/backgroundimage.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(19, 47, 76, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Box
            sx={{
              m: 1,
              bgcolor: 'primary.main',
              borderRadius: '50%',
              p: 2,
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)'
            }}
          >
            <LockOutlinedIcon sx={{ color: 'black', fontSize: 30 }} />
          </Box>
          <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'white' }}>
            Admin Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover fieldset': { borderColor: 'primary.main' },
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover fieldset': { borderColor: 'primary.main' },
                }
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember me"
              />
              <RouterLink to="#" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontSize: '14px' }}>
                Forgot password?
              </RouterLink>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '16px',
                background: 'linear-gradient(45deg, #00e5ff, #00b0ff)',
                color: 'black',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00b0ff, #00e5ff)',
                }
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <RouterLink to="/admin/signup" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 'bold' }}>
                  Sign Up
                </RouterLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
