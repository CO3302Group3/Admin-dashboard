import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Chip,
  CircularProgress,
  useTheme
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import BackButton from '../components/BackButton';

const SuspendUser = () => {
  const [bannedUsers, setBannedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchBannedUsers = async () => {
      try {
        // Prioritize access_token as AdminLogin sets this
        const token = localStorage.getItem("access_token") || localStorage.getItem("token");
        console.log("Using Token:", token); // Debugging

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_IP}/admin-management/get_all_non_staff_users`,
          { token },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log("Banned Users Response:", response.data);

        const data = response.data.data;
        const usersArray = Array.isArray(data.users) ? data.users : [];

        const banned = usersArray.filter(
          (user) =>
            user.status &&
            user.status.toLowerCase().trim() === "banned"
        );

        setBannedUsers(banned);
      } catch (error) {
        console.error("Error fetching banned users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannedUsers();
  }, []);

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
            color: '#ff1744',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 4
          }}
        >
          <BlockIcon sx={{ fontSize: 40 }} /> Banned Users
        </Typography>

        <Paper
          sx={{
            p: 3,
            background: 'rgba(50, 0, 0, 0.6)', // Reddish tint
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid rgba(255, 23, 68, 0.3)',
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
              <CircularProgress color="error" />
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0} sx={{ background: 'transparent' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ '& th': { color: '#ffcdd2', fontWeight: 'bold', borderBottom: '1px solid rgba(255,23,68,0.3)' } }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bannedUsers.length > 0 ? (
                    bannedUsers.map((user, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          '& td': { color: '#fff', borderBottom: '1px solid rgba(255,23,68,0.1)' },
                          '&:hover': { bgcolor: 'rgba(255,23,68,0.1)' }
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip label={user.status} color="error" variant="filled" size="small" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                        No banned users found.
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

export default SuspendUser;
