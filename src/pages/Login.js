import React, { useState } from 'react';
import { Button, Typography, Container, TextField, Box, FormControlLabel, Checkbox, InputAdornment, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: { main: '#0F9E99', contrastText: '#fff' }, // Teal for buttons and accents
    background: { default: '#EFE9E0', paper: '#EFE9E0' }, // Light beige for background
    text: { primary: '#333', secondary: '#666' }, // Dark text for contrast
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function Login({ setIsLoggedIn, setUserProfile }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isBuddy: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = formData.isBuddy ? '/login-buddy' : '/login';
    console.log('Login attempt with:', formData);
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      if (response.ok) {
        console.log('Login Success:', data);
        setIsLoggedIn(true);
        setUserProfile({ ...data.user, photos: data.user.photos || [], isBuddy: formData.isBuddy });
        alert('Login successful!');
        navigate(formData.isBuddy ? '/buddy-dashboard' : '/');
      } else {
        console.error('Login Error:', data.error);
        alert('Login failed: ' + data.error);
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
            Login to BuddyMate
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ mb: 4 }}>
            Welcome back! Enter your details to continue.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
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
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              sx={{ input: { color: '#333' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={formData.isBuddy} onChange={handleChange} name="isBuddy" />}
              label="Login as a Buddy"
            />
            <Button type="submit" variant="contained" color="primary" size="large">
              Login
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Login;