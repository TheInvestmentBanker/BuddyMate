import React, { useState } from 'react';
import { Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Chip, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: { main: '#0F9E99', contrastText: '#fff' },
    background: { default: '#EFE9E0', paper: '#EFE9E0' },
    text: { primary: '#333', secondary: '#666' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

const interestsPool = [
  'Movies', 'Gaming', 'Travel', 'Food', 'Music', 'Sports', 'Reading', 'Writing', 'Photography', 'Art',
  'Cooking', 'Dancing', 'Fashion', 'Fitness', 'Yoga', 'Hiking', 'Camping', 'Swimming', 'Cycling', 'Running',
  'Space', 'Astronomy', 'Science', 'Technology', 'Politics', 'History', 'Psychology', 'Philosophy', 'Business',
  'Finance', 'Investing', 'Entrepreneurship', 'Cosmetics', 'Beauty', 'Skincare', 'Home Science', 'Gardening',
  'DIY', 'Anime', 'K-Drama', 'Hollywood', 'Bollywood', 'Comedy', 'Drama', 'Action', 'Sci-Fi', 'Horror',
  'Cars', 'Motorcycles', 'Pets', 'Animals', 'Nature', 'Meditation', 'Spirituality', 'Shopping', 'Social Media',
  'Podcasts', 'Board Games', 'Video Editing', 'Graphic Design', 'Coding'
];

function Dashboard({ darkMode, setDarkMode, language, setLanguage, userProfile, setUserProfile, setIsLoggedIn }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(userProfile);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleFileChange = (e) => {
    const newPhotos = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...newPhotos].slice(0, 3) }));
  };

  const handleSave = () => {
    if (formData.photos.length < 3) {
      alert('Please upload at least 3 photos with your face.');
      return;
    }
    setUserProfile(formData);
    alert('Profile updated!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile({ username: '', gender: '', location: '', interests: [], photos: [] });
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} isLoggedIn={true} userProfile={userProfile} />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Your Dashboard
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Username" name="username" value={formData.username} disabled variant="outlined" fullWidth />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={formData.gender} onChange={handleChange} required>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="non-binary">Non-binary</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Location (City/Area)" name="location" value={formData.location} onChange={handleChange} variant="outlined" fullWidth required />
          <FormControl fullWidth>
            <Typography variant="body1" gutterBottom>Interests</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {interestsPool.map(interest => (
                <Chip
                  key={interest}
                  label={interest}
                  clickable
                  color={formData.interests.includes(interest) ? 'primary' : 'default'}
                  onClick={() => handleInterestToggle(interest)}
                  sx={{ bgcolor: formData.interests.includes(interest) ? '#0F9E99' : 'grey.300' }}
                />
              ))}
            </Box>
          </FormControl>
          <Box>
            <Typography variant="body1">Photos (At least 3 with face)</Typography>
            <IconButton
              component="label"
              sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: 'grey.300', '&:hover': { bgcolor: 'grey.400' } }}
            >
              <Add />
              <input type="file" accept="image/*" multiple onChange={handleFileChange} hidden />
            </IconButton>
            <Box sx={{ mt: 2 }}>
              {formData.photos.map((photo, index) => (
                <Typography key={index} variant="body2">{photo.name}</Typography>
              ))}
            </Box>
          </Box>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Profile
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Log out
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Dashboard;