// src/shared/components/formulario/FormularioProfissional.tsx
import { TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form'; // Importe o Controller
import type { Employee } from '../../types/employee';

// Lista de departamentos para o campo de seleção. Em um projeto real,
// isso poderia vir de uma API.
const departments = [
  'Comercial',
  'Marketing',
  'Tecnologia',
  'Financeiro',
  'Recursos Humanos',
];

export const FormularioProfissional = () => {

  const { formState: { errors, touchedFields, isSubmitted }, control, register } = useFormContext<Employee>(); // Incluído 'register' para o TextField

  // Lógica para determinar se o erro deve ser exibido
  // O erro só é exibido se o campo for inválido E (ele foi tocado OU o formulário foi submetido)
  const showErrorDepartment = !!errors.department && (touchedFields.department || isSubmitted);
  const showErrorAvatarUrl = !!errors.avatarUrl && (touchedFields.avatarUrl || isSubmitted); // Para o campo opcional também


  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Informações Profissionais</Typography>

      <Controller
        name="department"
        control={control}
        rules={{ required: 'O departamento é obrigatório' }}
        render={({ field }) => (
          <FormControl fullWidth error={showErrorDepartment}>
            <InputLabel id="department-select-label">Selecione um departamento</InputLabel>
            <Select
              {...field}
              labelId="department-select-label"
              label="Selecione um departamento"
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
            {errors.department && (
              <Typography variant="caption" color="error.main" sx={{ mt: 1, ml: 2 }}>
                {errors.department.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <TextField
        {...register('avatarUrl')}
        label="URL do Avatar (Opcional)"
        placeholder="https://example.com/avatar.png"
        fullWidth
        error={showErrorAvatarUrl}
        helperText={showErrorAvatarUrl ? errors.avatarUrl?.message : ''}
        sx={{ mt: 3 }}
      />
    </Box>
  );
};