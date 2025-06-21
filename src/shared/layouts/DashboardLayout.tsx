import { useState } from 'react';
import type { ReactNode } from 'react';
import { AppBar, Box, IconButton, Toolbar, useMediaQuery, useTheme, Avatar } from '@mui/material'; // Adicionado Avatar
import MenuIcon from '@mui/icons-material/Menu';
import { MenuLateral } from '../components/menu-lateral/MenuLateral.tsx';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <MenuLateral
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        {isMobile ? (
          <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', mb: 2 }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <IconButton
                color="primary"
                aria-label="abrir menu"
                onClick={() => setSidebarOpen(true)}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <IconButton>
                <Avatar alt="Renato Lopes" />
              </IconButton>
            </Toolbar>
          </AppBar>
        ) : (
          // Avatar para desktop, alinhado à direita
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton>
              <Avatar alt="Renato Lopes" />
            </IconButton>
          </Box>
        )}

        {children}

      </Box>
    </Box>
  );
};