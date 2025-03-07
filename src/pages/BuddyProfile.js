import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, Chip, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const theme = createTheme({
  palette: {
    primary: { main: '#0F9E99', contrastText: '#fff' },
    background: { default: '#EFE9E0', paper: '#EFE9E0' },
    text: { primary: '#333', secondary: '#666' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function BuddyProfile({ darkMode, setDarkMode, language, setLanguage, isLoggedIn, userProfile }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [buddy, setBuddy] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [canSendFirstMessage, setCanSendFirstMessage] = useState(true);
  const [chatUnlocked, setChatUnlocked] = useState(false);

  useEffect(() => {
    fetch(`https://buddymate.onrender.com/buddies/${id}`)
      .then(res => res.json())
      .then(data => setBuddy(data))
      .catch(err => console.error('Fetch Buddy Error:', err));

    if (isLoggedIn && userProfile.username) {
      fetch(`https://buddymate.onrender.com/chat/${userProfile.username}/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log('Chat data:', data);
          setChat(data.messages || []);
          setCanSendFirstMessage(data.messages.length === 0);
          setChatUnlocked(data.messages.some(msg => msg.from === id));
        })
        .catch(err => console.error('Fetch Chat Error:', err));
    }
  }, [id, isLoggedIn, userProfile.username]);

  const handleSendMessage = async () => {
    if (!isLoggedIn) {
      alert('Please log in to send a message.');
      navigate('/login');
      return;
    }
    if (!canSendFirstMessage && !chatUnlocked) {
      alert('You can only send one message until the Buddy replies.');
      return;
    }
    if (!message.trim()) return;

    try {
      const response = await fetch('https://buddymate.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: userProfile.username,
          to: buddy.username,
          message,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setChat([...chat, { from: userProfile.username, message, timestamp: new Date() }]);
        setMessage('');
        if (canSendFirstMessage) setCanSendFirstMessage(false);
      } else {
        alert('Failed to send message: ' + data.error);
      }
    } catch (error) {
      console.error('Send Message Error:', error);
      alert('Network error: ' + error.message);
    }
  };

  if (!buddy) return <Typography>Loading...</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} isLoggedIn={isLoggedIn} userProfile={userProfile} isBuddy={userProfile.isBuddy} />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar src={`https://buddymate.onrender.com${buddy.photo}`} sx={{ width: 150, height: 150 }} />
          <Typography variant="h4">{buddy.name}</Typography>
          <Typography variant="body1" color="textSecondary">{buddy.role} • {buddy.area}</Typography>
          <Typography variant="body1">{buddy.bio}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip label={`Gender: ${buddy.gender}`} />
            <Chip label={`Age: ${buddy.age}`} />
            <Chip label={`Height: ${buddy.height}`} />
            <Chip label={`Drinking: ${buddy.drinking}`} />
            <Chip label={`Smoking: ${buddy.smoking}`} />
            <Chip label={`Diet: ${buddy.diet}`} />
            <Chip label={`Availability: ${buddy.availabilityType}`} />
          </Box>
          <Typography variant="body1">Free Time: {buddy.freeTime.join(', ')}</Typography>
          <Typography variant="body1">Interests: {buddy.interests.join(', ')}</Typography>
          {buddy.bodyFeatures && <Typography variant="body1">Body Features: {buddy.bodyFeatures}</Typography>}
        </Box>
        {isLoggedIn && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Chat with {buddy.name}</Typography>
            <List sx={{ maxHeight: 200, overflowY: 'auto', bgcolor: 'grey.100', p: 2, borderRadius: 2 }}>
              {chat.map((msg, index) => (
                <ListItem key={index} sx={{ flexDirection: msg.from === userProfile.username ? 'row-reverse' : 'row' }}>
                  <ListItemText
                    primary={msg.message}
                    secondary={new Date(msg.timestamp).toLocaleTimeString()}
                    sx={{ bgcolor: msg.from === userProfile.username ? '#0F9E99' : 'white', p: 1, borderRadius: 2, maxWidth: '70%', color: msg.from === userProfile.username ? '#fff' : '#333' }}
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                fullWidth
                disabled={!canSendFirstMessage && !chatUnlocked}
              />
              <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={!canSendFirstMessage && !chatUnlocked}>
                Send
              </Button>
            </Box>
            {!chatUnlocked && !canSendFirstMessage && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Waiting for {buddy.name} to reply to unlock full chat.
              </Typography>
            )}
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default BuddyProfile;