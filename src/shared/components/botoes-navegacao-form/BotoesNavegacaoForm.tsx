// src/shared/components/form-navigation-buttons/BotoesNavegacaoForm.tsx
import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react';

interface BotoesNavegacaoFormProps {
  activeStep: number;
  isLastStep: boolean;
  isSubmitting: boolean;
  handleBack: () => void;
  handleNext?: () => void; // Opcional, pois não é usado no último passo
  onSubmit?: () => void; // Opcional, para o botão de submit do último passo
}

export const BotoesNavegacaoForm: React.FC<BotoesNavegacaoFormProps> = ({
  activeStep,
  isLastStep,
  isSubmitting,
  handleBack,
  handleNext,
  onSubmit,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
      <Button
        variant="text"
        disabled={activeStep === 0 || isSubmitting}
        onClick={handleBack}
        sx={{ color: 'text.primary', fontWeight: 'bold' }}
      >
        Voltar
      </Button>
      {isLastStep ? (
        <Button variant="contained" type="submit" disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Concluir'}
        </Button>
      ) : (
        <Button variant="contained" onClick={handleNext}>
          Próximo
        </Button>
      )}
    </Box>
  );
};