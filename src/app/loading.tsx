// components/LoadingPage.js
import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px', // Full viewport height
        backgroundColor: 'background.default', // MUI theme-aware background
        color: 'text.primary', // MUI theme-aware text color
      }}
    >
      {/* Loading Spinner */}
      <CircularProgress size={60} thickness={4} sx={{ mb: 4 }} />
    </Box>
  );
};

export default LoadingPage;