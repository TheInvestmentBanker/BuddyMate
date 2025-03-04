import React, { useState } from 'react';
import { Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Chip, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const theme = createTheme({
  palette: {
    primary: { main: '#40C4FF', contrastText: '#fff' },
    background: { default: '#f5f5f5', paper: '#fff' },
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

function BuddyDashboard({ darkMode, setDarkMode, language, setLanguage, userProfile, setUserProfile, setIsLoggedIn }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(userProfile || {
    username: '', email: '', gender: '', location: '', allowLocation: false, age: '', drinking: '', smoking: '', diet: '',
    height: '', bodyFeatures: '', freeTime: [], availabilityType: 'regular', interests: [], bio: '', photo: null
  });

  console.log('BuddyDashboard - userProfile:', userProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const newInterests = (prev.interests || []).includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleFileChange = (e) => {
    const newPhoto = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: newPhoto }));
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append('username', formData.username || '');
    data.append('email', formData.email || '');
    data.append('password', formData.password || '');
    data.append('gender', formData.gender || '');
    data.append('location', formData.location || '');
    data.append('allowLocation', formData.allowLocation || false);
    data.append('age', formData.age || '');
    data.append('drinking', formData.drinking || '');
    data.append('smoking', formData.smoking || '');
    data.append('diet', formData.diet || '');
    data.append('height', formData.height || '');
    data.append('bodyFeatures', formData.bodyFeatures || '');
    data.append('freeTime', JSON.stringify(formData.freeTime || []));
    data.append('availabilityType', formData.availabilityType || 'regular');
    data.append('interests', JSON.stringify(formData.interests || []));
    data.append('bio', formData.bio || '');
    if (formData.photo && typeof formData.photo !== 'string') {
      data.append('photo', formData.photo);
    }

    try {
      const response = await fetch(`https://buddymate-backend.onrender.com/buddies/${userProfile._id}`, {
        method: 'PUT',
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        setUserProfile({ ...formData, photo: result.photo || formData.photo });
        alert('Profile updated!');
      } else {
        alert('Update failed: ' + result.error);
      }
    } catch (error) {
      console.error('Update Error:', error);
      alert('Network error: ' + error.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile({ username: '', gender: '', location: '', interests: [], photos: [] });
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} isLoggedIn={true} userProfile={userProfile} isBuddy={true} />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Buddy Dashboard
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Username" name="username" value={formData.username || ''} disabled variant="outlined" fullWidth />
          <TextField label="Email" name="email" value={formData.email || ''} disabled variant="outlined" fullWidth />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={formData.gender || ''} onChange={handleChange} required>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="non-binary">Non-binary</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Location" name="location" value={formData.location || ''} onChange={handleChange} variant="outlined" fullWidth required />
          <TextField label="Age" name="age" type="number" value={formData.age || ''} onChange={handleChange} variant="outlined" fullWidth required />
          <TextField label="Height" name="height" value={formData.height || ''} onChange={handleChange} variant="outlined" fullWidth required />
          <FormControl fullWidth>
            <InputLabel>Drinking Habits</InputLabel>
            <Select name="drinking" value={formData.drinking || ''} onChange={handleChange} required>
              <MenuItem value="never">Never</MenuItem>
              <MenuItem value="socially">Socially</MenuItem>
              <MenuItem value="regularly">Regularly</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Smoking Habits</InputLabel>
            <Select name="smoking" value={formData.smoking || ''} onChange={handleChange} required>
              <MenuItem value="never">Never</MenuItem>
              <MenuItem value="occasionally">Occasionally</MenuItem>
              <MenuItem value="regularly">Regularly</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Diet</InputLabel>
            <Select name="diet" value={formData.diet || ''} onChange={handleChange} required>
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="non-vegetarian">Non-Vegetarian</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Body Features" name="bodyFeatures" value={formData.bodyFeatures || ''} onChange={handleChange} variant="outlined" multiline rows={3} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Free Time</InputLabel>
            <Select name="freeTime" value={formData.freeTime || []} onChange={handleMultiSelectChange} multiple required>
              <MenuItem value="weekdays-morning">Weekdays Morning</MenuItem>
              <MenuItem value="weekdays-afternoon">Weekdays Afternoon</MenuItem>
              <MenuItem value="weekdays-evening">Weekdays Evening</MenuItem>
              <MenuItem value="weekends-morning">Weekends Morning</MenuItem>
              <MenuItem value="weekends-afternoon">Weekends Afternoon</MenuItem>
              <MenuItem value="weekends-evening">Weekends Evening</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Availability Type</InputLabel>
            <Select name="availabilityType" value={formData.availabilityType || 'regular'} onChange={handleChange} required>
              <MenuItem value="regular">Regular</MenuItem>
              <MenuItem value="sparse">Sparse</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Typography variant="body1" gutterBottom>Interests (Min 5)</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {interestsPool.map(interest => (
                <Chip
                  key={interest}
                  label={interest}
                  clickable
                  color={(formData.interests || []).includes(interest) ? 'primary' : 'default'}
                  onClick={() => handleInterestToggle(interest)}
                  sx={{ bgcolor: (formData.interests || []).includes(interest) ? '#40C4FF' : 'grey.300' }}
                />
              ))}
            </Box>
          </FormControl>
          <TextField label="Bio" name="bio" value={formData.bio || ''} onChange={handleChange} variant="outlined" multiline rows={3} fullWidth />
          <Box>
            <Typography variant="body1">Profile Photo</Typography>
            <IconButton
              component="label"
              sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: 'grey.300', '&:hover': { bgcolor: 'grey.400' } }}
            >
              <Add />
              <input type="file" accept="image/*" onChange={handleFileChange} hidden />
            </IconButton>
            {formData.photo && <Typography variant="body2">{typeof formData.photo === 'string' ? 'Current Photo' : formData.photo.name}</Typography>}
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

export default BuddyDashboard;