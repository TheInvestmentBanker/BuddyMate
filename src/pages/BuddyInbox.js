import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: { main: '#40C4FF', contrastText: '#fff' },
    background: { default: '#f5f5f5', paper: '#fff' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function BuddyInbox({ darkMode, setDarkMode, language, setLanguage, userProfile }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/inbox/${userProfile.username}`)
      .then(res => res.json())
      .then(data => setMessages(data.messages || []))
      .catch(err => console.error('Fetch Inbox Error:', err));
  }, [userProfile.username]);

  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} isLoggedIn={true} userProfile={userProfile} isBuddy={true} />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Inbox
        </Typography>
        <List sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 2 }}>
          {messages.length === 0 ? (
            <Typography>No messages yet.</Typography>
          ) : (
            messages.map((msg, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid grey.300' }}>
                <ListItemText
                  primary={`From: ${msg.from}`}
                  secondary={msg.message}
                  sx={{ bgcolor: 'white', p: 1, borderRadius: 2 }}
                />
                <Button component={Link} to={`/chat/${msg.from}`} variant="contained" color="primary" size="small">
                  Reply
                </Button>
              </ListItem>
            ))
          )}
        </List>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default BuddyInbox;