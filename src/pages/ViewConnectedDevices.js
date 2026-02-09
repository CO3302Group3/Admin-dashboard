import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
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
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import BackButton from '../components/BackButton';

const ViewConnectedDevices = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        setLoading(true);
        setError(null);
        try {
            // Prioritize access_token as AdminLogin sets this
            const token = localStorage.getItem("access_token") || localStorage.getItem("token");
            console.log("Using Token:", token); // Debugging

            if (!token) {
                throw new Error("No authentication token found. Please log in.");
            }

            const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/device_onboarding/get_my_devices?token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error Response:", errorText);
                throw new Error(`Error: ${response.status} - ${errorText || response.statusText}`);
            }

            const data = await response.json();
            // The backend returns a direct list now based on the snippet provided
            setDevices(Array.isArray(data) ? data : (data.content || []));

        } catch (err) {
            setError(err.message);
            console.error('Failed to fetch devices:', err);
        } finally {
            setLoading(false);
        }
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
                        background: 'linear-gradient(45deg, #00e5ff, #7c4dff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 4,
                        textShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
                    }}
                >
                    Connected Devices
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress size={60} sx={{ color: '#00e5ff' }} />
                    </Box>
                ) : error ? (
                    <Typography variant="h6" color="error" sx={{ textAlign: 'center', py: 4 }}>
                        Error: {error}
                    </Typography>
                ) : devices.length > 0 ? (
                    <TableContainer component={Paper} sx={{ background: 'rgba(19, 47, 76, 0.8)', borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ background: 'rgba(0, 229, 255, 0.1)' }}>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>User ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>Device ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>User Preferred Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>Created Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {devices.map((device, index) => (
                                    <TableRow key={index} sx={{ '&:hover': { background: 'rgba(0, 229, 255, 0.05)' } }}>
                                        <TableCell sx={{ color: 'white' }}>{device.user_id}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{device.device_id}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{device.user_preferred_name}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{new Date(device.created_at).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', py: 8 }}>
                        No connected devices found.
                    </Typography>
                )}
            </Container>
        </Box>
    );
};

export default ViewConnectedDevices;
