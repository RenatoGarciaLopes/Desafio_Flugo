import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const BreadcrumbsNavegacao = () => {
  const navigate = useNavigate();

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link
        underline="hover"
        color="inherit"
        href="/dashboard"
        onClick={(e) => {
          e.preventDefault();
          navigate('/dashboard');
        }}
        sx={{cursor: 'pointer'}}
      >
        Colaboradores
      </Link>
      <Typography color="text.primary">Cadastrar Colaborador</Typography>
    </Breadcrumbs>
  );
};