import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface CabecalhoProps {
  title: string;
  actionButtonText: string;
  onActionButtonClick: () => void;
}

export const Cabecalho = ({ title, actionButtonText, onActionButtonClick }: CabecalhoProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
      <Typography variant="h4">
        {title}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onActionButtonClick}
      >
        {actionButtonText}
      </Button>
    </Box>
  );
};