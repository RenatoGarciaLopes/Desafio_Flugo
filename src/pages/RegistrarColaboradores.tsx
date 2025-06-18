
import { useState } from 'react';
import { FormProvider } from 'react-hook-form'; // Continua sendo necessário para FormProvider



import { useMultiStepForm } from '../shared/hooks/useMultiStepForm';
import { Box, Button, CircularProgress } from '@mui/material';
import { DashboardLayout } from '../shared/layouts/DashboardLayout';
import type { Employee } from '../shared/types/employee';
import { Formulario, FormularioProfissional, BarraDeProgresso, BreadcrumbsNavegacao, IndicadorDePasso, Cabecalho, ModalValidacao } from '../shared/components';

import { addCollaborator } from '../shared/services/collaboratorService';
import { useNotification } from '../shared/contexts/NotificationContext';

export function RegistrarColaboradores() {
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const { showNotification } = useNotification();

  const {
    activeStep,
    methods,
    handleNext,
    handleBack,
    steps,
    isLastStep,
    resetToFirstStep,
  } = useMultiStepForm<Employee>(
    { name: '', email: '', department: '', avatarUrl: '', status: 'Ativo' }
  );



  const onSubmit = async (data: Employee) => {
    setIsSubmitting(true);

    try {
      const { id, ...dataToSave } = data;
      await addCollaborator(dataToSave);

      setIsFormCompleted(true);
      setShowSuccessModal(true);

      //showNotification({ message: 'Colaborador registrado com sucesso!', severity: 'success' }); 

    } catch (error) {
      showNotification({ message: 'Ocorreu um erro ao registrar o colaborador. Tente novamente.', severity: 'error', duration: -1 }); 
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleRegisterNewCollaborator = () => {
    methods.reset();
    resetToFirstStep();
    setIsFormCompleted(false);
    setShowSuccessModal(false);
  };


  const progressValue = isFormCompleted ? 100 : (activeStep === 0 ? 0 : (activeStep / (steps.length - 1)) * 50);

  return (
    <DashboardLayout>
      <Cabecalho />
      <BreadcrumbsNavegacao />
      <BarraDeProgresso valor={progressValue} />


      <FormProvider {...methods}>
        {isLastStep ? (
          <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                {activeStep === 0 && <Formulario />}
                {activeStep === 1 && <FormularioProfissional />}

              

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                  <Button variant="text"
                   disabled={activeStep === 0 || isSubmitting} 
                   onClick={handleBack} 
                   sx={{ color: 'text.primary', fontWeight:'bold' }}>
                    Voltar
                  </Button>
                  <Button variant="contained" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Concluir'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        ) : (

          <Box sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', md: 'row' }
          }}>
            <Box sx={{ flex: '1 1 15%'}}>
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
              {activeStep === 0 && <Formulario />}
              {activeStep === 1 && <FormularioProfissional />}

              

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                <Button variant="text" 
                disabled={activeStep === 0 || isSubmitting} 
                onClick={handleBack} 
                sx={{ color: 'text.primary' }}>
                  Voltar
                </Button>
                <Button variant="contained" onClick={handleNext}>
                  Próximo
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </FormProvider>


      <ModalValidacao
        open={showSuccessModal}
        onClose={handleCloseSuccessModal}
        onRegisterNew={handleRegisterNewCollaborator}
      />

    </DashboardLayout>
  );
}