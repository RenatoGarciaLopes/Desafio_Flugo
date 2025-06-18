import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, CircularProgress, Alert } from '@mui/material';
import { DashboardLayout } from '../shared/layouts/DashboardLayout';
import type { Employee } from '../shared/types/employee';
import { Formulario, FormularioProfissional, BarraDeProgresso, BreadcrumbsNavegacao, IndicadorDePasso, Cabecalho } from '../shared/components'; // Adicione IndicadorDePasso aqui

import { addCollaborator } from '../shared/services/collaboratorService';

const steps = ['Infos Básicas', 'Infos Profissionais'];
const fieldsByStep: (keyof Employee)[][] = [['name', 'email'], ['department']];


export function AddColaboradores() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const navigate = useNavigate();
  const methods = useForm<Employee>({
    defaultValues: { name: '', email: '', department: '', avatarUrl: '', status: 'Ativo' },
  });

  const handleNext = async () => {
    const isStepValid = await methods.trigger(fieldsByStep[activeStep]);
    if (isStepValid) {
      setActiveStep((prev) => {
        const nextStep = prev + 1;
        if (nextStep === 1) {
          methods.clearErrors('department'); 
        }
        return nextStep;
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data: Employee) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {

      const { id, ...dataToSave } = data;
      await addCollaborator(dataToSave);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setSubmitError('Ocorreu um erro ao salvar. Tente novamente.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressValue = activeStep === 0 ? 0 : (activeStep / (steps.length - 1)) * 50;

  return (
    
    <DashboardLayout>
      <Cabecalho/>
     <BreadcrumbsNavegacao/>
      <BarraDeProgresso valor={progressValue} />
      
      <Paper sx={{ p: 4, mt: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box sx={{ 
              display: 'flex', 
              gap: 5, 
              flexDirection: { xs: 'column', md: 'row' } 
            }}>
             
              <Box sx={{ flex: '1 1 25%' }}> 
                {steps.map((label, index) => (
                  <IndicadorDePasso 
                    key={label} 
                    stepIndex={index} 
                    activeStep={activeStep} 
                    isLastStep={index === steps.length - 1} 
                  />
                ))}
              </Box>

              <Box sx={{ flex: '1 1 75%' }}> {/* Ocupa 75% da largura em telas médias+ */}
                {activeStep === 0 && <Formulario />}
                {activeStep === 1 && <FormularioProfissional />}

                {submitError && (<Alert severity="error" sx={{ mt: 2 }}>{submitError}</Alert>)}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                  <Button variant="text" disabled={activeStep === 0 || isSubmitting} onClick={handleBack}>
                    Voltar
                  </Button>
                  
                  {activeStep === steps.length - 1 ? (
                    <Button variant="contained" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Concluir'}
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={handleNext}>
                      Próximo
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Paper>
    </DashboardLayout>
  );
}