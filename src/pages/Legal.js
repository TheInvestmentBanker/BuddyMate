import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../components/Header';

const theme = createTheme({
  palette: {
    primary: { main: '#C02641', contrastText: '#fff' },
    background: { default: '#f5f5f5', paper: '#fff' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function Legal({ darkMode, setDarkMode, language, setLanguage }) {
  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy & Terms of Agreement
        </Typography>
        <Box sx={{ lineHeight: 1.6 }}>
          <Typography variant="body1" paragraph>
            Welcome to BuddyMate! This document outlines our Privacy Policy and Terms of Agreement. By using our platform, you agree to both.
          </Typography>

          <Typography variant="h6">Privacy Policy</Typography>
          <Typography variant="body1" paragraph>
            Your privacy matters to us. Here’s how we handle your data:
          </Typography>
          <Typography variant="subtitle1">1. Information We Collect</Typography>
          <Typography variant="body1" paragraph>
            We collect your username, email, and password when you sign up. For Buddies, we may collect additional details like role and area.
          </Typography>
          <Typography variant="subtitle1">2. How We Use It</Typography>
          <Typography variant="body1" paragraph>
            Your data helps us provide and improve BuddyMate, connect users with Buddies, and ensure safety.
          </Typography>
          <Typography variant="subtitle1">3. Sharing and Security</Typography>
          <Typography variant="body1" paragraph>
            We don’t share your info except as required by law. We use encryption to keep it secure.
          </Typography>

          <Typography variant="h6">Terms of Agreement</Typography>
          <Typography variant="body1" paragraph>
            By using BuddyMate, you agree to these terms:
          </Typography>
          <Typography variant="subtitle1">1. Use of Service</Typography>
          <Typography variant="body1" paragraph>
            You must be 18+ to use BuddyMate. You’re responsible for your account’s security.
          </Typography>
          <Typography variant="subtitle1">2. Buddy Responsibilities</Typography>
          <Typography variant="body1" paragraph>
            Buddies agree to provide accurate info and respect user safety and privacy.
          </Typography>
          <Typography variant="subtitle1">3. Liability</Typography>
          <Typography variant="body1" paragraph>
            BuddyMate isn’t liable for interactions between users and Buddies. Use at your own risk.
          </Typography>

          <Typography variant="body1">
            Questions? Contact us at support@buddymate.com.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Legal;