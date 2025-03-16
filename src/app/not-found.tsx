import React from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Link from 'next/link'; // Import Link from Next.js

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      {/* Icon */}
      <SentimentVeryDissatisfiedIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />

      {/* Title */}
      <Typography variant="h3" gutterBottom>
        Oops! Page Not Found
      </Typography>

      {/* Description */}
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>

      {/* Action Button with Next.js Link */}
      <Box>
        <Link href="/" passHref> {/* Use Link for client-side navigation */}
          <Button
            variant="contained"
            color="primary"
            component="span"
            sx={{ textTransform: 'none', px: 4, py: 1 }}
          >
            Go Back to Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default NotFoundPage;