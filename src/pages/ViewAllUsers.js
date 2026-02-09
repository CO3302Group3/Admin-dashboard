import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Chip,
  Tabs,
  Tab,
  InputAdornment,
  CircularProgress,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BackButton from '../components/BackButton';

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('No access token found in localStorage');
          return;
        }

        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_IP}/admin-management/get_all_non_staff_users`,
          { token }
        );

        setUsers(response.data.data?.users || []);
        setAgents(response.data.data?.agents || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const filterData = (list) =>
    list.filter(
      (item) =>
        item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredList = tabValue === 0 ? filterData(users) : filterData(agents);

  const getStatusChip = (status) => {
    let color = 'default';
    if (status === 'active') color = 'success';
    else if (status === 'inactive') color = 'warning';
    else if (status === 'banned') color = 'error';

    return <Chip label={status || 'N/A'} color={color} variant="outlined" size="small" />;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #1a237e 100%)`,
        py: 5,
        px: 3
      }}
    >
      <Container maxWidth="lg">
        <BackButton />
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '0 0 10px rgba(0, 229, 255, 0.3)',
            mb: 4
          }}
        >
          📇 Registered Users & Agents
        </Typography>

        <Paper
          sx={{
            p: 3,
            background: 'rgba(19, 47, 76, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Search and Tabs */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              sx={{ '& .MuiTab-root': { color: 'rgba(255,255,255,0.7)', fontWeight: 'bold' }, '& .Mui-selected': { color: '#00e5ff' } }}
            >
              <Tab label={`Users (${users.length})`} />
              <Tab label={`Agents (${agents.length})`} />
            </Tabs>

            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: '100%', md: '300px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 5,
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                }
              }}
            />
          </Box>

          {/* Table */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0} sx={{ background: 'transparent' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ '& th': { color: 'rgba(255,255,255,0.8)', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.2)' } }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredList.length > 0 ? (
                    filteredList.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          '& td': { color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)' },
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{getStatusChip(row.status)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                        No records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ViewAllUsers;
