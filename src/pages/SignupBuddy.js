import React, { useState } from 'react';
import { Button, Typography, Container, TextField, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Radio, RadioGroup, FormLabel, Chip, IconButton, Link as MUILink } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Add } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
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

function SignupBuddy({ darkMode, setDarkMode, language, setLanguage }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    location: '',
    allowLocation: false,
    age: '',
    drinking: '',
    smoking: '',
    diet: '',
    height: '',
    bodyFeatures: '',
    freeTime: [],
    availabilityType: 'regular',
    interests: [],
    bio: '',
    photo: null,
  });
  const [agree, setAgree] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMultiSelectChange = (e) => {
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
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleCheckboxChange = (e) => {
    setAgree(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      alert('Please agree to the Privacy Policy & Terms of Agreement for Buddies.');
      return;
    }
    if (formData.interests.length < 5) {
      alert('Please select at least 5 interests.');
      return;
    }
    if (!formData.photo) {
      alert('Please upload a profile photo.');
      return;
    }

    const data = new FormData(); // Switch to FormData
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('gender', formData.gender);
    data.append('location', formData.location);
    data.append('allowLocation', formData.allowLocation);
    data.append('age', formData.age);
    data.append('drinking', formData.drinking);
    data.append('smoking', formData.smoking);
    data.append('diet', formData.diet);
    data.append('height', formData.height);
    data.append('bodyFeatures', formData.bodyFeatures);
    data.append('freeTime', JSON.stringify(formData.freeTime)); // Arrays need stringifying
    data.append('availabilityType', formData.availabilityType);
    data.append('interests', JSON.stringify(formData.interests));
    data.append('bio', formData.bio);
    data.append('photo', formData.photo); // File object

    console.log('Buddy Signup Data:', Object.fromEntries(data)); // Debug log
    try {
      const response = await fetch('https://buddymate.onrender.com/signup-buddy', {
        method: 'POST',
        body: data, // Send FormData instead of JSON
      });
      console.log('Response Status:', response.status);
      const result = await response.json();
      if (response.ok) {
        console.log('Buddy Signup Success:', result);
        alert('Buddy signup successful!');
        navigate('/'); // Redirect to homepage
      } else {
        console.error('Buddy Signup Error:', result.error);
        alert('Buddy signup failed: ' + result.error);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Network error: ' + error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          {t('signupBuddy.title')}
        </Typography>
        <Typography align="center" color="textSecondary" sx={{ mb: 4 }}>
          {t('signupBuddy.subtitle')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label={t('signupBuddy.username')} name="username" value={formData.username} onChange={handleChange} variant="outlined" fullWidth required />
          <TextField label={t('signupBuddy.email')} name="email" type="email" value={formData.email} onChange={handleChange} variant="outlined" fullWidth required />
          <TextField label={t('signupBuddy.password')} name="password" type="password" value={formData.password} onChange={handleChange} variant="outlined" fullWidth required />
          <FormControl fullWidth>
            <InputLabel>{t('signupBuddy.gender')}</InputLabel>
            <Select name="gender" value={formData.gender} onChange={handleChange} required>
              <MenuItem value="male">{t('signupBuddy.genderOptions.male')}</MenuItem>
              <MenuItem value="female">{t('signupBuddy.genderOptions.female')}</MenuItem>
              <MenuItem value="non-binary">{t('signupBuddy.genderOptions.nonBinary')}</MenuItem>
              <MenuItem value="other">{t('signupBuddy.genderOptions.other')}</MenuItem>
            </Select>
          </FormControl>
          <TextField label={t('signupBuddy.location')} name="location" value={formData.location} onChange={handleChange} variant="outlined" fullWidth required />
          <FormControlLabel
            control={<Checkbox checked={formData.allowLocation} onChange={handleChange} name="allowLocation" />}
            label={t('signupBuddy.allowLocation')}
          />
          <TextField label={t('signupBuddy.age')} name="age" type="number" value={formData.age} onChange={handleChange} variant="outlined" fullWidth required inputProps={{ min: 18, max: 99 }} />
          <FormControl fullWidth>
            <InputLabel>{t('signupBuddy.drinking')}</InputLabel>
            <Select name="drinking" value={formData.drinking} onChange={handleChange} required>
              <MenuItem value="never">{t('signupBuddy.drinkingOptions.never')}</MenuItem>
              <MenuItem value="socially">{t('signupBuddy.drinkingOptions.socially')}</MenuItem>
              <MenuItem value="regularly">{t('signupBuddy.drinkingOptions.regularly')}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>{t('signupBuddy.smoking')}</InputLabel>
            <Select name="smoking" value={formData.smoking} onChange={handleChange} required>
              <MenuItem value="never">{t('signupBuddy.smokingOptions.never')}</MenuItem>
              <MenuItem value="occasionally">{t('signupBuddy.smokingOptions.occasionally')}</MenuItem>
              <MenuItem value="regularly">{t('signupBuddy.smokingOptions.regularly')}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>{t('signupBuddy.diet')}</InputLabel>
            <Select name="diet" value={formData.diet} onChange={handleChange} required>
              <MenuItem value="vegetarian">{t('signupBuddy.dietOptions.vegetarian')}</MenuItem>
              <MenuItem value="non-vegetarian">{t('signupBuddy.dietOptions.nonVegetarian')}</MenuItem>
              <MenuItem value="vegan">{t('signupBuddy.dietOptions.vegan')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={t('signupBuddy.height')}
            name="height"
            value={formData.height}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label={t('signupBuddy.bodyFeatures')}
            name="bodyFeatures"
            value={formData.bodyFeatures}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={3}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>{t('signupBuddy.freeTime')}</InputLabel>
            <Select name="freeTime" value={formData.freeTime} onChange={handleMultiSelectChange} multiple required>
              <MenuItem value="weekdays-morning">{t('signupBuddy.freeTimeOptions.weekdaysMorning')}</MenuItem>
              <MenuItem value="weekdays-afternoon">{t('signupBuddy.freeTimeOptions.weekdaysAfternoon')}</MenuItem>
              <MenuItem value="weekdays-evening">{t('signupBuddy.freeTimeOptions.weekdaysEvening')}</MenuItem>
              <MenuItem value="weekends-morning">{t('signupBuddy.freeTimeOptions.weekendsMorning')}</MenuItem>
              <MenuItem value="weekends-afternoon">{t('signupBuddy.freeTimeOptions.weekendsAfternoon')}</MenuItem>
              <MenuItem value="weekends-evening">{t('signupBuddy.freeTimeOptions.weekendsEvening')}</MenuItem>
            </Select>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">{t('signupBuddy.availabilityType')}</FormLabel>
            <RadioGroup name="availabilityType" value={formData.availabilityType} onChange={handleChange}>
              <FormControlLabel value="regular" control={<Radio />} label={t('signupBuddy.availabilityOptions.regular')} />
              <FormControlLabel value="sparse" control={<Radio />} label={t('signupBuddy.availabilityOptions.sparse')} />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth>
            <Typography variant="body1" gutterBottom>{t('signupBuddy.interests')} (Select at least 5)</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {interestsPool.map(interest => (
                <Chip
                  key={interest}
                  label={t(`signupBuddy.interestsOptions.${interest.toLowerCase()}`, interest)}
                  clickable
                  color={formData.interests.includes(interest) ? 'primary' : 'default'}
                  onClick={() => handleInterestToggle(interest)}
                  sx={{ bgcolor: formData.interests.includes(interest) ? '#40C4FF' : 'grey.300' }}
                />
              ))}
            </Box>
          </FormControl>
          <TextField label={t('signupBuddy.bio')} name="bio" value={formData.bio} onChange={handleChange} variant="outlined" multiline rows={3} fullWidth />
          <Box>
            <Typography variant="body1">{t('signupBuddy.photo')}</Typography>
            <IconButton
              component="label"
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: 'grey.300',
                '&:hover': { bgcolor: 'grey.400' },
              }}
            >
              <Add />
              <input type="file" accept="image/*" onChange={handleFileChange} hidden />
            </IconButton>
            {formData.photo && <Typography variant="body2">{formData.photo.name}</Typography>}
          </Box>
          <FormControlLabel
            control={<Checkbox checked={agree} onChange={handleCheckboxChange} />}
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <MUILink component={Link} to="/legal-buddy" color="primary">
                  Privacy Policy & Terms of Agreement for Buddies
                </MUILink>
              </Typography>
            }
          />
          <Button type="submit" variant="contained" color="primary" size="large">
            {t('signupBuddy.submit')}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignupBuddy;