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

function LegalBuddy({ darkMode, setDarkMode, language, setLanguage }) {
  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Buddy Privacy Policy & Terms of Agreement
        </Typography>
        <Box sx={{ lineHeight: 1.6 }}>
          <Typography variant="body1" paragraph>
            Welcome to BuddyMate! As a Buddy, you’re key to creating fun hangouts. This document outlines our Privacy Policy and Terms of Agreement for Buddies. By signing up, you agree to both.
          </Typography>
          <Typography variant="h6">Privacy Policy</Typography>
          <Typography variant="body1" paragraph>
            We value your privacy. Here’s how we handle your data:
          </Typography>
          <Typography variant="subtitle1">1. Information We Collect</Typography>
          <Typography variant="body1" paragraph>
            We collect your username, email, password, and Buddy-specific details (e.g., gender, location, interests) to create your profile. During meets, location data is collected if permitted.
          </Typography>
          <Typography variant="subtitle1">2. How We Use It</Typography>
          <Typography variant="body1" paragraph>
            Your data connects you with users, improves our platform, and ensures safety via features like location tracking and SOS. Only your public profile (e.g., name, interests) is shared with users.
          </Typography>
          <Typography variant="subtitle1">3. Security</Typography>
          <Typography variant="body1" paragraph>
            We use encryption to protect your info. We don’t share it except as required by law or for safety features (e.g., SOS alerts).
          </Typography>
          <Typography variant="h6">Terms of Agreement</Typography>
          <Typography variant="body1" paragraph>
            As a Buddy, you agree to these terms:
          </Typography>
          <Typography variant="subtitle1">1. Mutual Agreements</Typography>
          <Typography variant="body1" paragraph>
            All interactions (e.g., physical touch, drinking, partying) must be agreed upon by both parties via our chat feature before meeting. Options include holding hands, hugging, kiss on cheek, kiss on lips, or light touch on non-sexual areas (e.g., neck, shoulders)—mutual consent is mandatory.
          </Typography>
          <Typography variant="subtitle1">2. Platform Responsibility</Typography>
          <Typography variant="body1" paragraph>
            BuddyMate is a platform for hangouts and girlfriend-like experiences—not a service for sexual activities. We’re not responsible for legal issues, lawsuits, or disputes arising from your interactions. Any monetary or gift transactions are between you and the user—BuddyMate doesn’t facilitate or mediate these.
          </Typography>
          <Typography variant="subtitle1">3. Payment Terms</Typography>
          <Typography variant="body1" paragraph>
            Payments are made in BM Coins. Users recharge BM Coins and pay 50% of your booking fee upfront (non-refundable if they no-show), with the rest due after your first in-person contact. You receive 80% of the fee; BuddyMate retains 20% as a platform fee.
          </Typography>
          <Typography variant="subtitle1">4. Boundaries</Typography>
          <Typography variant="body1" paragraph>
            Sexual intercourse (vaginal, anal, oral) or any explicit acts are strictly prohibited and not endorsed by BuddyMate. We’re not liable for legal issues if such activities occur. Allowed physical touch (e.g., holding hands, hugging, cheek kisses) must be consensual and pre-agreed.
          </Typography>
          <Typography variant="subtitle1">5. Location Tracking</Typography>
          <Typography variant="body1" paragraph>
            During meets, location tracking is enabled for both parties if permission is granted at signup. This ensures safety and is accessible via the SOS feature. Location data is not stored post-meet unless required for safety investigations.
          </Typography>
          <Typography variant="subtitle1">6. SOS Button</Typography>
          <Typography variant="body1" paragraph>
            Both parties have an SOS button during meets. Pressing it starts a 1-minute timer—confirm within 60 seconds to send an automated distress message to nearby law enforcement with your location. If not confirmed, it’s assumed accidental and no message is sent. Confirmed SOS alerts cannot be reversed and are for emergencies only—BuddyMate isn’t liable for misuse.
          </Typography>
          <Typography variant="subtitle1">7. Conduct</Typography>
          <Typography variant="body1" paragraph>
            You agree to provide accurate info, respect user boundaries, and use the chat to confirm all plans. Misconduct may lead to account suspension.
          </Typography>
          <Typography variant="body1">
            Questions? Contact us at <MUILink href="mailto:support@buddymate.com">support@buddymate.com</MUILink>.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LegalBuddy;