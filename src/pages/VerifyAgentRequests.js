import React, { useState, useEffect } from "react";
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
  TextField,
  Chip,
  IconButton,
  Button,
  useTheme,
  InputAdornment
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const VerifyAgentRequests = () => {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const response = await axios.post(
          "http://192.168.8.186/admin-management/get_all_non_staff_users",
          { token }
        );

        const data = response.data.data;
        const fetchedAgents = Array.isArray(data.agents) ? data.agents : [];

        setAgents(fetchedAgents);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  const approveAgent = (email) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.email === email ? { ...agent, status: "active" } : agent
      )
    );
  };

  const rejectAgent = (email) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.email === email ? { ...agent, status: "inactive" } : agent
      )
    );
  };

  const filteredAgents = agents.filter(
    (agent) =>
      agent.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#00e676',
            mb: 4,
            textShadow: '0 0 10px rgba(0, 230, 118, 0.4)'
          }}
        >
          👮 Verify Agent Requests
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
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

          <TableContainer component={Paper} elevation={0} sx={{ background: 'transparent' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ '& th': { color: 'rgba(255,255,255,0.8)', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.2)' } }}>
                  <TableCell>Agent Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Current Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAgents.map((agent, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '& td': { color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)' },
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                    }}
                  >
                    <TableCell>{agent.username}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={agent.status}
                        color={agent.status === 'active' ? 'success' : agent.status === 'inactive' ? 'warning' : 'default'}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => approveAgent(agent.email)}
                        sx={{ mr: 1, borderRadius: 3 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<CancelIcon />}
                        onClick={() => rejectAgent(agent.email)}
                        sx={{ borderRadius: 3 }}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAgents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                      No agents found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerifyAgentRequests;
