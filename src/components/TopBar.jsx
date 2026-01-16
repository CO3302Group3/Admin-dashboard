import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

const TopBar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Users', path: '/view-users' },
    { label: 'Transactions', path: '/transactions' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Slots', path: '/view-slots' },
    { label: 'Notifications', path: '/notifications' },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: 'rgba(10, 25, 41, 0.8)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="primary" sx={{ mr: 2 }}>
          <DashboardIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #00e5ff, #7c4dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px'
          }}
        >
          Admin Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#00e5ff' : 'rgba(255,255,255,0.7)',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: location.pathname === item.path ? '100%' : '0%',
                  height: '2px',
                  bgcolor: '#00e5ff',
                  transition: 'width 0.3s'
                },
                '&:hover': {
                  color: '#fff',
                  '&::after': {
                    width: '100%'
                  }
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
