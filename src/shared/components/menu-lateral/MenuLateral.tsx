import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import flugoLogo from '../../../assets/Logo_flugo.png';

const drawerWidth = 240;

interface MenuLateralProps {
  variant: 'permanent' | 'persistent' | 'temporary';
  open: boolean;
  onClose: () => void;
}

export const MenuLateral = ({ variant, open, onClose }: MenuLateralProps) => {
  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <img src={flugoLogo} alt="Logo da Flugo" style={{ height: 40 }} />
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton selected>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Colaboradores" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};