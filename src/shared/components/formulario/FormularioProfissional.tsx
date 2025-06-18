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
  const { register, formState: { errors }, control } = useFormContext<Employee>();

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Informações Profissionais</Typography>

      {/* Usando o Controller para integrar o Select do MUI com o react-hook-form */}
      <Controller
        name="department"
        control={control}
        rules={{ required: 'O departamento é obrigatório' }}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.department}>
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
        error={!!errors.avatarUrl}
        helperText={errors.avatarUrl?.message}
        sx={{ mt: 3 }}
      />
    </Box>
  );
};