import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import AppTheme from '@/theme/AppTheme';

const loadingPhrases = [
    "Fetching data from the digital realm...",
    "Preparing your experience...",
    "Assembling pixels...",
    "Brewing some virtual coffee...",
    "Tuning the quantum fluctuations..."
];

export default function Loading() {
    const randomPhrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" sx={{ mt: 2 }}>
                {randomPhrase}
            </Typography>
        </Box>
    );
}
