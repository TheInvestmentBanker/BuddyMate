import React, { memo, useCallback, useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { FaBars, FaHome, FaUser, FaCalendarAlt, FaImages, FaInfo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EdgeHeart = memo(() => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const scrollToBox = (boxId) => {
    const box = document.getElementById(boxId);
    if (box) {
      box.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const iconButtonBg = theme.palette.mode === 'dark' ? '#C02641' : '#C02641'; // Matches your theme
  const iconButtonColor = theme.palette.mode === 'dark' ? '#ffffff' : '#fff';

  return (
    <Box sx={{ position: 'fixed', bottom: '30px', right: '25px', zIndex: 10 }}>
      <IconButton
    aria-label="Toggle Navigation"
     onClick={handleToggle}
    sx={{
     width: '60px',
     height: '60px',
     bgcolor: iconButtonBg,
     color: iconButtonColor,
     borderRadius: '50%',
     boxShadow: theme.palette.mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.3)',
     clipPath: 'path("M30 15 C 45 5, 60 20, 60 35 C 60 50, 45 65, 30 85 C 15 65, 0 50, 0 35 C 0 20, 15 5, 30 15 Z")',
     transition: 'transform 0.3s',
      '&:hover': { transform: 'scale(1.1)', bgcolor: iconButtonBg },
     }}
>
    </IconButton>
      <Box
        sx={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          transform: open ? 'scale(1)' : 'scale(0)',
          transformOrigin: 'bottom right',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <IconButton
          aria-label="Home"
          onClick={() => scrollToBox('Home')}
          sx={{
            width: '50px',
            height: '50px',
            bgcolor: 'green',
            color: '#fff',
            borderRadius: '50%',
            '&:hover': { bgcolor: 'darkgreen' },
          }}
        >
          <FaHome size={20} />
        </IconButton>
        <IconButton
          aria-label="Profile"
          onClick={() => navigate('/signup')}
          sx={{
            width: '50px',
            height: '50px',
            bgcolor: 'red',
            color: '#fff',
            borderRadius: '50%',
            '&:hover': { bgcolor: 'darkred' },
          }}
        >
          <FaUser size={20} />
        </IconButton>
        <IconButton
          aria-label="Events"
          onClick={() => scrollToBox('Event')}
          sx={{
            width: '50px',
            height: '50px',
            bgcolor: 'purple',
            color: '#fff',
            borderRadius: '50%',
            '&:hover': { bgcolor: 'darkpurple' },
          }}
        >
          <FaCalendarAlt size={20} />
        </IconButton>
        <IconButton
          aria-label="Gallery"
          onClick={() => scrollToBox('Gallery')}
          sx={{
            width: '50px',
            height: '50px',
            bgcolor: 'teal',
            color: '#fff',
            borderRadius: '50%',
            '&:hover': { bgcolor: 'darkteal' },
          }}
        >
          <FaImages size={20} />
        </IconButton>
        <IconButton
          aria-label="About"
          onClick={() => scrollToBox('About')}
          sx={{
            width: '50px',
            height: '50px',
            bgcolor: 'blue',
            color: '#fff',
            borderRadius: '50%',
            '&:hover': { bgcolor: 'darkblue' },
          }}
        >
          <FaInfo size={20} />
        </IconButton>
      </Box>
    </Box>
  );
});

export default EdgeHeart;