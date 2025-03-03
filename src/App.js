import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home';
import Signup from './pages/Signup';
import SignupBuddy from './pages/SignupBuddy';
import Login from './pages/Login';
import BreatheIn from './pages/BreathIn';
import Legal from './pages/Legal';
import LegalBuddy from './pages/LegalBuddy';
import Dashboard from './pages/Dashboard';
import Recharge from './pages/Recharge';
import BuddyProfile from './pages/BuddyProfile';
import AllBuddies from './pages/AllBuddies';
import BuddyDashboard from './pages/BuddyDashboard';
import BuddyInbox from './pages/BuddyInbox';
import UserInbox from './pages/UserInbox';
import ChatConversation from './pages/ChatConversation';
import './App.css';

const lightTheme = createTheme({
  palette: {
    primary: { main: '#0F9E99', contrastText: '#fff' },
    background: { default: '#EFE9E0', paper: '#EFE9E0' },
    text: { primary: '#333', secondary: '#666' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

const darkTheme = createTheme({
  palette: {
    primary: { main: '#0F9E99', contrastText: '#fff' },
    background: { default: '#121E2C', paper: '#2a2a2a' },
    text: { primary: '#ffffff', secondary: '#f2f2f2' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    username: '',
    gender: '',
    location: '',
    interests: [],
    photos: [],
    isBuddy: false, // Added to track Buddy status
  });

  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        {isLoading ? (
          <BreatheIn onFinish={handleFinishLoading} />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  language={language}
                  setLanguage={setLanguage}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                />
              }
            />
            <Route
              path="/signup"
              element={<Signup setIsLoggedIn={setIsLoggedIn} setUserProfile={setUserProfile} />}
            />
            <Route
              path="/signup-buddy"
              element={<SignupBuddy darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />}
            />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} setUserProfile={setUserProfile} />}
            />
            <Route
              path="/legal"
              element={<Legal darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />}
            />
            <Route
              path="/legal-buddy"
              element={<LegalBuddy darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} />}
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  language={language}
                  setLanguage={setLanguage}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="/buddy-dashboard"
              element={
                <BuddyDashboard
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  language={language}
                  setLanguage={setLanguage}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="/recharge"
              element={<Recharge darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} userProfile={userProfile} />}
            />
            <Route
              path="/buddy/:id"
              element={<BuddyProfile darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} isLoggedIn={isLoggedIn} userProfile={userProfile} />}
            />
            <Route
              path="/all-buddies"
              element={<AllBuddies darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} isLoggedIn={isLoggedIn} userProfile={userProfile} />}
            />
            <Route
              path="/buddy-inbox"
              element={<BuddyInbox darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} userProfile={userProfile} />}
            />
            <Route
              path="/user-inbox"
              element={<UserInbox darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} userProfile={userProfile} />}
            />
            <Route
              path="/chat/:username"
              element={<ChatConversation darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} userProfile={userProfile} isLoggedIn={isLoggedIn} />}
            />
          </Routes>
        )}
      </ThemeProvider>
    </Router>
  );
}

export default App;