import React from 'react';
import { Box, Fade } from '@mui/material';
import logo from '../assets/logo.png';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0F9E99', contrastText: '#fff' },
    background: { default: '#0F9E99', paper: '#EFE9E0' },
    text: { primary: '#333', secondary: '#666' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function BreatheIn({ onFinish }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Hide the splash after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleanup
  }, [onFinish]);

  return (
    <ThemeProvider theme={theme}>
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'background.default', // Dark background
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="BuddyMate Logo"
          sx={{
            maxWidth: '50%',
            maxHeight: '50%',
            objectFit: 'contain',
            animation: 'heartbeat 1.5s ease-in-out infinite', // Heartbeat animation
            '@keyframes heartbeat': {
              '0%': { transform: 'scale(1)', opacity: 1 }, // Start at normal size
              '50%': { transform: 'scale(1.1)', opacity: 1 }, // Expand
              '100%': { transform: 'scale(1)', opacity: 1 }, // Back to normal
            },
          }}
        />
      </Box>
    </Fade>
    </ThemeProvider>
  );
}

export default BreatheIn;