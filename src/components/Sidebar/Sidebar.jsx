import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Avatar, 
  Divider,
  ListItemButton
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// Import Nunito font - add this to your index.html or via CSS import
// <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet">

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/' 
    },
    { 
      text: 'Users', 
      icon: <PersonIcon />, 
      path: '/users' 
    },
    { 
      text: 'Analytics', 
      icon: <AnalyticsIcon />, 
      path: '/users/analytics' 
    },
    { 
      text: 'Schedule Meeting', 
      icon: <ScheduleIcon />, 
      path: '/users/meet' 
    },
    { 
      text: 'Settings', 
      icon: <SettingsIcon />, 
      path: '/settings' 
    }
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ 
          width: 32, 
          height: 32, 
          backgroundColor: '#000', 
          borderRadius: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Box sx={{ 
            color: '#fff', 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: 0.5, 
            width: 16, 
            height: 16 
          }}>
            <Box sx={{ width: '100%', height: '100%', backgroundColor: '#fff' }}></Box>
            <Box sx={{ width: '100%', height: '100%', backgroundColor: '#fff' }}></Box>
            <Box sx={{ width: '100%', height: '100%', backgroundColor: '#fff' }}></Box>
            <Box sx={{ width: '100%', height: '100%', backgroundColor: '#fff' }}></Box>
          </Box>
        </Box>
        <Typography variant="h6" sx={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>
          Admin Panel
        </Typography>
      </Box>
      
      <List sx={{ mt: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem 
              key={item.text} 
              disablePadding
              sx={{ 
                color: isActive ? '#1976d2' : '#475467',
                mb: 0.5,
              }}
            >
              <ListItemButton 
                onClick={() => navigate(item.path)}
                sx={{
                  py: 1,
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                  },
                  backgroundColor: isActive ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: isActive ? '#1976d2' : '#475467',
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: 14,
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: isActive ? 600 : 500
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      <Divider />
      
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2 
      }}>
        <Avatar               src="data:image/jpeg;base64,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" alt="John Smith" />
        <Box>
          <Typography 
            variant="subtitle2" 
            sx={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
          >
            Syed Ali Akbar
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontFamily: 'Nunito, sans-serif', fontSize: 12 }}
          >
            Administrator
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;