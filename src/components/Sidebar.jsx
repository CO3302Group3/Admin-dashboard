import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import {
    People as PeopleIcon,
    LocalParking as LocalParkingIcon,
    Notifications as NotificationsIcon,
    Dashboard as DashboardIcon
} from '@mui/icons-material';

const Sidebar = () => {
    const location = useLocation();

    // Hide Sidebar on Login/Signup pages
    const hideSidebarRoutes = ['/admin/login', '/admin/signup'];
    if (hideSidebarRoutes.includes(location.pathname)) {
        return null;
    }

    const menuItems = [
        { text: 'Users', icon: <PeopleIcon />, path: '/view-users' },
        { text: 'Slots', icon: <LocalParkingIcon />, path: '/view-slots' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
    ];

    return (
        <Box
            sx={{
                width: 240,
                height: '100vh',
                background: 'linear-gradient(180deg, #0a1929 0%, #1a237e 100%)',
                color: 'white',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: 0
            }}
        >
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #00e5ff, #7c4dff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '1px'
                    }}
                >
                    Admin Panel
                </Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

            <List sx={{ pt: 2 }}>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        component={NavLink}
                        to={item.path}
                        sx={{
                            margin: '8px 16px',
                            borderRadius: '8px',
                            width: 'auto',
                            color: 'rgba(255,255,255,0.7)',
                            '&.active': {
                                background: 'rgba(0, 229, 255, 0.1)',
                                color: '#00e5ff',
                                '& .MuiListItemIcon-root': {
                                    color: '#00e5ff',
                                },
                            },
                            '&:hover': {
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
