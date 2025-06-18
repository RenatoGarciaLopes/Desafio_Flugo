import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; 


export const BreadcrumbsNavegacao = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Breadcrumbs 
    aria-label="breadcrumb" 
    sx={{ mb: 2 }}
    separator= "•">
      <Link
        underline="hover"
        color="inherit"
        href="/dashboard"
        onClick={(e) => {
          e.preventDefault();
          navigate('/dashboard');
        }}
        sx={{
          cursor: 'pointer',
          color: theme.palette.text.primary,
          '&:hover': {
            color: theme.palette.primary.dark,}
        }}
      >
        Colaboradores
      </Link>
      <Typography color="text.secundary">Cadastrar Colaborador</Typography>
    </Breadcrumbs>
  );
};