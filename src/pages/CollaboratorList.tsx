import { useState, useEffect } from 'react';
import type { Employee } from '../types/employee';
import { getCollaborators } from '../services/collaboratorService';
import { Alert, Avatar, Box, Button, Chip, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DashboardLayout } from '../layouts/DashboardLayout';
import AddIcon from '@mui/icons-material/Add';


export function CollaboratorList() {
  const [collaborators, setCollaborators] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCollaborators() {
      try {
        setLoading(true);
        const data = await getCollaborators();
        setCollaborators(data);
      } catch (err) {
        setError('Falha ao carregar colaboradores.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCollaborators();
  }, []);


  if (loading) {
  return <CircularProgress />; // Componente de carregamento do MUI
}

if (error) {
  return <Alert severity="error">{error}</Alert>; // Componente de alerta do MUI
}

 return (
    // O DashboardLayout cria a sidebar e a área de conteúdo principal
    <DashboardLayout>
    
      {/* BLOCO 1: HEADER COM O AVATAR */}
      {/* Este Box empurra seu conteúdo (o avatar) para a direita */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton>
          <Avatar alt="Renato Lopes" />
        </IconButton>
      </Box>

      {/* BLOCO 2: TÍTULO DA PÁGINA E BOTÃO */}
      {/* Este Box coloca um item na esquerda (título) e outro na direita (botão) */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Colaboradores
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#22C55E', /* ...outros estilos do botão... */ }}
        >
          Novo Colaborador
        </Button>
      </Box>
      
      {/* BLOCO 3: A TABELA */}
      {/* A tabela virá aqui. Se não há dados, ela não aparecerá. */}
    <TableContainer component={Paper} sx={{ borderRadius: '16px' }}>
    <Table sx={{ minWidth: 650 }} aria-label="tabela de colaboradores">
        
        {/* CABEÇALHO DA TABELA */}
        <TableHead>
        <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Departamento</TableCell>
            <TableCell>Status</TableCell>
        </TableRow>
        </TableHead>
        
        {/* CORPO DA TABELA (DADOS) */}
        <TableBody>
        {collaborators.map((collab) => (
            <TableRow
            key={collab.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            {/* Célula do Nome com Avatar */}
            <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={collab.avatarUrl} sx={{ mr: 2 }}>
                    {/* Fallback: Mostra a primeira letra do nome se não houver imagem */}
                    {collab.name.charAt(0)} 
                </Avatar>
                <Typography variant="body2">{collab.name}</Typography>
                </Box>
            </TableCell>

            {/* Célula do Email */}
            <TableCell>{collab.email}</TableCell>
            
            {/* Célula do Departamento */}
            <TableCell>{collab.department}</TableCell>
            
            {/* Célula do Status com Chip colorido */}
            <TableCell>
                <Chip
                label={collab.status}
                color={collab.status === 'Ativo' ? 'success' : 'error'}
                size="small"
                />
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    </TableContainer>

    </DashboardLayout>
  );
}