import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  useTheme,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  LocalParking as LocalParkingIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  Policy as PolicyIcon
} from '@mui/icons-material';

const ViewSlots = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'View All Parking Slots',
      description: 'Explore all available parking areas registered in the system.',
      icon: <LocalParkingIcon sx={{ fontSize: 60, color: '#00e5ff' }} />,
      btnText: 'View Slots',
      btnColor: 'primary',
      path: '/view-all-slots'
    },
    {
      title: 'Approve / Reject Slots',
      description: 'Manage new slot registration requests from providers.',
      icon: <PlaylistAddCheckIcon sx={{ fontSize: 60, color: '#00e676' }} />,
      btnText: 'Review Requests',
      btnColor: 'success',
      path: '/verifyagent'
    },
    {
      title: 'Policies & Compliance',
      description: 'Update legal agreements and ensure user compliance.',
      icon: <PolicyIcon sx={{ fontSize: 60, color: '#ff9100' }} />,
      btnText: 'Manage Policies',
      btnColor: 'warning',
      path: '/policies'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #1a237e 100%)`,
        pt: 5,
        pb: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #00e5ff, #7c4dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 8,
            textShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
          }}
        >
          🚗 Parking Slot Management
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {menuItems.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 4,
                  background: 'rgba(19, 47, 76, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 15px 35px ${theme.palette[item.btnColor]?.main || '#fff'}40`,
                  }
                }}
              >
                <Box sx={{ mb: 3, p: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
                  {item.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, flexGrow: 1 }}>
                  {item.description}
                </Typography>
                <Button
                  variant="outlined"
                  color={item.btnColor}
                  fullWidth
                  size="large"
                  sx={{ borderRadius: '20px', fontWeight: 'bold' }}
                  onClick={() => item.path && navigate(item.path)}
                >
                  {item.btnText}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ViewSlots;
