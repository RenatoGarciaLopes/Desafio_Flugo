import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; 
import flugoLogo from '../../../assets/Logo_flugo.png'; 
import squircleIconBg from '../../../assets/squircle_icon.svg'; 
import { useNavigate } from 'react-router-dom'; 
import { useTheme } from '@mui/material/styles'; 

const drawerWidth = 300; 

interface MenuLateralProps { 
  variant: 'permanent' | 'persistent' | 'temporary'; 
  open: boolean; 
  onClose: () => void; 
}

export const MenuLateral = ({ variant, open, onClose }: MenuLateralProps) => { 
  const navigate = useNavigate(); 
  const theme = useTheme();

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
          borderRight: `1px dashed ${'#919EAB33'}`,
        },
      }}
    >
      <Box sx={{ p: 2 }}> 
        <img src={flugoLogo} alt="Logo da Flugo" style={{ height: 35 }} /> 
      </Box>
      <List> 
        <ListItem disablePadding> 
          <ListItemButton
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '8px',
              marginLeft:'10px',
              py: '12px',
              px: '16px',
              '&.Mui-selected': {
                backgroundColor: theme.palette.action.selected,
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            onClick={() => navigate('/dashboard')} 
          >
            <ListItemIcon
              sx={{
                minWidth: 'auto',
                mr: '16px',
                width: 40,
                height: 40,
                borderRadius: '8px', 
                
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                
                
              }}
            >
             
              <img
                src={squircleIconBg}
                alt="Ícone Colaboradores"
                style={{
                  width: '70%', 
                  height: '70%',
                  display: 'block', 
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Colaboradores"
            />
            <ChevronRightIcon sx={{ color: theme.palette.action.active }} /> 
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};