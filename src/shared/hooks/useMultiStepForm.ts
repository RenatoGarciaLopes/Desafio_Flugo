
import { useState } from 'react';
import { useForm, type UseFormReturn, type FieldValues, type Path, type DefaultValues,} from 'react-hook-form'; 
import { EMPLOYEE_FORM_STEPS, EMPLOYEE_FORM_FIELDS_BY_STEP } from '../constants/employeeForm';

interface MultiStepFormHookReturn<T extends FieldValues> {
  activeStep: number;
  methods: UseFormReturn<T, any, T>; 
  handleNext: () => Promise<void>;
  handleBack: () => void;
  steps: string[];
  isLastStep: boolean;
  resetToFirstStep: () => void; 
}

export const useMultiStepForm = <T extends FieldValues>(
  defaultValues: DefaultValues<T>
): MultiStepFormHookReturn<T> => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm<T>({
    defaultValues,
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const handleNext = async () => {
    const currentStepFields = EMPLOYEE_FORM_FIELDS_BY_STEP[activeStep] as Path<T>[];
    const isStepValid = await methods.trigger(currentStepFields, { shouldFocus: true });

    if (isStepValid) {
      methods.reset(methods.getValues(), {
        keepErrors: false,
        keepDirty: true,
        keepTouched: false,
        keepDefaultValues: true,
        keepIsSubmitted: false,
        keepIsValid: false,
      });
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    methods.reset(methods.getValues(), {
      keepErrors: false,
      keepDirty: true,
      keepTouched: false,
      keepDefaultValues: true,
      keepIsSubmitted: false,
      keepIsValid: false,
    });
    setActiveStep((prev) => prev - 1);
  };

  const resetToFirstStep = () => {
    setActiveStep(0);
  };

  const isLastStep = activeStep === EMPLOYEE_FORM_STEPS.length - 1;

  return {
    activeStep,
    methods,
    handleNext,
    handleBack,
    steps: EMPLOYEE_FORM_STEPS,
    isLastStep,
    resetToFirstStep, 
  };
};