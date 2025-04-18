import React, { useState } from 'react';
import { 
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
  Button,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Slider,
  useMediaQuery
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Settings as SettingsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
  Help as HelpIcon
} from '@mui/icons-material';

// Import SCSS file - create this file in your project
// import './SettingsPage.scss';

// SettingsPage.scss content (to be saved separately):
/*
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap');

.settings-page {
  font-family: 'Nunito', sans-serif !important;
  
  .settings-container {
    padding: 24px;
  }
  
  .settings-paper {
    padding: 24px;
    margin-bottom: 16px;
    
    &.dark {
      background-color: #303030;
      color: #fff;
    }
  }
  
  .settings-heading {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    
    .icon {
      margin-right: 12px;
      color: #1976d2;
    }
  }
  
  .settings-sidebar {
    .settings-nav-button {
      width: 100%;
      justify-content: flex-start;
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 8px;
      text-transform: none;
      
      &.active {
        background-color: rgba(25, 118, 210, 0.12);
        color: #1976d2;
        
        &.dark {
          background-color: rgba(64, 137, 210, 0.15);
          color: #90caf9;
        }
      }
      
      .nav-icon {
        margin-right: 16px;
      }
    }
  }
  
  .setting-item {
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    border: 1px solid #e0e0e0;
    
    &.dark {
      border-color: #555;
      background-color: #333;
    }
    
    .setting-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      
      .setting-title {
        margin-bottom: 4px;
      }
      
      .setting-description {
        color: #757575;
        
        &.dark {
          color: #aaa;
        }
      }
    }
  }
  
  .slider-container {
    display: flex;
    align-items: center;
    width: 200px;
    
    .font-size-sm {
      font-size: 12px;
    }
    
    .font-size-lg {
      font-size: 20px;
    }
  }
}
*/

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('English');
  const [activeTab, setActiveTab] = useState('general');
  const isMobile = useMediaQuery('(max-width:768px)');

  // Create a theme that uses Nunito font
  const theme = createTheme({
    typography: {
      fontFamily: '"Nunito", sans-serif',
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  // Navigation items
  const navItems = [
    { id: 'general', label: 'General', icon: <PersonIcon /> },
    { id: 'appearance', label: 'Appearance', icon: darkMode ? <LightModeIcon /> : <DarkModeIcon /> },
    { id: 'notifications', label: 'Notifications', icon: <NotificationsIcon /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <SecurityIcon /> },
    { id: 'language', label: 'Language', icon: <LanguageIcon /> },
    { id: 'data', label: 'Data & Storage', icon: <StorageIcon /> },
    { id: 'help', label: 'Help & Support', icon: <HelpIcon /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box className="settings-page" sx={{ backgroundColor: darkMode ? '#1a1a1a' : '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg" className="settings-container">
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3, py: 4 }}>
            {/* Sidebar */}
            <Box sx={{ width: isMobile ? '100%' : '250px', flexShrink: 0 }}>
              <Paper 
                className={`settings-paper ${darkMode ? 'dark' : ''}`}
                elevation={2}
              >
                <Box className="settings-heading">
                  <SettingsIcon className="icon" />
                  <Typography variant="h5" component="h1" fontWeight="bold">
                    Settings
                  </Typography>
                </Box>
                
                <Box className="settings-sidebar">
                  <List disablePadding>
                    {navItems.map((item) => (
                      <ListItem 
                        key={item.id} 
                        disablePadding
                        className={`settings-nav-button ${activeTab === item.id ? 'active' : ''} ${darkMode ? 'dark' : ''}`}
                        onClick={() => handleTabChange(item.id)}
                        sx={{ 
                          cursor: 'pointer',
                          borderRadius: 1,
                          mb: 1,
                          '&:hover': {
                            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <ListItemIcon className="nav-icon" sx={{ minWidth: '40px' }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Paper>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1 }}>
              <Paper 
                className={`settings-paper ${darkMode ? 'dark' : ''}`}
                elevation={2}
              >
                {/* General Settings */}
                {activeTab === 'general' && (
                  <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                      General Settings
                    </Typography>
                    
                    <Box className={`setting-item ${darkMode ? 'dark' : ''}`}>
                      <Box className="setting-header">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" className="setting-title">
                            Account Information
                          </Typography>
                          <Typography variant="body2" className={`setting-description ${darkMode ? 'dark' : ''}`}>
                            Update your account details and profile information
                          </Typography>
                        </Box>
                        <Button variant="contained" color="primary">
                          Edit Profile
                        </Button>
                      </Box>
                    </Box>
                    
                    <Box className={`setting-item ${darkMode ? 'dark' : ''}`}>
                      <Box className="setting-header">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" className="setting-title">
                            Connected Accounts
                          </Typography>
                          <Typography variant="body2" className={`setting-description ${darkMode ? 'dark' : ''}`}>
                            Manage your linked third-party accounts and services
                          </Typography>
                        </Box>
                        <Button variant="contained" color="primary">
                          Manage Connections
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Appearance Settings */}
                {activeTab === 'appearance' && (
                  <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                      Appearance Settings
                    </Typography>
                    
                    <Box className={`setting-item ${darkMode ? 'dark' : ''}`}>
                      <Box className="setting-header">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" className="setting-title">
                            Dark Mode
                          </Typography>
                          <Typography variant="body2" className={`setting-description ${darkMode ? 'dark' : ''}`}>
                            Switch between light and dark themes
                          </Typography>
                        </Box>
                        <Switch
                          checked={darkMode}
                          onChange={handleDarkModeToggle}
                          color="primary"
                        />
                      </Box>
                    </Box>
                    
                    <Box className={`setting-item ${darkMode ? 'dark' : ''}`}>
                      <Box className="setting-header">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" className="setting-title">
                            Font Size
                          </Typography>
                          <Typography variant="body2" className={`setting-description ${darkMode ? 'dark' : ''}`}>
                            Adjust the text size for better readability
                          </Typography>
                        </Box>
                        <Box className="slider-container">
                          <Typography variant="body2" className="font-size-sm" sx={{ mr: 1 }}>A</Typography>
                          <Slider
                            defaultValue={2}
                            step={1}
                            marks
                            min={1}
                            max={3}
                            sx={{ mx: 1 }}
                          />
                          <Typography variant="body1" className="font-size-lg" sx={{ ml: 1 }}>A</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                      Notification Settings
                    </Typography>
                    
                    <Box className={`setting-item ${darkMode ? 'dark' : ''}`}>
                      <Box className="setting-header">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" className="setting-title">
                            Enable Notifications
                          </Typography>
                          <Typography variant="body2" className={`setting-description ${darkMode ? 'dark' : ''}`}>
                            Receive alerts for important updates and activities
                          </Typography>
                        </Box>
                        <Switch
                          checked={notificationsEnabled}
                          onChange={handleNotificationsToggle}
                          color="primary"
                        />
                      </Box>
                    </Box>
                    
                    <Box className={`setting-item ${darkMode ? 'dark' : ''}`}>
                      <Box className="setting-header">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" className="setting-title">
                            Email Notifications
                          </Typography>
                          <Typography variant="body2" className={`setting-description ${darkMode ? 'dark' : ''}`}>
                            Get important updates delivered to your inbox
                          </Typography>
                        </Box>
                        <Switch
                          defaultChecked
                          color="primary"
                        />
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Language Settings */}
                {activeTab === 'language' && (
                  <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                      Language Settings
                    </Typography>
                    
                    <Box className={`setting-item ${darkMode ? 'dark' : ''}`}>
                      <Box className="setting-header">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" className="setting-title">
                            Display Language
                          </Typography>
                          <Typography variant="body2" className={`setting-description ${darkMode ? 'dark' : ''}`}>
                            Select your preferred language for the interface
                          </Typography>
                        </Box>
                        <FormControl sx={{ minWidth: 150 }}>
                          <Select
                            value={language}
                            onChange={handleLanguageChange}
                            size="small"
                          >
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Spanish">Spanish</MenuItem>
                            <MenuItem value="French">French</MenuItem>
                            <MenuItem value="German">German</MenuItem>
                            <MenuItem value="Japanese">Japanese</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Placeholder content for other tabs */}
                {['privacy', 'data', 'help'].includes(activeTab) && (
                  <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                      {activeTab === 'privacy' && 'Privacy & Security'}
                      {activeTab === 'data' && 'Data & Storage'}
                      {activeTab === 'help' && 'Help & Support'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Settings for {activeTab} will appear here.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default SettingsPage;