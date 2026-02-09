import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  InputAdornment,
  Chip,
  Alert,
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
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import BackButton from '../components/BackButton';

const ViewUserActivity = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [monthlyActivity, setMonthlyActivity] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetchUserActivity();
  }, []);

  const fetchUserActivity = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access_token") || localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/auth/users/activity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || `Server error: ${response.status}`);
      }

      const apiResponse = await response.json();
      console.log("API Response:", apiResponse);

      // Same logic as before to handle different response structures
      if (apiResponse && apiResponse.username) {
        const user = apiResponse;
        const userType = user.user_type || "user";

        if (userType === "user") {
          const singleUserArray = [user];
          setUsers(singleUserArray);
          setSelectedUser(user);
          setError(null);

          const loginCount = user.login_count || 1;
          const chartData = [{
            name: user.username || user.email,
            logins: loginCount,
            lastLogin: user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : "Never",
            status: user.status
          }];
          setChartData(chartData);
        } else {
          throw new Error(`This page is for regular users only. User type: ${userType}`);
        }
      } else if (apiResponse.success && apiResponse.data) {
        const users = Array.isArray(apiResponse.data) ? apiResponse.data : apiResponse.data.users || [];
        const filteredUsers = users.filter(u => u.user_type === "user");

        if (filteredUsers.length === 0) {
          throw new Error("No regular users found");
        }

        setUsers(filteredUsers);
        setFilteredUsers(filteredUsers);
        setError(null);

        const chartData = filteredUsers.map((user) => ({
          name: user.username || user.email,
          logins: user.login_count || 0,
          lastLogin: user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : "Never",
        }));
        setChartData(chartData);

        // Calculate Monthly Activity
        const monthCounts = {};
        filteredUsers.forEach(user => {
          if (user.last_login_at) {
            const date = new Date(user.last_login_at);
            const month = date.toLocaleString('default', { month: 'short' }); // e.g., "Jan"
            monthCounts[month] = (monthCounts[month] || 0) + 1;
          }
        });

        const activityData = Object.keys(monthCounts).map(month => ({
          month,
          users: monthCounts[month]
        }));
        // Sort by month order roughly (optional, improved by mapping to index if needed, effectively random if not sorted)
        const monthsOrder = { "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12 };
        activityData.sort((a, b) => monthsOrder[a.month] - monthsOrder[b.month]);

        setMonthlyActivity(activityData);
      } else {
        throw new Error(apiResponse.message || "Failed to fetch user activity");
      }
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredUsers(users);
      // Don't auto-deselect if searching, but logic largely depends on requirement
      return;
    }

    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.id.toString().includes(term)
    );
    setFilteredUsers(filtered);

    // Update filtered chart data
    const newChartData = filtered.map((user) => ({
      name: user.username || user.email,
      logins: user.login_count || 0,
      lastLogin: user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : "Never",
    }));
    setChartData(newChartData);

    // Auto-select first match if available
    if (filtered.length > 0) {
      setSelectedUser(filtered[0]);
    } else {
      setSelectedUser(null);
    }
  };

  const formatLastLogin = (dateString) => {
    if (!dateString) return "Never logged in";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusChip = (status) => {
    let color = 'default';
    let icon = null;

    switch (status) {
      case 'active':
        color = 'success';
        icon = <CheckCircleIcon fontSize="small" />;
        break;
      case 'inactive':
        color = 'warning';
        icon = <WarningIcon fontSize="small" />;
        break;
      case 'banned':
        color = 'error';
        icon = <BlockIcon fontSize="small" />;
        break;
      default:
        color = 'default';
    }

    return (
      <Chip
        label={status || 'Unknown'}
        color={color}
        icon={icon}
        variant="filled"
        sx={{ fontWeight: 'bold' }}
      />
    );
  };

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
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            mb: 2,
            textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
          }}
        >
          🔄 User Activity
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 5 }}>
          Track user sessions, login counts, and status in real-time.
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        ) : (
          <>
            {/* Search Bar */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
              <TextField
                variant="outlined"
                placeholder="Search user by name or email..."
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#00e5ff' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: '100%', md: '500px' },
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                    '&:hover fieldset': { borderColor: '#00e5ff' },
                    '&.Mui-focused fieldset': { borderColor: '#00e5ff' },
                  },
                  input: { color: '#fff' }
                }}
              />
            </Box>


            {/* Monthly Activity Chart (Full Width) */}
            <Box sx={{ mb: 4 }}>
              <Card
                sx={{
                  p: 3,
                  background: 'rgba(19, 47, 76, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, color: '#fff', fontWeight: 'bold' }}>
                  📅 Monthly Active Users (Trend)
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e1e2f', borderRadius: '10px', border: 'none' }}
                      itemStyle={{ color: '#fff' }}
                      cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                    />
                    <Legend />
                    <Bar
                      dataKey="users"
                      fill="url(#colorGradient)"
                      name="Active Users"
                      radius={[8, 8, 0, 0]}
                      barSize={60}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00e5ff" stopOpacity={1} />
                        <stop offset="100%" stopColor="#7c4dff" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Box>

            {/* User Activity Line Chart - Full Width */}
            <Box sx={{ mb: 4 }}>
              <Card
                sx={{
                  p: 3,
                  background: 'rgba(19, 47, 76, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, color: '#fff', fontWeight: 'bold' }}>
                  📈 User Activity Timeline (Connected)
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={filteredUsers.map((user) => {
                      const date = user.last_login_at ? new Date(user.last_login_at) : new Date();
                      return {
                        name: user.username,
                        monthIndex: date.getMonth(),
                        monthName: date.toLocaleString('default', { month: 'long' }),
                        logins: user.login_count || 0
                      };
                    })}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                      dataKey="name"
                      stroke="#fff"
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      dataKey="monthIndex"
                      stroke="#fff"
                      tickFormatter={(monthIndex) => {
                        const date = new Date();
                        date.setMonth(monthIndex);
                        return date.toLocaleString('default', { month: 'short' });
                      }}
                      domain={[0, 11]}
                      allowDecimals={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div style={{ backgroundColor: '#1e1e2f', padding: '10px', borderRadius: '10px', border: '1px solid #00e5ff', color: '#fff' }}>
                              <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>{data.name}</p>
                              <p style={{ margin: 0 }}>Active: <span style={{ color: '#00e5ff' }}>{data.monthName}</span></p>
                              <p style={{ margin: 0 }}>Logins: {data.logins}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="monthIndex"
                      name="Activity Month"
                      stroke="#00e5ff"
                      strokeWidth={3}
                      dot={{ r: 6, fill: '#7c4dff', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: '#00e5ff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Box>

            <Grid container spacing={4} justifyContent="center">
              {/* Selected User Details */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 3,
                    background: 'rgba(19, 47, 76, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    height: '100%'
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3, color: '#fff', fontWeight: 'bold' }}>
                    👤 User Details
                  </Typography>

                  {selectedUser ? (
                    <Box display="flex" flexDirection="column" gap={3}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
                          <PersonIcon fontSize="inherit" /> Username
                        </Typography>
                        <Typography variant="h6" color="#fff">
                          {selectedUser.username}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
                          <EmailIcon fontSize="inherit" /> Email
                        </Typography>
                        <Typography variant="body1" color="#fff">
                          {selectedUser.email}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                          Status
                        </Typography>
                        {getStatusChip(selectedUser.status)}
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={1}>
                          <AccessTimeIcon fontSize="inherit" /> Last Login
                        </Typography>
                        <Typography variant="body2" color="#fff">
                          {formatLastLogin(selectedUser.last_login_at)}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Typography color="text.secondary" align="center" sx={{ mt: 5 }}>
                      Select a user or search to view details.
                    </Typography>
                  )}
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ViewUserActivity;
