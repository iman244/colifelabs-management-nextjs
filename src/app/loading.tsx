// components/LoadingPage.js
import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Full viewport height
        backgroundColor: 'background.default', // MUI theme-aware background
        color: 'text.primary', // MUI theme-aware text color
      }}
    >
      {/* Loading Spinner */}
      <CircularProgress size={60} thickness={4} sx={{ mb: 4 }} />

      {/* Loading Text */}
      <Typography variant="h5" component="div">
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingPage;