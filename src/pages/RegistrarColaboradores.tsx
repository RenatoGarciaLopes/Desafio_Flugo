
import { useState } from 'react';
import { FormProvider } from 'react-hook-form'; 



import { useMultiStepForm } from '../shared/hooks/useMultiStepForm';
import { DashboardLayout } from '../shared/layouts/DashboardLayout';
import type { Funcionario } from '../shared/types/funcionario';
import { Formulario, FormularioProfissional, BarraDeProgresso, BreadcrumbsNavegacao, Cabecalho, ModalValidacao, MultiStepFormContainer } from '../shared/components';

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
  } = useMultiStepForm<Funcionario>(
    { name: '', email: '', department: '', avatarUrl: '', status: 'Ativo' }
  );



  const onSubmit = async (data: Funcionario) => {
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
        {/* Usando o novo MultiStepFormContainer */}
        <MultiStepFormContainer
          activeStep={activeStep}
          steps={steps}
          isLastStep={isLastStep}
          isSubmitting={isSubmitting}
          isFormCompleted={isFormCompleted}
          handleBack={handleBack}
          handleNext={handleNext}
          onSubmit={methods.handleSubmit(onSubmit)} 
        >
          {activeStep === 0 && <Formulario />}
          {activeStep === 1 && <FormularioProfissional />}
        </MultiStepFormContainer>
      </FormProvider>


      <ModalValidacao
        open={showSuccessModal}
        onClose={handleCloseSuccessModal}
        onRegisterNew={handleRegisterNewCollaborator}
      />

    </DashboardLayout>
  );
}