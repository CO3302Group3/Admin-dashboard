import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ sx = {} }) => {
    const navigate = useNavigate();

    return (
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
                mb: 4,
                color: '#00e5ff',
                fontWeight: 'bold',
                ...sx
            }}
        >
            Back
        </Button>
    );
};

export default BackButton;
