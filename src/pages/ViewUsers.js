import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme
} from '@mui/material';
import {
  People as PeopleIcon,
  VerifiedUser as VerifiedUserIcon,
  Block as BlockIcon,
  History as HistoryIcon,
  Report as ReportIcon,
  Devices as DevicesIcon
} from '@mui/icons-material';

const ViewUsers = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'View All Users',
      description: 'List all registered users in the system with filters and search.',
      icon: <PeopleIcon sx={{ fontSize: 50, color: '#00e5ff' }} />,
      path: '/viewall-users',
      btnText: 'Open List',
      btnColor: 'primary'
    },
    {
      title: 'Verify Agents',
      description: 'Approve or reject agents requesting to register.',
      icon: <VerifiedUserIcon sx={{ fontSize: 50, color: '#00e676' }} />,
      path: '/verifyagent',
      btnText: 'Verify Requests',
      btnColor: 'success'
    },
    {
      title: 'Suspend / Ban',
      description: 'Block users who violate system policies.',
      icon: <BlockIcon sx={{ fontSize: 50, color: '#ff1744' }} />,
      path: '/suspend-user',
      btnText: 'Manage Bans',
      btnColor: 'error'
    },
    {
      title: 'User Activity',
      description: 'Track login times, bookings, and session history.',
      icon: <HistoryIcon sx={{ fontSize: 50, color: '#ff9100' }} />,
      path: '/view-user-activity',
      btnText: 'View Logs',
      btnColor: 'warning'
    },
    {
      title: 'User Complaints',
      description: 'Handle user-reported issues or feedback.',
      icon: <ReportIcon sx={{ fontSize: 50, color: '#d500f9' }} />,
      path: '#', // Placeholder
      btnText: 'View Reports',
      btnColor: 'secondary'
    },
    {
      title: 'Connected Devices',
      description: 'Check which devices are linked to user accounts.',
      icon: <DevicesIcon sx={{ fontSize: 50, color: '#2979ff' }} />,
      path: '#', // Placeholder
      btnText: 'View Devices',
      btnColor: 'info'
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
            mb: 6,
            textShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
          }}
        >
          👥 User Management Hub
        </Typography>

        <Grid container spacing={4}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 30px ${theme.palette[item.btnColor]?.main || '#fff'}40`, // dynamic shadow color
                  }
                }}
              >
                <Box sx={{ mb: 2, p: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
                  {item.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                  {item.description}
                </Typography>
                <Button
                  variant="outlined"
                  color={item.btnColor}
                  fullWidth
                  onClick={() => navigate(item.path)}
                  sx={{ borderRadius: '20px', fontWeight: 'bold' }}
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

export default ViewUsers;
