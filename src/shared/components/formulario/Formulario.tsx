import { TextField, Switch, FormControlLabel, Typography, Box } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import type { Funcionario } from '../../types/funcionario';


export const Formulario = () => {
  const { register, formState: { errors }, control } = useFormContext<Funcionario>();

  return (
    <Box  minHeight={'440px'}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight:'bold' }} color='text.secondary'>Informações Básicas</Typography>
      <TextField
        {...register('name', { required: 'O nome é obrigatório' })}
        label="Nome"
        placeholder="João da Silva"
        fullWidth
        variant="outlined"
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mb: 2 }}
      />
      <TextField
        {...register('email', { 
          required: 'O e-mail é obrigatório',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Formato de e-mail inválido'
          }
        })}
        label="E-mail"
        placeholder="john@gmail.com"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ mb: 2 }}
      />
      
      <Controller
        name="status"
        control={control}
        defaultValue="Ativo" 
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                checked={field.value === 'Ativo'}
                onChange={(e) => field.onChange(e.target.checked ? 'Ativo' : 'Inativo')}
              />
            }
            label="Ativar ao criar"
          />
        )}
      />
    </Box>
  );
};