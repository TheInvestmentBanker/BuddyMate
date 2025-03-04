import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../components/Header';
import { Link as MUILink } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: { main: '#0F9E99', contrastText: '#fff' },
    background: { default: '#EFE9E0', paper: '#EFE9E0' },
    text: { primary: '#333', secondary: '#666' },
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
            Welcome to BuddyMate! This document outlines our Privacy Policy and Terms of Agreement for all users. By using our platform, you agree to both.
          </Typography>
          <Typography variant="h6">Privacy Policy</Typography>
          <Typography variant="body1" paragraph>
            We value your privacy. Here’s how we handle your data:
          </Typography>
          <Typography variant="subtitle1">1. Information We Collect</Typography>
          <Typography variant="body1" paragraph>
            We collect basic info like your username, email, and preferences to make your experience awesome.
          </Typography>
          <Typography variant="subtitle1">2. How We Use It</Typography>
          <Typography variant="body1" paragraph>
            Your data helps us connect you with buddies, improve our services, and keep things secure.
          </Typography>
          <Typography variant="subtitle1">3. Security</Typography>
          <Typography variant="body1" paragraph>
            We’ve got encryption and stuff to keep your info safe. No sharing unless the law says so.
          </Typography>
          <Typography variant="h6">Terms of Agreement</Typography>
          <Typography variant="body1" paragraph>
            By signing up, you agree to play nice:
          </Typography>
          <Typography variant="subtitle1">1. Be Cool</Typography>
          <Typography variant="body1" paragraph>
            Respect others, keep it legal, and don’t be a jerk.
          </Typography>
          <Typography variant="subtitle1">2. Our Role</Typography>
          <Typography variant="body1" paragraph>
            We’re just the platform—your hangouts are your deal. We’re not liable for what happens.
          </Typography>
          <Typography variant="subtitle1">3. Termination</Typography>
          <Typography variant="body1" paragraph>
            Break the rules, and we can kick you out. Simple.
          </Typography>
          <Typography variant="body1">
            Questions? Hit us up at <MUILink href="mailto:support@buddymate.com">support@buddymate.com</MUILink>.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Legal;