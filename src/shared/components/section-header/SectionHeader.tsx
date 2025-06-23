import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface SectionHeaderProps {
  title: string;
  actionButtonText: string;
  onActionButtonClick: () => void;
}

export const SectionHeader = ({ title, actionButtonText, onActionButtonClick }: SectionHeaderProps) => {
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
        sx={{paddingTop:'13px', paddingBottom: '13px'}}
      >
        {actionButtonText}
      </Button>
    </Box>
  );
};