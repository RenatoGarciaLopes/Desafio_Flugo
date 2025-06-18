import { TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import type { Employee } from '../../types/employee';

const departments = [
  'Comercial',
  'Marketing',
  'Tecnologia',
  'Financeiro',
  'Recursos Humanos',
];

export const FormularioProfissional = () => {

  const { formState: { errors, isSubmitted }, control } = useFormContext<Employee>();


  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Informações Profissionais</Typography>

      <Controller
        name="department"
        control={control}
        defaultValue="" 
        rules={{ required: 'O departamento é obrigatório' }}
        render={({ field, fieldState }) => {
       
          const showErrorDepartment = !!errors.department && (fieldState.isTouched || isSubmitted);

          return (
            <FormControl
              fullWidth
              error={showErrorDepartment}
            >
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
              {showErrorDepartment && (
                <Typography variant="caption" color="error.main" sx={{ mt: 1, ml: 2 }}>
                  {errors.department?.message}
                </Typography>
              )}
            </FormControl>
          );
        }}
      />

      <TextField
        {...control.register('avatarUrl')}
        label="URL do Avatar (Opcional)"
        placeholder="https://example.com/avatar.png"
        fullWidth
        // Para campos opcionais, é mais comum mostrar o erro apenas na submissão final
        // ou se houver uma validação de formato (ex: pattern) e o campo for dirty/tocado
        error={!!errors.avatarUrl && isSubmitted}
        helperText={!!errors.avatarUrl && isSubmitted ? errors.avatarUrl?.message : ''}
        sx={{ mt: 3 }}
      />
    </Box>
  );
};