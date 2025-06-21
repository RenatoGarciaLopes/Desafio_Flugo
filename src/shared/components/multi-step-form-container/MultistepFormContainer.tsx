import { Box, useMediaQuery, useTheme } from '@mui/material';
import type { ReactNode } from 'react';
import { IndicadorDePassoDesktop, IndicadorDePassoMobile, BotoesNavegacaoForm } from '../';


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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const content = (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: { xs: 0, md: 2 }
    }}>
      <Box sx={{
        flex: { xs: '1 1 auto', md: '1 1 15%' },
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' }, // Os indicadores de passo ficam em linha no mobile
        justifyContent: { xs: 'center', md: 'flex-start' }, // Centraliza horizontalmente em mobile
        alignItems: { xs: 'flex-start', md: 'flex-start' }, // Alinha ao início em mobile (para os itens em linha)
        mb: { xs: 2, md: 0 },
        width: { xs: '100%', md: 'auto' } // Garante que o contêiner de passos ocupe a largura total em mobile
      }}>
        {steps.map((label, index) => (
          isMobile ? (
            <IndicadorDePassoMobile // Renderiza o componente mobile
              key={label}
              stepIndex={index}
              activeStep={activeStep}
              isLastStep={index === steps.length - 1}
              isFormCompleted={isFormCompleted}
            />
          ) : (
            <IndicadorDePassoDesktop // Renderiza o componente desktop
              key={label}
              stepIndex={index}
              activeStep={activeStep}
              isLastStep={index === steps.length - 1}
              isFormCompleted={isFormCompleted}
            />
          )
        ))}
      </Box>
      <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 75%' } }}>
        {children}
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