// src/layouts/DashboardLayout.tsx
import type { ReactNode } from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import flugoLogo from '../assets/Logo_flugo.png';

const sidebarWidth = 240;

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
   
    <Box sx={{ display: 'flex', minHeight: '10vh' }}>
      
    
      <Box
        component="nav"
        sx={{ width: sidebarWidth, flexShrink: 0, borderRight: '1px solid rgba(0, 0, 0, 0.12)', height: '100vh' }}
      >
        
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" component="h1">
            <img src={flugoLogo} alt="Logo da Flugo" style={{ height: 40 }} />
          </Typography>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton selected>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Colaboradores" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3,        
          width: `calc(100% - ${sidebarWidth}px)` 
        }}
      >
        {children} {}
      </Box>

    </Box>
  );
}