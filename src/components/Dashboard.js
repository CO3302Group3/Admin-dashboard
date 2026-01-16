import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        background: `linear-gradient(rgba(10, 25, 41, 0.8), rgba(10, 25, 41, 0.95)), url(${process.env.PUBLIC_URL}/assets/backgroundimage.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
            animation: 'fadeIn 1s ease-in'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #00e5ff, #7c4dff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textShadow: '0 0 40px rgba(0, 229, 255, 0.3)'
            }}
          >
            🚀 Welcome, Admin!
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
            Command Center Active. Monitor users, analyze transactions, and manage system alerts efficiently.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard
              icon={<GroupIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />}
              title="Manage Users"
              description="Add, verify, or suspend users and agents with real-time updates."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard
              icon={<BarChartIcon sx={{ fontSize: 50, color: theme.palette.secondary.main }} />}
              title="Monitor Analytics"
              description="Track revenue, parking slot usage, and performance metrics."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DashboardCard
              icon={<NotificationsActiveIcon sx={{ fontSize: 50, color: '#ff9100' }} />}
              title="Handle Alerts"
              description="Respond to system notifications and user reports instantly."
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const DashboardCard = ({ icon, title, description }) => (
  <Card
    sx={{
      height: '100%',
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-12px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        borderColor: 'primary.main',
        '& .icon-box': {
          transform: 'scale(1.1) rotate(5deg)'
        }
      }
    }}
  >
    <CardContent>
      <Box
        className="icon-box"
        sx={{
          mb: 3,
          transition: 'transform 0.3s ease',
          display: 'inline-flex',
          p: 2,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.05)'
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default Dashboard;
