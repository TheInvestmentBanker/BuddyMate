import React from 'react';
import { Box, Container, Typography, Grid, Link as MUILink } from '@mui/material';
import { FaTwitter, FaDiscord, FaTelegram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        position: 'static',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: '#0F9E99', // Gradient from CSS
        color: '#EFE9E0',
        py: 2,
        '&::after': {
          content: '""',
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          height: '68px',
          bgcolor: 'rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="BuddyMate Logo" style={{ height: '40px' }} />
          </Grid>

          {/* Socials */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, gap: 2 }}>
            <MUILink href="#" color="inherit"><FaTwitter size={18} /></MUILink>
            <MUILink href="#" color="inherit"><FaDiscord size={18} /></MUILink>
            <MUILink href="#" color="inherit"><FaTelegram size={18} /></MUILink>
            <MUILink href="#" color="inherit"><FaLinkedin size={18} /></MUILink>
            <MUILink href="#" color="inherit"><FaFacebook size={18} /></MUILink>
          </Grid>

          {/* Links */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} sx={{ pt: { xs: 4, md: 0 } }}>
              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.6)' }}>
                  Services
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, opacity: 0.8, fontSize: '14px' }}>
                  <MUILink href="#" color="inherit">Staking</MUILink>
                  <MUILink href="#" color="inherit">Hardware</MUILink>
                  <MUILink href="#" color="inherit">Monitoring</MUILink>
                  <MUILink href="#" color="inherit">Status</MUILink>
                  <MUILink href="#" color="inherit">Endpoints</MUILink>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.6)' }}>
                  Resources
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, opacity: 0.8, fontSize: '14px' }}>
                  <MUILink href="#" color="inherit">Pricing</MUILink>
                  <MUILink href="#" color="inherit">Listings</MUILink>
                  <MUILink href="#" color="inherit">Reports</MUILink>
                  <MUILink href="#" color="inherit">API</MUILink>
                  <MUILink href="#" color="inherit">FAQ</MUILink>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.6)' }}>
                  Company
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, opacity: 0.8, fontSize: '14px' }}>
                  <MUILink href="#" color="inherit">Blog</MUILink>
                  <MUILink href="#" color="inherit">Newsroom</MUILink>
                  <MUILink href="#" color="inherit">About us</MUILink>
                  <MUILink href="#" color="inherit">Assets</MUILink>
                  <MUILink component={Link} to="/legal" color="inherit">Privacy & Terms</MUILink>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.6)' }}>
                  Alltools Inc.
                </Typography>
                <Box sx={{ opacity: 0.8, fontSize: '12px', lineHeight: 1.5 }}>
                  <Typography component="address" sx={{ fontStyle: 'normal' }}>
                    Jalandhar, Punjab<br />
                    India, 144008<br />
                    +91 7888 824 366
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;