// src/shared/components/multi-step-form-container/MultiStepFormContainer.tsx
import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { BotoesNavegacaoForm, IndicadorDePasso } from '../index'; 

interface MultiStepFormContainerProps {
  activeStep: number;
  steps: string[];
  isLastStep: boolean;
  isSubmitting: boolean;
  isFormCompleted: boolean;
  handleBack: () => void;
  handleNext?: () => void; 
  onSubmit?: () => void; 
  children: ReactNode; 
}

export const MultiStepFormContainer: React.FC<MultiStepFormContainerProps> = ({
  activeStep,
  steps,
  isLastStep,
  isSubmitting,
  isFormCompleted,
  handleBack,
  handleNext,
  onSubmit,
  children,
}) => {
  const content = (
    <Box sx={{
      display: 'flex',
      gap: 2,
      flexDirection: { xs: 'column', md: 'row' }
    }}>
      <Box sx={{ flex: '1 1 15%' }}>
        {steps.map((label, index) => (
          <IndicadorDePasso
            key={label}
            stepIndex={index}
            activeStep={activeStep}
            isLastStep={index === steps.length - 1}
            isFormCompleted={isFormCompleted}
          />
        ))}
      </Box>
      <Box sx={{ flex: '1 1 75%' }}>
        {children} {/* Aqui será renderizado o Formulario ou FormularioProfissional */}
        <BotoesNavegacaoForm
          activeStep={activeStep}
          isLastStep={isLastStep}
          isSubmitting={isSubmitting}
          handleBack={handleBack}
          handleNext={handleNext}
          onSubmit={onSubmit}
        />
      </Box>
    </Box>
  );

  return isLastStep ? (
    <form onSubmit={onSubmit}>
      {content}
    </form>
  ) : (
    content
  );
};