import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const theme = createTheme({
  palette: {
    primary: { main: '#0F9E99', contrastText: '#fff' },
    background: { default: '#EFE9E0', paper: '#EFE9E0' },
    text: { primary: '#333', secondary: '#666' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function AllBuddies({ darkMode, setDarkMode, language, setLanguage, isLoggedIn, userProfile }) {
  const [buddies, setBuddies] = useState([]);

  useEffect(() => {
    fetch('https://buddymate-backend.onrender.com/buddies')
      .then(res => res.json())
      .then(data => setBuddies(data))
      .catch(err => console.error('Fetch Buddies Error:', err));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} isLoggedIn={isLoggedIn} userProfile={userProfile} isBuddy={userProfile.isBuddy} />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          All Buddies
        </Typography>
        <Grid container spacing={4}>
          {buddies.map((buddy) => (
            <Grid item xs={12} sm={6} md={4} key={buddy._id}>
              <Card component={Link} to={`/buddy/${buddy._id}`} sx={{ textDecoration: 'none', bgcolor: 'background.paper' }}>
                <img src={`https://buddymate-backend.onrender.com${buddy.photo}`} alt={buddy.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h6">{buddy.name}</Typography>
                  <Typography color="textSecondary">{buddy.role}</Typography>
                  <Typography>{buddy.area}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default AllBuddies;