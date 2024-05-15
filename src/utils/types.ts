// import { v4 as uuidv4 } from 'uuid';

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
  zipCode: string;
  country: string;
  frontage: number;
  totalAmount: number;
  neighborhood: string;
  amountPerMeter: number;
  topographyTypeId: number;
};

export type landSummaryType = {
  id: number;
  area: number;
  frontage: number;
  projectId: number;
  addressId: number;
  totalAmount: number;
  amountPerMeter: number;
  topographyTypeId: number;
  zoning: string;
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
  netAmount: string;
  isRemove?: boolean;
  unitTypeId: number;
  averageArea: string;
  unitQuantity: string;
  marketAmount: string;
  exchangeQuantity: string;
  totalExchangeArea: string;
  areaPrivativaTotal: string;
};

export type unitHubSummaryType = {
  id: number;
  netAmount: number;
  unitHubId: number;
  unitTypeId: number;
  averageArea: number;
  marketAmount: number;
  unitQuantity: number;
  exchangeQuantity: number;
  totalExchangeArea: number;
  areaPrivativaTotal: number;
};

export type unitType = {
  flooring: string;
  underground: string;
  unitPerFloor: string;
  averageSaleValue: string;
  totalToBeBuiltArea: string;
  totalValueNoExchange: string;
  totalUnitsInDevelopment: string;
  totalPrivateAreaQuantity: string;
  unit: unitSummaryType[];
};

export type unitHubType = {
  id: number;
  flooring: number;
  projectId: number;
  underground: number;
  unitPerFloor: number;
  averageSaleValue: number;
  totalToBeBuiltArea: number;
  totalValueNoExchange: number;
  totalUnitsInDevelopment: number;
  totalPrivateAreaQuantity: number;
  unit: unitHubSummaryType[];
};

export type deadlineType = {
  endDate: string;
  startDate: string;
  totalDeadlineInMonth: string;
  approvalDeadlineInMonth: string;
  constructionDeadlineInMonth: string;
};

export type deadlineSummaryType = {
  id: number;
  endDate: null;
  projectId: number;
  startDate: string;
  totalDeadlineInMonth: number;
  approvalDeadlineInMonth: number;
  constructionDeadlineInMonth: number;
  projectLaunchDeadlineInMonth: null;
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
  unitExpenseTypeId: number;
};
