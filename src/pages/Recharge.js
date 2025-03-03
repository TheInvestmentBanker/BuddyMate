import React, { useState } from 'react';
import { Container, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../components/Header';

const theme = createTheme({
  palette: {
    primary: { main: '#0F9E99', contrastText: '#fff' },
    background: { default: '#EFE9E0', paper: '#EFE9E0' },
    text: { primary: '#333', secondary: '#666' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function Recharge({ darkMode, setDarkMode, language, setLanguage, userProfile }) {
  const [coinPacket, setCoinPacket] = useState(100);

  const handleRecharge = () => {
    alert(`Recharge of ${coinPacket} BM Coins (₹${coinPacket * 10}) coming soon!`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} isLoggedIn={true} userProfile={userProfile} />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Recharge BM Coins
        </Typography>
        <Typography align="center" color="textSecondary" sx={{ mb: 4 }}>
          1 BM Coin = ₹10
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Coin Packet</InputLabel>
            <Select value={coinPacket} onChange={(e) => setCoinPacket(e.target.value)}>
              <MenuItem value={100}>100 Coins (₹1000)</MenuItem>
              <MenuItem value={200}>200 Coins (₹2000)</MenuItem>
              <MenuItem value={300}>300 Coins (₹3000)</MenuItem>
              <MenuItem value={400}>400 Coins (₹4000)</MenuItem>
              <MenuItem value={500}>500 Coins (₹5000)</MenuItem>
            </Select>
          </FormControl>
          <Typography align="center">Payment via UPI or Card (Coming Soon)</Typography>
          <Button variant="contained" color="primary" onClick={handleRecharge}>
            Recharge Now
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Recharge;