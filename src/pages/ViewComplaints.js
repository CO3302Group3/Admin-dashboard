import React, { useState, useEffect } from 'react';
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
    CircularProgress,
    useTheme,
    Alert
} from '@mui/material';
import BackButton from '../components/BackButton';

const ViewComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state
    const theme = useTheme();

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    setError('No access token found. Please login again.');
                    return;
                }

                const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/auth/admin/complaints`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: token }),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `Server Error: ${response.status}`);
                }

                const data = await response.json();
                console.log('Complaints response:', data);

                // Flexible data parsing to handle different possible backend structures
                if (Array.isArray(data)) {
                    setComplaints(data);
                } else if (data.data && Array.isArray(data.data)) {
                    setComplaints(data.data);
                } else if (data.data && data.data.complaints && Array.isArray(data.data.complaints)) {
                    setComplaints(data.data.complaints);
                } else if (data.complaints && Array.isArray(data.complaints)) {
                    setComplaints(data.complaints);
                } else {
                    console.warn('Unexpected response structure:', data);
                    setComplaints([]);
                }

            } catch (err) {
                console.error('Error fetching complaints:', err);
                setError(err.message || 'Failed to load complaints');
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
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
                        color: 'primary.main',
                        textShadow: '0 0 10px rgba(0, 229, 255, 0.3)',
                        mb: 4
                    }}
                >
                    📂 User Complaints
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
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : (
                        <TableContainer component={Paper} elevation={0} sx={{ background: 'transparent' }}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow sx={{ '& th': { color: 'rgba(255,255,255,0.8)', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.2)' } }}>
                                        <TableCell>Complaint ID</TableCell>
                                        <TableCell>Device Name</TableCell>
                                        <TableCell>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {complaints.length > 0 ? (
                                        complaints.map((row) => {
                                            // Extract device name from subject if not present in row
                                            let deviceName = row.devicename || row.device_name;
                                            if (!deviceName && row.subject) {
                                                const match = row.subject.match(/Device:\s*([^\)]+)/);
                                                if (match) {
                                                    deviceName = match[1];
                                                }
                                            }

                                            return (
                                                <TableRow
                                                    key={row.id || row.complaint_id}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': { border: 0 },
                                                        '& td': { color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)' },
                                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                                                    }}
                                                >
                                                    <TableCell>{row.id || row.complaint_id || 'N/A'}</TableCell>
                                                    <TableCell>{deviceName || 'N/A'}</TableCell>
                                                    <TableCell>
                                                        {row.description || 'N/A'}
                                                        {row.subject && (
                                                            <Typography variant="caption" display="block" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                                                {row.subject}
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                                No complaints found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </Container>
        </Box >
    );
};

export default ViewComplaints;
