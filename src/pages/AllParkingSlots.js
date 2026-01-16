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

const AllParkingSlots = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchParkingSlots();
    }, []);

    const fetchParkingSlots = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://192.168.8.186/parking_slots', { method: 'GET' });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setSlots(data.parking_slots || []);
        } catch (err) {
            setError(err.message);
            console.error('Failed to fetch parking slots:', err);
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
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 4, color: '#00e5ff', fontWeight: 'bold' }}
                >
                    Back
                </Button>

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
                    All Parking Slots
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress size={60} sx={{ color: '#00e5ff' }} />
                    </Box>
                ) : error ? (
                    <Typography variant="h6" color="error" sx={{ textAlign: 'center', py: 4 }}>
                        Error: {error}
                    </Typography>
                ) : slots.length > 0 ? (
                    <TableContainer component={Paper} sx={{ background: 'rgba(19, 47, 76, 0.8)', borderRadius: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ background: 'rgba(0, 229, 255, 0.1)' }}>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>Slot ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>Address</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>Timings</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>Price</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>Capacity</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: '#00e5ff' }}>Created By</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {slots.map((slot, index) => (
                                    <TableRow key={index} sx={{ '&:hover': { background: 'rgba(0, 229, 255, 0.05)' } }}>
                                        <TableCell sx={{ color: 'white' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{slot.name || '-'}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{slot.address || '-'}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>
                                            {slot.opening_time} - {slot.closing_time}
                                        </TableCell>
                                        <TableCell sx={{ color: 'white' }}>₹{slot.price || '-'}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>
                                            Total: {slot.total_spaces || 0} / Bikes: {slot.bikes_allowed || 0}
                                        </TableCell>
                                        <TableCell sx={{ color: slot.status === 'active' ? '#00ff00' : '#ff6b6b', textTransform: 'capitalize' }}>
                                            {slot.status || '-'}
                                        </TableCell>
                                        <TableCell sx={{ color: 'white' }}>{slot.created_by || 'System'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', py: 8 }}>
                        No parking slots found.
                    </Typography>
                )}
            </Container>
        </Box>
    );
};

export default AllParkingSlots;
