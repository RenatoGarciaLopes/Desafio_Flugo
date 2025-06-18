import type { Employee } from '../../types/employee';
import { Avatar, Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TableSortLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface TabelaColaboradoresProps {
  collaborators: Employee[];
  orderBy: keyof Employee | '';
  orderDirection: 'asc' | 'desc';
  onRequestSort: (property: keyof Employee) => void;
}

export const TabelaColaboradores = ({ collaborators, orderBy, orderDirection, onRequestSort }: TabelaColaboradoresProps) => {
  const theme = useTheme();

  const createSortHandler = (property: keyof Employee) => () => {
    onRequestSort(property);
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '16px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="tabela de colaboradores">
        <TableHead sx={{backgroundColor: '#F4F6F8'}}>
          <TableRow>
           
            <TableCell sx={{ color: 'text.secondary' }}>
              <TableSortLabel
                active={orderBy === 'name'} 
                direction={orderBy === 'name' ? orderDirection : 'desc'}
                onClick={createSortHandler('name')}
                hideSortIcon={false} 
                sx={{
                  '& .MuiTableSortLabel-icon': { 
                    opacity: 1, 
                  }
                }}
              >
                Nome
              </TableSortLabel>
            </TableCell>
            
            <TableCell sx={{ color: 'text.secondary' }}>
              <TableSortLabel
                active={orderBy === 'email'}
                direction={orderBy === 'email' ? orderDirection : 'desc'}
                onClick={createSortHandler('email')}
                hideSortIcon={false}
                sx={{
                  '& .MuiTableSortLabel-icon': {
                    opacity: 1,
                  }
                }}
              >
                Email
              </TableSortLabel>
            </TableCell>
           
            <TableCell sx={{ color: 'text.secondary' }}>
              <TableSortLabel
                active={orderBy === 'department'}
                direction={orderBy === 'department' ? orderDirection : 'desc'}
                onClick={createSortHandler('department')}
                hideSortIcon={false}
                sx={{
                  '& .MuiTableSortLabel-icon': {
                    opacity: 1,
                  }
                }}
              >
                Departamento
              </TableSortLabel>
            </TableCell>
            
            <TableCell sx={{ color: 'text.secondary' }}>
              <TableSortLabel
                active={orderBy === 'status'}
                direction={orderBy === 'status' ? orderDirection : 'desc'}
                onClick={createSortHandler('status')}
                hideSortIcon={false}
                sx={{
                  '& .MuiTableSortLabel-icon': {
                    opacity: 1,
                  }
                }}
              >
                Status
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collaborators.map((collab) => (
            <TableRow key={collab.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={collab.avatarUrl} sx={{ mr: 2 }}>
                    {collab.name.charAt(0)}
                  </Avatar>
                  <Typography variant="body2">{collab.name}</Typography>
                </Box>
              </TableCell>
              <TableCell>{collab.email}</TableCell>
              <TableCell>{collab.department}</TableCell>
              <TableCell>
                <Chip
                  label={collab.status}
                  size="small"
                  sx={{
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  backgroundColor: collab.status === 'Ativo' ? theme.palette.status.ativoBg : theme.palette.status.inativoBg,
                  color: collab.status === 'Ativo' ? theme.palette.status.ativoText : theme.palette.status.inativoText
                }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};