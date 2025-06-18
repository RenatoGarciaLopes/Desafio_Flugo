import { Box, LinearProgress, Typography } from '@mui/material';

interface BarraDeProgressoProps {
  valor: number;
}

export const BarraDeProgresso = ({ valor }: BarraDeProgressoProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={valor} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(valor)}%`}</Typography>
      </Box>
    </Box>
  );
};