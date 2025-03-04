import React, { useState } from 'react';
import { Button, Typography, Container, TextField, Box, Checkbox, FormControlLabel, Link as MUILink } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './Signup.css'; // We'll add some custom CSS

const theme = createTheme({
  palette: {
    primary: { main: '#0F9E99', contrastText: '#fff' }, // Teal for buttons and accents
    background: { default: '#EFE9E0', paper: '#EFE9E0' }, // Light beige for background
    text: { primary: '#333', secondary: '#666' }, // Dark text for contrast
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function Signup({ setIsLoggedIn, setUserProfile }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setAgree(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      alert('Please agree to the Privacy Policy & Terms of Agreement.');
      return;
    }
    console.log('Form Submitted with:', formData);
    try {
      const response = await fetch('https://buddymate-backend.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log('Response Status:', response.status);
      const data = await response.json();
      if (response.ok) {
        console.log('Signup Success:', data);
        alert('Signup successful!');
        setIsLoggedIn(true); // Simulate login
        setUserProfile({ ...formData, gender: '', location: '', interests: [], photos: [] });
        navigate('/');
      } else {
        console.error('Signup Error:', data.error);
        alert('Signup failed: ' + data.error);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Network error: ' + error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Container maxWidth="sm" sx={{ py: 6 }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
          Sign Up for BuddyMate
        </Typography>
        <Typography align="center" color="textSecondary" sx={{ mb: 4 }}>
          Just a few quick details
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            sx={{ input: { color: '#333' } }}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            sx={{ input: { color: '#333' } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            sx={{ input: { color: '#333' } }}
          />
          <FormControlLabel
            control={<Checkbox checked={agree} onChange={handleCheckboxChange} />}
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <MUILink component={Link} to="/legal" color="primary">
                  Privacy Policy & Terms of Agreement
                </MUILink>
              </Typography>
            }
          />
          <Button type="submit" variant="contained" color="primary" size="large">
            Submit
          </Button>
          <Button component={Link} to="/signup-buddy" variant="outlined" color="primary" size="large">
            Sign up as a Buddy instead
          </Button>
        </Box>
      </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Signup;