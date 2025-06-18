import type { Employee } from '../types/employee';

export const EMPLOYEE_FORM_STEPS = ['Infos Básicas', 'Infos Profissionais'];

export const EMPLOYEE_FORM_FIELDS_BY_STEP: (keyof Employee)[][] = [
  ['name', 'email'],
  ['department'],
];