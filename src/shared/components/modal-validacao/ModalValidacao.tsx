import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';


import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


interface ModalValidacaoProps {
  open: boolean;
  onClose: () => void;
  onRegisterNew: () => void;
}

export const ModalValidacao = ({ open, onClose, onRegisterNew }: ModalValidacaoProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open}
      disableEscapeKeyDown={true}>
      <DialogTitle>Sucesso!</DialogTitle>
      <DialogContent sx={{ textAlign: 'center', py: 3 }}>

        <CheckCircleOutlineIcon
          color="success"
          sx={{ fontSize: 80, mb: 2 }}
        />
        <Typography variant="h6" component="p" gutterBottom>
          Colaborador cadastrado com sucesso!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Você pode cadastrar outro ou retornar ao dashboard.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            onClose();
            navigate('/dashboard');
          }}
        >
          Voltar a dashboard
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            onRegisterNew();
          }}
        >
          Cadastrar outro colaborador
        </Button>
      </DialogActions>
    </Dialog>
  );
}