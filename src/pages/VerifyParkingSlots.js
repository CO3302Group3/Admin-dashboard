import React, { useState, useEffect } from "react";
import {
    Box, Container, Typography, Card, CircularProgress, Alert, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Chip, IconButton, Tooltip, useTheme
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';

const VerifyParkingSlots = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    const theme = useTheme();

    // Use your actual backend IP
    const BASE_URL = 'http://192.168.8.186'; 

    useEffect(() => {
        fetchPendingSlots();
    }, []);

    const fetchPendingSlots = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/parking_slots`, { method: 'GET' });
            if (!response.ok) throw new Error(`Failed to fetch slots: ${response.statusText}`);

            const data = await response.json();
            const allSlots = data.parking_slots || [];
            // Filter
            const pendingSlots = allSlots.filter(slot => slot.status === 'pending' || slot.status === 'inactive');
            setSlots(pendingSlots);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching slots:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (slotId, newStatus) => {
        try {
            setActionLoading(slotId);
            const token = localStorage.getItem("token"); 

            if (!token) {
                alert("Authentication token not found. Please login again.");
                return;
            }

            const currentSlot = slots.find(s => s.slot_id === slotId);
            if (!currentSlot) {
                alert("Slot data not found locally.");
                return;
            }

            // --- PAYLOAD CONSTRUCTION ---
            // Include ALL fields to satisfy "Field Required" errors.
            // Specifically handling assigned_device_id to be null if undefined.
            const bodyData = {
                payload: {
                    name: currentSlot.name,
                    address: currentSlot.address,
                    price: currentSlot.price,
                    opening_time: currentSlot.opening_time,
                    closing_time: currentSlot.closing_time,
                    available_days: currentSlot.available_days || [],
                    bikes_allowed: currentSlot.bikes_allowed || 0,
                    total_spaces: currentSlot.total_spaces || 0,
                    
                    // CRITICAL FIX: Explicitly sending null if value is missing
                    assigned_device_id: currentSlot.assigned_device_id ? currentSlot.assigned_device_id : null,

                    status: newStatus
                },
                authorization: {
                    token: token
                }
            };

            const response = await fetch(`${BASE_URL}/parking_slots/${slotId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                let msg = `Server Error (${response.status})`;
                if (errorData && errorData.detail) {
                    if (Array.isArray(errorData.detail)) {
                        msg += "\n" + errorData.detail.map(e => `• ${e.loc.join('.')} -> ${e.msg}`).join('\n');
                    } else {
                        msg += `\n${errorData.detail}`;
                    }
                }
                alert(msg);
                throw new Error(msg);
            }

            // Success: Remove from list
            setSlots(prev => prev.filter(slot => slot.slot_id !== slotId));

        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #1a237e 100%)`, pt: 5, pb: 5 }}>
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
                        📋 Verify Parking Requests
                    </Typography>
                    <Button startIcon={<RefreshIcon />} onClick={fetchPendingSlots} variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                        Refresh
                    </Button>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                {loading ? (
                    <Box display="flex" justifyContent="center" p={5}><CircularProgress color="secondary" /></Box>
                ) : slots.length === 0 ? (
                    <Card sx={{ p: 5, textAlign: 'center', background: 'rgba(19, 47, 76, 0.6)', backdropFilter: 'blur(10px)' }}>
                        <Typography variant="h6" color="text.secondary">No pending requests found.</Typography>
                    </Card>
                ) : (
                    <TableContainer component={Paper} sx={{ background: 'rgba(19, 47, 76, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#00e5ff', fontWeight: 'bold' }}>Slot Name</TableCell>
                                    <TableCell sx={{ color: '#00e5ff', fontWeight: 'bold' }}>Location</TableCell>
                                    <TableCell sx={{ color: '#00e5ff', fontWeight: 'bold' }}>Provider</TableCell>
                                    <TableCell sx={{ color: '#00e5ff', fontWeight: 'bold' }}>Price</TableCell>
                                    <TableCell sx={{ color: '#00e5ff', fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell sx={{ color: '#00e5ff', fontWeight: 'bold' }} align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {slots.map((slot) => (
                                    <TableRow key={slot.slot_id} hover sx={{ '&:hover': { background: 'rgba(255,255,255,0.05)' } }}>
                                        <TableCell sx={{ color: '#fff' }}>
                                            <Typography variant="body1" fontWeight="bold">{slot.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">ID: {slot.slot_id}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ color: '#fff' }}>{slot.address}</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>{slot.created_by || 'Unknown'}</TableCell>
                                        <TableCell sx={{ color: '#fff' }}>₹{slot.price}/hr</TableCell>
                                        <TableCell>
                                            <Chip label={slot.status} color={slot.status === 'inactive' ? 'warning' : 'default'} size="small" variant="outlined" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box display="flex" justifyContent="center" gap={1}>
                                                <Tooltip title="Approve">
                                                    <IconButton color="success" onClick={() => handleUpdateStatus(slot.slot_id, 'available')} disabled={actionLoading === slot.slot_id}>
                                                        {actionLoading === slot.slot_id ? <CircularProgress size={24} /> : <CheckCircleIcon />}
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Reject">
                                                    <IconButton color="error" onClick={() => handleUpdateStatus(slot.slot_id, 'rejected')} disabled={actionLoading === slot.slot_id}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </Box>
    );
};

export default VerifyParkingSlots;