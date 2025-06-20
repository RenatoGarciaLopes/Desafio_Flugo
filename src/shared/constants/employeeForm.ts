import type { Funcionario } from '../types/funcionario';

export const Funcionario_FORM_STEPS = ['Infos Básicas', 'Infos Profissionais'];

export const Funcionario_FORM_FIELDS_BY_STEP: (keyof Funcionario)[][] = [
  ['name', 'email'],
  ['department'],
];