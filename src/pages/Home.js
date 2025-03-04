import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Security, LocationOn, VideoCall } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Hero from '../assets/hero.jpeg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EdgeHeart from '../components/EdgeHeart';

const theme = createTheme({
  palette: {
    primary: { main: '#0F9E99', contrastText: '#fff' },
    background: { default: '#EFE9E0', paper: '#EFE9E0' },
    text: { primary: '#333', secondary: '#666' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function Home({ darkMode, setDarkMode, language, setLanguage, isLoggedIn, setIsLoggedIn, userProfile, setUserProfile }) {
  const { t } = useTranslation();
  const [buddies, setBuddies] = useState([]);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);

  useEffect(() => {
    fetch('https://buddymate-backend.onrender.com/buddies')
      .then(res => res.json())
      .then(data => setBuddies(data))
      .catch(err => console.error('Fetch Buddies Error:', err));

    if (isLoggedIn && (!userProfile.gender || !userProfile.location || userProfile.interests.length === 0 || userProfile.photos.length < 3)) {
      const visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10) + 1;
      localStorage.setItem('visitCount', visitCount);
      const shouldShow = visitCount % 7 === 0 || Math.random() < 0.1;
      if (shouldShow) {
        setOpenProfileDialog(true);
      }
    }
  }, [isLoggedIn, userProfile]);

  const handleCloseDialog = () => {
    setOpenProfileDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: '200px' }}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} isLoggedIn={isLoggedIn} userProfile={userProfile} />
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url(${Hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          '&:after': { content: '""', position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.3)' },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, color: '#fff' }}>
          <Typography variant="h2" gutterBottom>{t('hero.title')}</Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>{t('hero.subtitle')}</Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button component={Link} to="/signup" variant="contained" color="primary" size="large">{t('hero.button')}</Button>
            <Button component={Link} to="/all-buddies" variant="outlined" color="inherit" size="large">Explore All Buddies</Button>
          </Box>
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>{t('features.title')}</Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper' }}>
              <VideoCall color="primary" sx={{ fontSize: 50 }} />
              <CardContent>
                <Typography variant="h6">{t('features.verified')}</Typography>
                <Typography color="textSecondary">{t('features.verified_desc')}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper' }}>
              <LocationOn color="primary" sx={{ fontSize: 50 }} />
              <CardContent>
                <Typography variant="h6">{t('features.local')}</Typography>
                <Typography color="textSecondary">{t('features.local_desc')}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper' }}>
              <Security color="primary" sx={{ fontSize: 50 }} />
              <CardContent>
                <Typography variant="h6">{t('features.safe')}</Typography>
                <Typography color="textSecondary">{t('features.safe_desc')}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ py: 6, bgcolor: 'background.paper' }}>
  <Typography variant="h4" align="center" gutterBottom>{t('trending.title')}</Typography>
  <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
    <Box sx={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'marquee 60s linear infinite' }}>
      {[...buddies, ...buddies, ...buddies].map((buddy) => (
        <Card
          key={buddy._id}
          component={Link}
          to={`/buddy/${buddy._id}`}
          sx={{ display: 'inline-block', mx: 2, minWidth: 200, textAlign: 'center', bgcolor: 'background.paper', textDecoration: 'none' }}
        >
          <img src={`${buddy.photo}`} alt={buddy.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
          <CardContent>
            <Typography variant="h6">{buddy.name}</Typography>
            <Typography color="textSecondary">{buddy.role}</Typography>
            <Typography>{buddy.area}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
</Container>
      <Footer />
      <EdgeHeart />
      <Dialog open={openProfileDialog} onClose={handleCloseDialog}>
        <DialogTitle>Complete Your Profile</DialogTitle>
        <DialogContent>
          <Typography>Complete your profile to enjoy BuddyMate fully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Later
          </Button>
          <Button component={Link} to="/dashboard" color="primary" onClick={handleCloseDialog}>
            Go to Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </ThemeProvider>
  );
}

export default Home;