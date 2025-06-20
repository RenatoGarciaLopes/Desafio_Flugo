import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Funcionario } from '../shared/types/funcionario';
import { getCollaborators } from '../shared/services/collaboratorService';
import { Alert, Box, CircularProgress } from '@mui/material';
import { DashboardLayout } from '../shared/layouts/DashboardLayout';
import { Cabecalho, SectionHeader, TabelaColaboradores } from '../shared/components';
import { useNavigate } from 'react-router-dom';

type OrderBy = keyof Funcionario | '';

export function ListarColaboradores() {
  const navigate = useNavigate();
  const [collaborators, setCollaborators] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<OrderBy>('');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');

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

  const handleRequestSort = useCallback((property: keyof Funcionario) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, [orderBy, orderDirection]);

  const sortedCollaborators = useMemo(() => {
    if (!orderBy) {
      return collaborators;
    }

    return [...collaborators].sort((a, b) => {

      const valueA = a[orderBy];
      const valueB = b[orderBy];


      if (valueA === undefined && valueB === undefined) return 0;
      if (valueA === undefined) return orderDirection === 'asc' ? 1 : -1;
      if (valueB === undefined) return orderDirection === 'asc' ? -1 : 1;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return orderDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (valueA < valueB) {
        return orderDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return orderDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [collaborators, orderBy, orderDirection]);

  const handleNewCollaboratorClick = () => {
    navigate('/AdicionarColaborador');
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

      <Cabecalho />

      <SectionHeader
        title="Colaboradores"
        actionButtonText="Novo Colaborador"
        onActionButtonClick={handleNewCollaboratorClick}
      />

      <TabelaColaboradores
        collaborators={sortedCollaborators}
        orderBy={orderBy}
        orderDirection={orderDirection}
        onRequestSort={handleRequestSort}
      />

    </DashboardLayout>
  );
}