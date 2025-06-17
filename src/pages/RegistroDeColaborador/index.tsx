import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form'; // 1. IMPORTE O FORMPROVIDER
import { Box, Stepper, Step, StepLabel, Button, Typography, Paper } from '@mui/material';
import { DashboardLayout } from '../../shared/layouts/DashboardLayout';
import type { Employee } from '../../shared/types/employee';
import { Cabecalho, Formulario } from '../../shared/components';

const steps = ['Infos Básicas', 'Infos Profissionais'];

export function AddColaboradores() {
  const [activeStep, setActiveStep] = useState(0);
  
  const methods = useForm<Employee>({
    defaultValues: {
      name: '',
      email: '',
      status: 'Ativo',
    },
  });

  // 3. ATUALIZE A FUNÇÃO handleNext PARA VALIDAR
  const handleNext = async () => {
    // Valida os campos do passo atual antes de prosseguir
    const isStepValid = await methods.trigger(['name', 'email', 'status']);

    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = (data: Employee) => {
    console.log('Dados prontos para enviar:', data);
    // Aqui faremos o envio para o Firebase
  };

  return (
    <DashboardLayout>
        <Cabecalho/>

      <FormProvider {...methods}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>Cadastrar Colaborador</Typography>
          <Box sx={{ display: 'flex' }}>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ mr: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* O onSubmit agora usa methods.handleSubmit */}
            <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: '100%' }}>
              {activeStep === 0 && (
                <Formulario />
              )}
              {activeStep === 1 && (
                <p>Formulário de Infos Profissionais</p>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Voltar
                </Button>

                {/* 5. AJUSTE NA LÓGICA DO BOTÃO */}
                {activeStep === steps.length - 1 ? (
                  // Se for o último passo, o botão é do tipo "submit"
                  <Button variant="contained" type="submit">
                    Concluir
                  </Button>
                ) : (
                  // Caso contrário, ele apenas chama a função para validar e avançar
                  <Button variant="contained" onClick={handleNext}>
                    Próximo
                  </Button>
                )}
              </Box>
            </form>
          </Box>
        </Paper>
      </FormProvider>
    </DashboardLayout>
  );
}