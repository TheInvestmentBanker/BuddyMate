import React from 'react';
import { AppBar, Toolbar, Box, IconButton, Button, Select, MenuItem, Switch, Avatar, Typography } from '@mui/material';
import { DarkMode, LightMode, Mail } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';
import bmcLogo from '../assets/BMC.png';

function Header({ darkMode, setDarkMode, language, setLanguage, isLoggedIn, userProfile, isBuddy }) {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: '#0F9E99', // Changed to your color
      color: '#EFE9E0', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img src={logo} alt="BuddyMate Logo" style={{ height: '40px' }} />
        </Box>
        {isLoggedIn ? (
          <>
            <IconButton component={Link} to="/recharge" sx={{ mr: 2 }}>
              <img src={bmcLogo} alt="BM Coins" style={{ height: '24px' }} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                BM Coins
              </Typography>
            </IconButton>
            {isBuddy ? (
              <IconButton component={Link} to="/buddy-inbox" sx={{ mr: 2 }}>
                <Mail />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Inbox
                </Typography>
              </IconButton>
            ) : (
              <IconButton component={Link} to="/user-inbox" sx={{ mr: 2 }}>
                <Mail />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Inbox
                </Typography>
              </IconButton>
            )}
            <IconButton component={Link} to={isBuddy ? '/buddy-dashboard' : '/dashboard'}>
              <Avatar src={userProfile?.photos?.length > 0 ? userProfile.photos[0] : undefined} />
            </IconButton>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">{t('header.login')}</Button>
            <Button bgcolor="#1f7370" color= '#EFE9E0' variant="contained" component={Link} to="/signup" sx={{ mx: 1 }}>{t('header.signup')}</Button>
          </>
        )}
        <Select value={language} onChange={handleLanguageChange} size="small" sx={{ color: 'inherit', mr: 1 }}>
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="hi">HI</MenuItem>
          <MenuItem value="fr">FR</MenuItem>
          <MenuItem value="zh">ZH</MenuItem>
          <MenuItem value="es">ES</MenuItem>
          <MenuItem value="jp">JP</MenuItem>
          <MenuItem value="ru">RU</MenuItem>
          <MenuItem value="ar">AR</MenuItem>
        </Select>
        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;