import type { Employee } from '../../../shared/types/employee';
import { Avatar, Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface TabelaColaboradoresProps {
  collaborators: Employee[];
}

export const TabelaColaboradores = ({ collaborators }: TabelaColaboradoresProps) => {
  const theme = useTheme();
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '16px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="tabela de colaboradores">
        <TableHead sx={{backgroundColor: '#F4F6F8'}}>
          <TableRow>
            <TableCell sx={{ color: 'text.secondary' }}>Nome</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Email</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Departamento</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Status</TableCell>
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