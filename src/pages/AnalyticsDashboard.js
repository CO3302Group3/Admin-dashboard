import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  TrendingUp,
  People,
  AttachMoney,
  LocalParking
} from '@mui/icons-material';
import BackButton from '../components/BackButton';

const AnalyticsDashboard = () => {
  const theme = useTheme();

  const data = [
    { month: "Jan", users: 120, revenue: 500 },
    { month: "Feb", users: 190, revenue: 750 },
    { month: "Mar", users: 170, revenue: 600 },
    { month: "Apr", users: 220, revenue: 900 },
    { month: "May", users: 260, revenue: 1200 },
    { month: "Jun", users: 300, revenue: 1500 }
  ];

  const stats = [
    { title: 'Total Users', value: '1,250', icon: <People />, color: '#00e5ff' },
    { title: 'Monthly Revenue', value: '$12,450', icon: <AttachMoney />, color: '#00e676' },
    { title: 'Active Slots', value: '45/60', icon: <LocalParking />, color: '#ff9100' },
    { title: 'Growth Rate', value: '+15%', icon: <TrendingUp />, color: '#d500f9' },
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
        <BackButton />
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          📈 System Dashboard
        </Typography>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  background: 'rgba(19, 47, 76, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: `${stat.color}20`,
                      color: stat.color,
                      display: 'flex',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="white">
                      {stat.value}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Chart Section */}
        <Card
          sx={{
            p: 3,
            background: 'rgba(19, 47, 76, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            height: '400px'
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, color: '#fff', fontWeight: 'bold' }}>
            User Growth & Revenue
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e1e2f', borderRadius: '10px', border: 'none' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="users" fill="#00e5ff" name="Users" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="#7c4dff" name="Revenue ($)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Container>
    </Box>
  );
};

export default AnalyticsDashboard;
