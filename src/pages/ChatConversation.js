import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import EmojiPicker from 'emoji-picker-react'; // Install this

const theme = createTheme({
  palette: {
    primary: { main: '#40C4FF', contrastText: '#fff' },
    background: { default: '#f5f5f5', paper: '#fff' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function ChatConversation({ darkMode, setDarkMode, language, setLanguage, userProfile, isLoggedIn }) {
  const { username } = useParams(); // User to chat with
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`https://buddymate.onrender.com/chat/${userProfile.username}/${username}`)
        .then(res => res.json())
        .then(data => setMessages(data.messages || []))
        .catch(err => console.error('Fetch Chat Error:', err));
    }
  }, [userProfile.username, username, isLoggedIn]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('https://buddymate.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: userProfile.username,
          to: username,
          message: newMessage,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessages([...messages, { from: userProfile.username, message: newMessage, timestamp: new Date() }]);
        setNewMessage('');
      } else {
        alert('Failed to send message: ' + data.error);
      }
    } catch (error) {
      console.error('Send Message Error:', error);
      alert('Network error: ' + error.message);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} isLoggedIn={isLoggedIn} userProfile={userProfile} isBuddy={userProfile.isBuddy} />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Chat with {username}
        </Typography>
        <List sx={{ maxHeight: '60vh', overflowY: 'auto', bgcolor: 'grey.100', p: 2, borderRadius: 2 }}>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ flexDirection: msg.from === userProfile.username ? 'row-reverse' : 'row' }}>
              <ListItemText
                primary={msg.message}
                secondary={new Date(msg.timestamp).toLocaleTimeString()}
                sx={{ bgcolor: msg.from === userProfile.username ? '#40C4FF' : 'white', p: 1, borderRadius: 2, maxWidth: '70%' }}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              fullWidth
            />
            <Button variant="outlined" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              😊
            </Button>
            <Button variant="contained" color="primary" onClick={handleSendMessage}>
              Send
            </Button>
          </Box>
          {showEmojiPicker && (
            <Box sx={{ position: 'absolute', bottom: 80, zIndex: 1 }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ChatConversation;