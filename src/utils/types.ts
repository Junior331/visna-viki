// import { v4 as uuidv4 } from 'uuid';

import { payloadPhasesProps } from '@/pages/Scenarios/@types';
import { Dayjs } from 'dayjs';
import { Dispatch, MouseEvent } from 'react';

export enum statusColor {
  'Done' = '#28c76f',
  'To Do' = '#FF9F43',
  'Block' = '#EA5455',
  'In Review' = '#00CFE8',
  'In Progress' = '#7367F0'
}

export enum MaskType {
  CEP = 'CEP',
  DATE = 'DATE',
  NUMBER = 'NUMBER'
}

export type projectType = {
  id: string;
  name: string;
  text: string;
  status: string;
  progress: number;
};

export type landType = {
  name: string;
  area: number;
  state: string;
  zoning: string;
  number: string;
  street: string;
  depave: boolean;
  zipCode: string;
  country: string;
  frontage: number;
  totalAmount: number;
  neighborhood: string;
  amountPerMeter: number;
  quantitySpecies: number;
  topographyTypeId: number;
};

export type landSummaryType = {
  id: number;
  area: number;
  depave: boolean;
  zoning: string;
  frontage: number;
  projectId: number;
  addressId: number;
  totalAmount: number;
  amountPerMeter: number;
  quantitySpecies: number;
  topographyTypeId: number;
  address: {
    id: number;
    zipCode: string;
    street: string;
    number: string;
    neighborhood: string;
    city: null;
    state: string;
    country: string;
  };
};

export type unitSummaryType = {
  id: number;
  netAmount: string; // VGV Liq. Permuta (R$)
  isRemove?: boolean;
  unitTypeId: number; // T. Unidades
  averageArea: string; // A. Média
  unitQuantity: string; // Quantidade
  areaExchanged: string; // Área permutada (m²)
  marketAmount: string; // Valor de venda/m² (R$)
  exchangeQuantity: string; // Qtd. Permutas (m²)
  areaPrivativaTotal: string; // A. P. Total
  unitCharacteristicsId: string; // Características
};

export type unitHubSummaryType = {
  id: number;
  keyIndex: number;
  netAmount: number;
  unitHubId: number;
  unitTypeId: number;
  averageArea: number;
  marketAmount: number;
  unitQuantity: number;
  areaExchanged: number;
  exchangeQuantity: number;
  areaPrivativaTotal: number;
  unitCharacteristicsId: number;
};

export type unitType = {
  flooring: string;
  VGVTotal: string;
  underground: string;
  unitPerFloor: string;
  TotalExchanges: string;
  averageSaleValue: string;
  totalExchangeArea: string;
  projectEfficiency: string;
  totalToBeBuiltArea: string;
  totalValueNoExchange: string;
  totalUnitsInDevelopment: string;
  totalPrivateAreaQuantity: string;
  totalAreaOfTheDevelopment: string;
  unit: unitSummaryType[];
};

export type unitHubType = {
  id: number;
  flooring: number;
  VGVTotal: number;
  projectId: number;
  underground: number;
  unitPerFloor: number;
  TotalExchanges: number;
  averageSaleValue: number;
  projectEfficiency: number;
  totalExchangeArea: number;
  totalToBeBuiltArea: number;
  totalValueNoExchange: number;
  totalUnitsInDevelopment: number;
  totalPrivateAreaQuantity: number;
  totalAreaOfTheDevelopment: number;
  unit: unitHubSummaryType[];
};

export type deadlineType = {
  startDate: Dayjs;
  afterConstruction: number;
  totalDeadlineInMonth: number;
  approvalDeadlineInMonth: number;
  constructionDeadlineInMonth: number;
  projectLaunchDeadlineInMonth: number;
};

export type deadlineSummaryType = {
  id: number;
  startDate: string;
  projectId: number;
  afterConstruction: number;
  totalDeadlineInMonth: number;
  approvalDeadlineInMonth: number;
  constructionDeadlineInMonth: number;
  projectLaunchDeadlineInMonth: number;
};

export type projectDateType = {
  lands: landType;
  units: unitType;
  projectId: number;
  deadline: deadlineType;
};

export type projectInfoType = {
  id: number;
  projectName: string;
  unitHub: unitHubType;
  land: landSummaryType;
  deadline: deadlineSummaryType;
};

export type payloadUserType = {
  role: string;
  email: string;
  status: string;
  username: string;
  passwordHash: string;
};

export type handleProps = {
  setAnchorEl: Dispatch<React.SetStateAction<HTMLElement | null>>;
};

export type handleClickProps = handleProps & {
  event: MouseEvent<HTMLElement>;
};

export type handleExpenseGenericProps = {
  projectId: number;
};

export type handleExpenseProps = handleExpenseGenericProps & {
  page?: number;
  perPage?: number;
};

export type payloadExpenseType = {
  expenseName: string;
  expenseTypeId: number;
};
export type payloadExpense = {
  quantity: number;
  unitValue: number;
  projectId: number;
  expenseId: number;
  totalValue: number;
  paymentStartDate: Dayjs;
  unitExpenseTypeId: number;
  periodicityPayment: number;
};
export type payloadSteps = {
  startDate: Dayjs;
  projectId: number;
  afterConstruction: number;
  totalDeadlineInMonth: number;
  approvalDeadlineInMonth: number;
  constructionDeadlineInMonth: number;
  projectLaunchDeadlineInMonth: number;
};

export type payloadScenarios = {
  name: string;
  projectId: number;
  projectStepId: number;
  phases: payloadPhasesProps[];
};
export type CepData = {
  uf: string;
  cep: string;
  gia: string;
  ddd: string;
  ibge: string;
  siafi: string;
  bairro: string;
  localidade: string;
  logradouro: string;
  complemento: string;
};
export type unitCharacteristicsType = {
  name: string;
  unit_type_id: number;
  children: [
    {
      id: number;
      name: string;
    }
  ];
};
