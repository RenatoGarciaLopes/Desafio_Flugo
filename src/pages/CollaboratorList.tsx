import { useState, useEffect } from 'react';
import type { Employee } from '../shared/types/employee';
import { getCollaborators } from '../shared/services/collaboratorService';
import { Alert, Box, CircularProgress, IconButton, Avatar } from '@mui/material';
import { DashboardLayout } from '../shared/layouts/DashboardLayout';
import { Cabecalho } from '../shared/components/cabecalho/Cabecalho';
import { TabelaColaboradores } from '../shared/components/tabela-colaboradores/TabelaColaboradores';

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

  const handleNewCollaboratorClick = () => {
    console.log('Clicou em Novo Colaborador');
    
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton>
          <Avatar alt="Renato Lopes" />
        </IconButton>
      </Box>

      <Cabecalho
        title="Colaboradores" 
        actionButtonText="Novo Colaborador"
        onActionButtonClick={handleNewCollaboratorClick}
      />

      <TabelaColaboradores collaborators={collaborators} />

    </DashboardLayout>
  );
}